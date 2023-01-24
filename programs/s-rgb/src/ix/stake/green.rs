use anchor_lang::prelude::*;
use anchor_lang::system_program::{transfer, Transfer};
use crate::StakeGreen;

pub fn ix(ctx: Context<StakeGreen>, lamports: u64) -> Result<()> {
    // get accounts
    let authority = &mut ctx.accounts.authority;
    let green = &mut ctx.accounts.green;
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
        lamports,
    )?;
    // timestamp
    let clock = Clock::get()?;
    stake.timestamp = clock.unix_timestamp;
    // increment tvl
    authority.tvl += lamports;
    green.tvl += lamports;
    Ok(())
}
