use anchor_lang::prelude::*;
use anchor_spl::token::{burn, Burn, mint_to, MintTo};
use crate::{HasFiveSeeds, Pixel, PixelIndexLookupSeeds, PixelIndexSeeds, SeparatePixel};
use crate::error::CustomErrors;
use crate::ix::craft::math::{assert_depth, index};

pub fn ix(
    ctx: Context<SeparatePixel>,
    dst_pixel_index_seeds: PixelIndexSeeds,
    dst_pixel_index_lookup_seeds: PixelIndexLookupSeeds,
) -> Result<()> {
    // get accounts
    let left_pixel = &ctx.accounts.left_pixel;
    let right_pixel = &ctx.accounts.right_pixel;
    let dst_pixel = &ctx.accounts.dst_pixel;
    let dst_pixel_index = &mut ctx.accounts.dst_pixel_index;
    let dst_pixel_index_lookup = &mut ctx.accounts.dst_pixel_index_lookup;
    let dst_palette = &mut ctx.accounts.dst_palette;
    // assert depth
    assert_depth(left_pixel, right_pixel, dst_pixel)?;
    // assert separation
    assert_separation(left_pixel, right_pixel, dst_pixel)?;
    // assert subset
    assert_subset(left_pixel, right_pixel)?;
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
    // build burn left-pixel ix
    let burn_left_pixel_cpi_context = CpiContext::new(
        ctx.accounts.token_program.to_account_info(),
        Burn {
            mint: ctx.accounts.left_pixel_mint.to_account_info(),
            from: ctx.accounts.left_pixel_mint_ata.to_account_info(),
            authority: ctx.accounts.payer.to_account_info(),
        },
    );
    // build mint dst-pixel ix
    let mint_dst_pixel_cpi_context = CpiContext::new(
        ctx.accounts.token_program.to_account_info(),
        MintTo {
            mint: ctx.accounts.dst_pixel_mint.to_account_info(),
            to: ctx.accounts.dst_pixel_mint_ata.to_account_info(),
            authority: ctx.accounts.dst_pixel.to_account_info(),
        },
    );
    // invoke burn left-pixel ix
    burn(
        burn_left_pixel_cpi_context,
        1,
    )?;
    // invoke mint dst-pixel ix
    mint_to(
        mint_dst_pixel_cpi_context.with_signer(
            signer_seeds
        ),
        1,
    )?;
    // index
    index(
        dst_pixel.key(),
        dst_pixel_index,
        dst_pixel_index_seeds,
        dst_pixel_index_lookup,
        dst_pixel_index_lookup_seeds,
        dst_palette,
    );
    Ok(())
}

fn assert_separation(left: &Pixel, right: &Pixel, dst: &Pixel) -> Result<()> {
    let r = left.seeds.r - right.seeds.r;
    let g = left.seeds.g - right.seeds.g;
    let b = left.seeds.b - right.seeds.b;
    match (r.eq(&dst.seeds.r), g.eq(&dst.seeds.g), b.eq(&dst.seeds.b)) {
        (true, true, true) => {
            Ok(())
        }
        _ => {
            Err(CustomErrors::InvalidSeparation.into())
        }
    }
}

fn assert_subset(left: &Pixel, right: &Pixel) -> Result<()> {
    let r = left.seeds.r >= right.seeds.r;
    let g = left.seeds.g >= right.seeds.g;
    let b = left.seeds.b >= right.seeds.b;
    match (r, g, b) {
        (true, true, true) => {
            Ok(())
        }
        _ => {
            Err(CustomErrors::InvalidSeparation.into())
        }
    }
}
