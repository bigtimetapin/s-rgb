use anchor_lang::prelude::*;
use crate::Init;

pub fn ix(ctx: Context<Init>) -> Result<()> {
    // authority
    let authority = &mut ctx.accounts.authority;
    let wsol = &ctx.accounts.wsol;
    // primary pool trackers
    let red = &mut ctx.accounts.red;
    let green = &mut ctx.accounts.green;
    let blue = &mut ctx.accounts.blue;
    // primary pool mints
    let red_mint = &mut ctx.accounts.red_mint;
    let green_mint = &mut ctx.accounts.green_mint;
    let blue_mint = &mut ctx.accounts.blue_mint;
    // set mint addresses
    red.mint = red_mint.key();
    green.mint = green_mint.key();
    blue.mint = blue_mint.key();
    // set sol address
    authority.wsol = wsol.key();
    Ok(())
}
