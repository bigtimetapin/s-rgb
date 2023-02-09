use anchor_lang::prelude::*;
use crate::error::CustomErrors;
use crate::InitPixelMint;
use crate::pda::pixel::pixel::PixelSeeds;

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
    let max: u128 = u128::pow(2, seeds.depth as u32) - 1;
    msg!("power of {}", max);
    match (f(seeds) as u128) <= max {
        true => {
            Ok(())
        }
        false => {
            Err(CustomErrors::ChannelOverflow.into())
        }
    }
}
