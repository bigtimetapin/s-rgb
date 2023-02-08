use anchor_lang::prelude::*;
use crate::InitPixel;
use crate::pda::craft::pixel::Seeds;

pub fn ix(ctx: Context<InitPixel>, seeds: Seeds) -> Result<()> {
    let pixel = &mut ctx.accounts.pixel;
    let pixel_mint = & ctx.accounts.pixel_mint;
    pixel.seeds = seeds;
    pixel.mint = pixel_mint.key();
    Ok(())
}
