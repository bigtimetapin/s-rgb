use anchor_lang::prelude::*;
use anchor_spl::token::{mint_to, MintTo};
use crate::{
    MintPixel,
    pda::pixel::{
        pixel,
    },
    Pixel,
};
use crate::error::CustomErrors;

pub fn ix(
    ctx: Context<MintPixel>
) -> Result<()> {
    // get accounts
    let pixel = &ctx.accounts.pixel;
    let pixel_index = &mut ctx.accounts.pixel_index;
    let palette = &mut ctx.accounts.palette;
    // assert depth
    assert_depth(pixel)?;
    // assert channels
    assert_channel(pixel, |p| p.seeds.r)?;
    assert_channel(pixel, |p| p.seeds.g)?;
    assert_channel(pixel, |p| p.seeds.b)?;
    // build signer seeds
    let bump = *ctx.bumps.get(
        pixel::SEED
    ).unwrap();
    let pixel_seeds = pixel.to_string();
    let seeds = &[
        pixel_seeds.as_bytes(),
        &[bump]
    ];
    let signer_seeds = &[&seeds[..]];
    // build mint ix
    let cpi_context = CpiContext::new(
        ctx.accounts.token_program.to_account_info(),
        MintTo {
            mint: ctx.accounts.pixel_mint.to_account_info(),
            to: ctx.accounts.pixel_mint_ata.to_account_info(),
            authority: ctx.accounts.pixel.to_account_info(),
        },
    );
    // invoke mint ix
    mint_to(
        cpi_context.with_signer(
            signer_seeds
        ),
        1,
    )?;
    // index
    if !pixel_index.indexed {
        let index = palette.indexer + 1;
        pixel_index.seeds.index = index;
        palette.indexer = index;
    }
    Ok(())
}

fn assert_channel(pixel: &Pixel, f: fn(&Pixel) -> u32) -> Result<()> {
    let channel = f(pixel);
    match channel <= 1 {
        true => {
            Ok(())
        }
        false => {
            Err(CustomErrors::ChannelOverflow.into())
        }
    }
}

fn assert_depth(pixel: &Pixel) -> Result<()> {
    match pixel.seeds.depth == 1 {
        true => {
            Ok(())
        }
        false => {
            Err(CustomErrors::InvalidBitDepth.into())
        }
    }
}
