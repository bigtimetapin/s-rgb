use anchor_lang::prelude::*;
use anchor_spl::token::TokenAccount;
use anchor_spl::token::{mint_to, MintTo};
use mpl_token_metadata::instruction::{
    create_metadata_accounts_v3, sign_metadata, update_primary_sale_happened_via_token,
};
use crate::{Paint, pda};
use crate::error::CustomErrors;
use crate::pda::paint::blueprint::Blueprint;

pub fn ix(ctx: Context<Paint>, blueprint: Blueprint) -> Result<()> {
    // get accounts
    let red_pixel_mint_ata = &ctx.accounts.red_pixel_mint_ata;
    let green_pixel_mint_ata = &ctx.accounts.green_pixel_mint_ata;
    let blue_pixel_mint_ata = &ctx.accounts.blue_pixel_mint_ata;
    let yellow_pixel_mint_ata = &ctx.accounts.yellow_pixel_mint_ata;
    let magenta_pixel_mint_ata = &ctx.accounts.magenta_pixel_mint_ata;
    let cyan_pixel_mint_ata = &ctx.accounts.cyan_pixel_mint_ata;
    let white_pixel_mint_ata = &ctx.accounts.white_pixel_mint_ata;
    // assert pixel balances
    assert_pixel_balance(red_pixel_mint_ata, &blueprint, |b| b.red)?;
    assert_pixel_balance(green_pixel_mint_ata, &blueprint, |b| b.green)?;
    assert_pixel_balance(blue_pixel_mint_ata, &blueprint, |b| b.blue)?;
    assert_pixel_balance(yellow_pixel_mint_ata, &blueprint, |b| b.yellow)?;
    assert_pixel_balance(magenta_pixel_mint_ata, &blueprint, |b| b.magenta)?;
    assert_pixel_balance(cyan_pixel_mint_ata, &blueprint, |b| b.cyan)?;
    assert_pixel_balance(white_pixel_mint_ata, &blueprint, |b| b.white)?;
    // build signer seeds
    let bump = *ctx.bumps.get(
        pda::authority::authority::SEED
    ).unwrap();
    let seeds = &[
        pda::authority::authority::SEED.as_bytes(),
        &[bump]
    ];
    let signer_seeds = &[&seeds[..]];
    // build metadata ix
    let ix_metadata = create_metadata_accounts_v3(
        ctx.accounts.metadata_program.key(),
        ctx.accounts.metadata.key(),
        ctx.accounts.mint.key(),
        ctx.accounts.authority.key(),
        ctx.accounts.payer.key(),
        ctx.accounts.authority.key(),
        String::from("s-rgb"),
        String::from("SRGB"),
        String::from("https://rgb.industries"),
        Some(vec![
            mpl_token_metadata::state::Creator {
                address: ctx.accounts.payer.key(),
                verified: false,
                share: 100,
            }
        ]),
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
    // build mint-to associated-token-account ix
    let mint_ata_cpi_accounts = MintTo {
        mint: ctx.accounts.mint.to_account_info(),
        to: ctx.accounts.mint_ata.to_account_info(),
        authority: ctx.accounts.authority.to_account_info(),
    };
    let mint_ata_cpi_context = CpiContext::new(
        ctx.accounts.token_program.to_account_info(),
        mint_ata_cpi_accounts,
    );
    // build primary-sale-happened ix
    let ix_primary_sale = update_primary_sale_happened_via_token(
        ctx.accounts.metadata_program.key(),
        ctx.accounts.metadata.key(),
        ctx.accounts.payer.key(),
        ctx.accounts.mint_ata.key(),
    );
    // invoke create metadata ix
    anchor_lang::solana_program::program::invoke_signed(
        &ix_metadata,
        &[
            ctx.accounts.metadata.to_account_info(),
            ctx.accounts.mint.to_account_info(),
            ctx.accounts.authority.to_account_info(),
            ctx.accounts.payer.to_account_info(),
            ctx.accounts.authority.to_account_info(),
            ctx.accounts.system_program.to_account_info(),
            ctx.accounts.rent.to_account_info()
        ],
        signer_seeds,
    )?;
    // invoke sign metadata ix
    anchor_lang::solana_program::program::invoke(
        &ix_sign_metadata,
        &[
            ctx.accounts.metadata.to_account_info(),
            ctx.accounts.payer.to_account_info()
        ],
    )?;
    // invoke mint-to ix
    mint_to(
        mint_ata_cpi_context.with_signer(
            signer_seeds
        ),
        1,
    )?;
    // invoke primary-sale-happened ix
    anchor_lang::solana_program::program::invoke(
        &ix_primary_sale,
        &[
            ctx.accounts.metadata.to_account_info(),
            ctx.accounts.payer.to_account_info(),
            ctx.accounts.mint_ata.to_account_info()
        ],
    )?;
    Ok(())
}

fn assert_pixel_balance(
    token_account: &TokenAccount,
    blueprint: &Blueprint,
    pixel: fn(&Blueprint) -> u8,
) -> Result<()> {
    match token_account.amount >= (pixel(blueprint) as u64) {
        true => {
            Ok(())
        }
        false => {
            Err(CustomErrors::InsufficientPixelBalance.into())
        }
    }
}
