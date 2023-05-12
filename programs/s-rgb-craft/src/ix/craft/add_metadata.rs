use crate::AddMetadataToPixel;
use crate::{pda::craft::pixel, HasFiveSeeds};
use anchor_lang::prelude::*;
use mpl_token_metadata::instruction::{create_metadata_accounts_v3, sign_metadata};

pub fn ix(ctx: Context<AddMetadataToPixel>, url: Pubkey) -> Result<()> {
    // get accounts
    let pixel = &ctx.accounts.pixel;
    // build signer seeds
    let bump = *ctx.bumps.get(pixel::SEED).unwrap();
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
        &[bump],
    ];
    let signer_seeds = &[&seeds[..]];
    // build metadata ix
    let ix_metadata = create_metadata_accounts_v3(
        ctx.accounts.metadata_program.key(),
        ctx.accounts.metadata.key(),
        ctx.accounts.pixel_mint.key(),
        pixel.key(),
        ctx.accounts.payer.key(),
        pixel.key(),
        String::from("rgb.industries"),
        String::from("PIXEL"),
        build_url(&url),
        Some(vec![mpl_token_metadata::state::Creator {
            address: ctx.accounts.payer.key(),
            verified: false,
            share: 100,
        }]),
        150,
        false,
        true,
        None,
        None,
        None,
    );
    // build sign metadata ix
    let ix_sign_metadata = sign_metadata(
        ctx.accounts.metadata_program.key(),
        ctx.accounts.metadata.key(),
        ctx.accounts.payer.key(),
    );
    // invoke create metadata ix
    anchor_lang::solana_program::program::invoke_signed(
        &ix_metadata,
        &[
            ctx.accounts.metadata.to_account_info(),
            ctx.accounts.pixel_mint.to_account_info(),
            pixel.to_account_info(),
            ctx.accounts.payer.to_account_info(),
            pixel.to_account_info(),
            ctx.accounts.system_program.to_account_info(),
            ctx.accounts.rent.to_account_info(),
        ],
        signer_seeds,
    )?;
    // invoke sign metadata ix
    anchor_lang::solana_program::program::invoke(
        &ix_sign_metadata,
        &[
            ctx.accounts.metadata.to_account_info(),
            ctx.accounts.payer.to_account_info(),
        ],
    )?;
    Ok(())
}

fn build_url(pubkey: &Pubkey) -> String {
    format!("{}{}/meta.json", SHADOW_URL, pubkey.to_string())
}

const SHADOW_URL: &str = "https://shdw-drive.genesysgo.net/";
