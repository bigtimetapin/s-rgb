use anchor_lang::prelude::*;
use crate::error::CustomErrors;
use crate::InitPixelMint;
use crate::pda::pixel::pixel::Seeds;

pub fn ix(ctx: Context<InitPixelMint>, seeds: Seeds) -> Result<()> {
    let pixel = &mut ctx.accounts.pixel;
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

fn assert_depth(seeds: &Seeds) -> Result<()> {
    match seeds.depth <= 32 {
        true => {
            Ok(())
        }
        false => {
            Err(CustomErrors::InvalidBitDepth.into())
        }
    }
}

fn assert_channel(seeds: &Seeds, f: fn(&Seeds) -> u32) -> Result<()> {
    let max: u128 = 2**(seeds.depth);
    match ((f(seeds) as u128) <= max) {
        true => {
            Ok(())
        }
        false => {
            Err(CustomErrors::ChannelOverflow.into())
        }
    }
}