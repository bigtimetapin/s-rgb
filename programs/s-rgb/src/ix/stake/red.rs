use anchor_lang::prelude::*;
use anchor_lang::system_program;
use anchor_spl::token::{sync_native, SyncNative, transfer, Transfer};
use crate::StakeRed;

pub fn ix(ctx: Context<StakeRed>, lamports: u64) -> Result<()> {
    // get accounts
    let authority = &mut ctx.accounts.authority;
    let red = &mut ctx.accounts.red;
    let stake = &mut ctx.accounts.stake;
    let payer = &ctx.accounts.payer;

    // build transfer native ix
    let transfer_native_cpi_context = CpiContext::new(
        ctx.accounts.system_program.to_account_info(),
        system_program::Transfer {
            from: payer.to_account_info(),
            to: ctx.accounts.payer_ata.to_account_info(),
        },
    );
    // invoke transfer native ix
    system_program::transfer(
        transfer_native_cpi_context,
        lamports,
    )?;



    // build sync native ix
    let sync_native_cpi_context = CpiContext::new(
        ctx.accounts.token_program.to_account_info(),
        SyncNative {
            account: ctx.accounts.payer_ata.to_account_info()
        },
    );

    // invoke sync native ix
    sync_native(
        sync_native_cpi_context
    )?;


    // build transfer spl ix
    let transfer_spl_cpi_context = CpiContext::new(
        ctx.accounts.token_program.to_account_info(),
        Transfer {
            from: ctx.accounts.payer_ata.to_account_info(),
            to: ctx.accounts.stake_ta.to_account_info(),
            authority: payer.to_account_info(),
        },
    );
    // invoke transfer spl ix
    transfer(
        transfer_spl_cpi_context,
        lamports,
    )?;
    // timestamp
    let clock = Clock::get()?;
    stake.timestamp = clock.unix_timestamp;
    // stake token-account
    stake.token_account = ctx.accounts.stake_ta.key();
    // increment tvl
    authority.tvl += lamports;
    red.tvl += lamports;
    Ok(())
}
