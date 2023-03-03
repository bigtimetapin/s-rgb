use anchor_lang::prelude::*;
use anchor_spl::token::{burn, Burn, mint_to, MintTo, TokenAccount};
use crate::{HasFiveSeeds, MergePixel, Palette, PaletteSeeds, Pixel, PixelIndexLookupSeeds, PixelIndexSeeds};
use crate::error::CustomErrors;

pub fn ix(
    ctx: Context<MergePixel>,
    dst_pixel_index_seeds: PixelIndexSeeds,
    dst_pixel_index_lookup_seeds: PixelIndexLookupSeeds,
    dst_palette_seeds: PaletteSeeds,
    amount: u32,
) -> Result<()> {
    // get accounts
    let src_pixel = &ctx.accounts.src_pixel;
    let dst_pixel = &ctx.accounts.dst_pixel;
    let dst_pixel_index = &mut ctx.accounts.dst_pixel_index;
    let dst_pixel_index_lookup = &mut ctx.accounts.dst_pixel_index_lookup;
    let dst_palette = &mut ctx.accounts.dst_palette;
    // get cpi accounts
    let src_pixel_mint = &ctx.accounts.src_pixel_mint;
    let src_pixel_mint_ata = &ctx.accounts.src_pixel_mint_ata;
    let dst_pixel_mint = &ctx.accounts.dst_pixel_mint;
    let dst_pixel_mint_ata = &ctx.accounts.dst_pixel_mint_ata;
    // assert depth
    if dst_palette.indexer == 0 {
        dst_palette.seeds = dst_palette_seeds;
    }
    assert_depth(src_pixel, dst_pixel, dst_palette)?;
    // assert channels
    assert_channel(src_pixel, dst_pixel, |p| p.seeds.r)?;
    assert_channel(src_pixel, dst_pixel, |p| p.seeds.g)?;
    assert_channel(src_pixel, dst_pixel, |p| p.seeds.b)?;
    // assert balance
    assert_balance(src_pixel_mint_ata, amount)?;
    // build signer seeds
    let bump = *ctx.bumps.get(
        "dst_pixel"
    ).unwrap();
    let seed1 = dst_pixel.seed1();
    let seed2 = dst_pixel.seed2();
    let seed3 = dst_pixel.seed3();
    let seed4 = dst_pixel.seed4();
    let seed5 = dst_pixel.seed5();
    let seeds = &[
        seed1.as_slice(),
        seed2.as_slice(),
        seed3.as_slice(),
        seed4.as_slice(),
        seed5.as_slice(),
        &[bump]
    ];
    let signer_seeds = &[&seeds[..]];
    // build mint dst pixel ix
    let mint_cpi_context = CpiContext::new(
        ctx.accounts.token_program.to_account_info(),
        MintTo {
            mint: dst_pixel_mint.to_account_info(),
            to: dst_pixel_mint_ata.to_account_info(),
            authority: dst_pixel.to_account_info(),
        },
    );
    // build burn src pixel is
    let burn_cpi_context = CpiContext::new(
        ctx.accounts.token_program.to_account_info(),
        Burn {
            mint: src_pixel_mint.to_account_info(),
            from: src_pixel_mint_ata.to_account_info(),
            authority: ctx.accounts.payer.to_account_info(),
        },
    );
    // invoke mint dst pixel ix
    mint_to(
        mint_cpi_context.with_signer(
            signer_seeds
        ),
        amount as u64,
    )?;
    burn(
        burn_cpi_context,
        (amount * 2) as u64,
    )?;
    // index
    match dst_pixel_index_lookup.index {
        None => {
            let index = dst_palette.indexer + 1;
            dst_pixel_index.seeds = dst_pixel_index_seeds;
            dst_pixel_index.pixel = dst_pixel.key();
            dst_pixel_index_lookup.seeds = dst_pixel_index_lookup_seeds;
            dst_pixel_index_lookup.index = Some(
                index
            );
            dst_palette.indexer = index;
        }
        Some(_) => {}
    }
    Ok(())
}

fn assert_balance(token_account: &TokenAccount, amount: u32) -> Result<()> {
    let token_balance = token_account.amount as u32;
    match (amount * 2) <= token_balance {
        true => {
            Ok(())
        }
        false => {
            Err(CustomErrors::InsufficientPixelBalance.into())
        }
    }
}

fn assert_channel(src: &Pixel, dst: &Pixel, f: fn(&Pixel) -> u32) -> Result<()> {
    let src_value = f(src);
    let dst_value = f(dst);
    match src_value == dst_value {
        true => {
            Ok(())
        }
        false => {
            Err(CustomErrors::ChannelImbalance.into())
        }
    }
}

fn assert_depth(src: &Pixel, dst: &Pixel, palette: &Palette) -> Result<()> {
    match ((dst.seeds.depth - src.seeds.depth) == 1, dst.seeds.depth == palette.seeds.depth) {
        (true, true) => {
            Ok(())
        }
        _ => {
            Err(CustomErrors::InvalidBitDepth.into())
        }
    }
}
