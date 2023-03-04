use anchor_lang::prelude::*;
use crate::error::CustomErrors;
use crate::InitPixelMint;
use crate::pda::craft::pixel::PixelSeeds;

pub fn ix(ctx: Context<InitPixelMint>, seeds: PixelSeeds) -> Result<()> {
    let pixel = &mut ctx.accounts.pixel;
    msg!("{}", pixel.key());
    let pixel_mint = & ctx.accounts.pixel_mint;
    // assert bit depth
    assert_depth(& seeds)?;
    // assert channels
    assert_channel(&seeds, |s| s.r)?;
    assert_channel(&seeds, |s| s.g)?;
    assert_channel(&seeds, |s| s.b)?;
    pixel.seeds = seeds;
    pixel.mint = pixel_mint.key();
    Ok(())
}

fn assert_depth(seeds: &PixelSeeds) -> Result<()> {
    match 0 < seeds.depth && seeds.depth <= 32 {
        true => {
            Ok(())
        }
        false => {
            Err(CustomErrors::InvalidBitDepth.into())
        }
    }
}

fn assert_channel(seeds: &PixelSeeds, f: fn(&PixelSeeds) -> u32) -> Result<()> {
    let max: u32 = u32::pow(2, seeds.depth as u32) - 1;
    match f(seeds) <= max {
        true => {
            Ok(())
        }
        false => {
            Err(CustomErrors::ChannelOverflow.into())
        }
    }
}
