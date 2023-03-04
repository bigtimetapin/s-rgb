use anchor_lang::prelude::*;
use anchor_spl::token::{burn, Burn, mint_to, MintTo, TokenAccount};
use crate::{HasFiveSeeds, MintPixel, Palette, PaletteSeeds, pda::craft::{
    pixel,
}, Pixel, PixelIndexLookupSeeds, PixelIndexSeeds};
use crate::error::CustomErrors;

pub fn ix(
    ctx: Context<MintPixel>,
    pixel_index_seeds: PixelIndexSeeds,
    pixel_index_lookup_seeds: PixelIndexLookupSeeds,
    palette_seeds: PaletteSeeds,
) -> Result<()> {
    // get accounts
    let pixel = &ctx.accounts.pixel;
    let pixel_index = &mut ctx.accounts.pixel_index;
    let pixel_index_lookup = &mut ctx.accounts.pixel_index_lookup;
    let palette = &mut ctx.accounts.palette;
    // get cpi accounts
    let red_mint = &ctx.accounts.red_mint;
    let red_mint_ata = &ctx.accounts.red_mint_ata;
    let green_mint = &ctx.accounts.green_mint;
    let green_mint_ata = &ctx.accounts.green_mint_ata;
    let blue_mint = &ctx.accounts.blue_mint;
    let blue_mint_ata = &ctx.accounts.blue_mint_ata;
    // assert depth
    if palette.indexer == 0 {
        palette.seeds = palette_seeds;
    }
    assert_depth(pixel, palette)?;
    // assert channels
    assert_channel(pixel, |p| p.seeds.r, red_mint_ata)?;
    assert_channel(pixel, |p| p.seeds.g, green_mint_ata)?;
    assert_channel(pixel, |p| p.seeds.b, blue_mint_ata)?;
    // build signer seeds
    let bump = *ctx.bumps.get(
        pixel::SEED
    ).unwrap();
    let seed1 = pixel.seed1();
    let seed2 = pixel.seed2();
    let seed3 = pixel.seed3();
    let seed4 = pixel.seed4();
    let seed5 = pixel.seed5();
    let seeds = &[
        seed1.as_slice(),
        seed2.as_slice(),
        seed3.as_slice(),
        seed4.as_slice(),
        seed5.as_slice(),
        &[bump]
    ];
    let signer_seeds = &[&seeds[..]];
    // build mint ix
    let mint_cpi_context = CpiContext::new(
        ctx.accounts.token_program.to_account_info(),
        MintTo {
            mint: ctx.accounts.pixel_mint.to_account_info(),
            to: ctx.accounts.pixel_mint_ata.to_account_info(),
            authority: ctx.accounts.pixel.to_account_info(),
        },
    );
    // build burn red ix
    let burn_red_cpi_context = CpiContext::new(
        ctx.accounts.token_program.to_account_info(),
        Burn {
            mint: red_mint.to_account_info(),
            from: red_mint_ata.to_account_info(),
            authority: ctx.accounts.payer.to_account_info(),
        },
    );
    // build burn green ix
    let burn_green_cpi_context = CpiContext::new(
        ctx.accounts.token_program.to_account_info(),
        Burn {
            mint: green_mint.to_account_info(),
            from: green_mint_ata.to_account_info(),
            authority: ctx.accounts.payer.to_account_info(),
        },
    );
    // build burn blue ix
    let burn_blue_cpi_context = CpiContext::new(
        ctx.accounts.token_program.to_account_info(),
        Burn {
            mint: blue_mint.to_account_info(),
            from: blue_mint_ata.to_account_info(),
            authority: ctx.accounts.payer.to_account_info(),
        },
    );
    // invoke mint ix
    mint_to(
        mint_cpi_context.with_signer(
            signer_seeds
        ),
        1,
    )?;
    // invoke burn red ix
    if pixel.seeds.r > 0 {
        burn(
            burn_red_cpi_context,
            pixel.seeds.r as u64,
        )?;
    }
    // invoke burn green ix
    if pixel.seeds.g > 0 {
        burn(
            burn_green_cpi_context,
            pixel.seeds.g as u64,
        )?;
    }
    // invoke burn blue ix
    if pixel.seeds.b > 0 {
        burn(
            burn_blue_cpi_context,
            pixel.seeds.b as u64,
        )?;
    }
    // index
    match pixel_index_lookup.index {
        Some(_) => {}
        None => {
            // index
            let index = palette.indexer + 1;
            // pixel index
            pixel_index.seeds = pixel_index_seeds;
            pixel_index.pixel = pixel.key();
            // pixel index lookup
            pixel_index_lookup.seeds = pixel_index_lookup_seeds;
            pixel_index_lookup.index = Some(
                index
            );
            palette.indexer = index;
        }
    }
    Ok(())
}

fn assert_channel(pixel: &Pixel, f: fn(&Pixel) -> u32, token_account: &TokenAccount) -> Result<()> {
    let channel = f(pixel);
    let balance = token_account.amount as u32;
    match (channel <= 1, channel <= balance) {
        (true, true) => {
            Ok(())
        }
        (_, false) => {
            Err(CustomErrors::InsufficientPrimaryBalance.into())
        }
        (false, _) => {
            Err(CustomErrors::ChannelOverflow.into())
        }
    }
}

fn assert_depth(pixel: &Pixel, palette: &Palette) -> Result<()> {
    match (pixel.seeds.depth == 1, palette.seeds.depth == 1) {
        (true, true) => {
            Ok(())
        }
        _ => {
            Err(CustomErrors::InvalidBitDepth.into())
        }
    }
}
