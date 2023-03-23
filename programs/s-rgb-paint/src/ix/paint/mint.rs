use anchor_lang::prelude::*;
use anchor_spl::token::{mint_to, MintTo};
use mpl_token_metadata::instruction::{
    create_metadata_accounts_v3, sign_metadata, update_primary_sale_happened_via_token,
};
use crate::{MintNft, pda, Proof};
use crate::pda::paint::proof::{Burned, Nft, Plan, PlanMember};

pub fn ix(ctx: Context<MintNft>, plan: Plan, url: Pubkey) -> Result<()> {
    // get accounts
    let proof = &mut ctx.accounts.proof;
    let proof_index = &mut ctx.accounts.proof_index;
    let proof_indexer = &mut ctx.accounts.proof_indexer;
    // build signer seeds
    let bump = *ctx.bumps.get(
        pda::paint::proof::SEED
    ).unwrap();
    let seeds = &[
        pda::paint::proof::SEED.as_bytes(),
        &ctx.accounts.mint.key().to_bytes(),
        &[bump]
    ];
    let signer_seeds = &[&seeds[..]];
    // build metadata ix
    let ix_metadata = create_metadata_accounts_v3(
        ctx.accounts.metadata_program.key(),
        ctx.accounts.metadata.key(),
        ctx.accounts.mint.key(),
        proof.key(),
        ctx.accounts.payer.key(),
        proof.key(),
        String::from("rgb.industries"),
        String::from("RGB"),
        build_url(&url),
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
        authority: proof.to_account_info(),
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
            proof.to_account_info(),
            ctx.accounts.payer.to_account_info(),
            proof.to_account_info(),
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
    // proof
    let arity = get_arity(
        proof
    );
    proof.arity = arity;
    proof.nft = Nft {
        mint: ctx.accounts.mint.key(),
        url,
    };
    proof.burned = Burned {
        burned: false,
        plan,
    };
    // index
    let index = proof_indexer.indexer + 1;
    proof_index.index = index;
    proof_index.proof = proof.key();
    proof_indexer.indexer = index;
    Ok(())
}

fn build_url(pubkey: &Pubkey) -> String {
    format!("{}{}/meta.json", SHADOW_URL, pubkey.to_string())
}

fn get_arity(proof: &Proof) -> u8 {
    let mut increment = 0 as u8;
    msg!("{}", increment);
    increment_arity(&mut increment, &proof.burned.plan.one);
    msg!("{}", increment);
    increment_arity(&mut increment, &proof.burned.plan.two);
    msg!("{}", increment);
    increment_arity(&mut increment, &proof.burned.plan.three);
    msg!("{}", increment);
    increment_arity(&mut increment, &proof.burned.plan.four);
    msg!("{}", increment);
    increment_arity(&mut increment, &proof.burned.plan.five);
    msg!("{}", increment);
    increment_arity(&mut increment, &proof.burned.plan.six);
    msg!("{}", increment);
    increment_arity(&mut increment, &proof.burned.plan.seven);
    msg!("{}", increment);
    increment
}

fn increment_arity(increment: &mut u8, maybe_plan_member: &Option<PlanMember>) {
    match maybe_plan_member {
        None => {}
        Some(_) => {
            *increment += 1;
        }
    }
}

const SHADOW_URL: &str = "https://shdw-drive.genesysgo.net/";
