use anchor_lang::prelude::*;
use anchor_lang::system_program::{transfer, Transfer};
use crate::StakeRed;

pub fn ix(ctx: Context<StakeRed>, amount: u64) -> Result<()> {
    // get accounts
    let authority = &mut ctx.accounts.authority;
    let red = &mut ctx.accounts.red;
    let stake = &mut ctx.accounts.stake;
    let payer = &ctx.accounts.payer;
    // build transfer ix
    let transfer_cpi_context = CpiContext::new(
        ctx.accounts.system_program.to_account_info(),
        Transfer {
            from: payer.to_account_info(),
            to: stake.to_account_info(),
        },
    );
    // invoke transfer ix
    transfer(
        transfer_cpi_context,
        amount,
    )?;
    // timestamp
    let clock = Clock::get()?;
    stake.timestamp = clock.unix_timestamp;
    // increment tvl
    authority.tvl += amount;
    red.tvl += amount;
    Ok(())
}
