use anchor_lang::prelude::*;
use anchor_lang::solana_program::native_token::LAMPORTS_PER_SOL;
use anchor_lang::system_program::{transfer, Transfer};
use anchor_spl::token::{mint_to, MintTo};
use crate::{HarvestRed, pda};

pub fn ix(ctx: Context<HarvestRed>) -> Result<()> {
    // get accounts
    let authority = &mut ctx.accounts.authority;
    let red = &mut ctx.accounts.red;
    let stake = &ctx.accounts.stake;
    // build authority signer seeds
    let authority_bump = *ctx.bumps.get(
        pda::authority::authority::SEED
    ).unwrap();
    let authority_seeds = &[
        pda::authority::authority::SEED.as_bytes(),
        &[authority_bump]
    ];
    let authority_signer_seeds = &[&authority_seeds[..]];
    // build stake signer seeds
    let stake_bump = *ctx.bumps.get(
        pda::stake::stake::SEED
    ).unwrap();
    let stake_seeds = &[
        pda::stake::stake::SEED.as_bytes(),
        &[stake_bump]
    ];
    let stake_signer_seeds = &[&stake_seeds[..]];
    // build stake transfer ix
    let stake_transfer_cpi_context = CpiContext::new(
        ctx.accounts.system_program.to_account_info(),
        Transfer {
            from: ctx.accounts.stake.to_account_info(),
            to: ctx.accounts.payer.to_account_info(),
        },
    );
    // build harvest amount
    let clock = Clock::get()?;
    let diff = clock.unix_timestamp - stake.timestamp;
    msg!("{}", diff);
    let hours_elapsed = (diff / (60 * 60)) as u64;
    msg!("{}", hours_elapsed);
    let staked_lamports: u64 = stake.to_account_info().lamports();
    msg!("{}", staked_lamports);
    let staked_sol = staked_lamports / LAMPORTS_PER_SOL;
    msg!("{}", staked_sol);
    let harvest_amount = staked_sol * hours_elapsed;
    msg!("{}", harvest_amount);
    // build harvest ix
    let harvest_cpi_context = CpiContext::new(
        ctx.accounts.token_program.to_account_info(),
        MintTo {
            mint: ctx.accounts.red_mint.to_account_info(),
            to: ctx.accounts.ata.to_account_info(),
            authority: authority.to_account_info(),
        },
    );
    // invoke stake transfer ix
    transfer(
        stake_transfer_cpi_context.with_signer(
            stake_signer_seeds
        ),
        staked_lamports,
    )?;
    // invoke harvest ix
    mint_to(
        harvest_cpi_context.with_signer(
            authority_signer_seeds
        ),
        harvest_amount,
    )?;
    // decrement tvl
    authority.tvl -= staked_lamports;
    red.tvl -= staked_lamports;
    Ok(())
}