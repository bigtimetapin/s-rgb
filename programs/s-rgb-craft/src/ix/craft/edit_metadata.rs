use anchor_lang::prelude::*;
use mpl_token_metadata::{
    instruction::update_metadata_accounts_v2,
    state::{DataV2, Metadata},
};

use crate::{pda::craft::pixel, EditMetadata, HasFiveSeeds};

use super::add_metadata::build_url;

pub fn ix(ctx: Context<EditMetadata>, url: Pubkey) -> Result<()> {
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
    // build new data
    let metadata: Metadata = ctx.accounts.metadata.0.clone();
    let data_v2: DataV2 = DataV2 {
        name: metadata.data.name,
        symbol: metadata.data.symbol,
        uri: build_url(&url),
        seller_fee_basis_points: metadata.data.seller_fee_basis_points,
        creators: metadata.data.creators,
        collection: metadata.collection,
        uses: metadata.uses,
    };
    // build ix
    let ix = update_metadata_accounts_v2(
        ctx.accounts.metadata_program.key(),
        ctx.accounts.metadata.key(),
        ctx.accounts.pixel.key(),
        None,
        Some(data_v2),
        None,
        None,
    );
    // invoke ix
    anchor_lang::solana_program::program::invoke_signed(
        &ix,
        &[
            ctx.accounts.metadata.to_account_info(),
            ctx.accounts.pixel.to_account_info(),
        ],
        signer_seeds,
    )?;
    Ok(())
}
