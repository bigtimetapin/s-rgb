use anchor_lang::prelude::*;
use anchor_spl::associated_token::AssociatedToken;
use anchor_spl::token::{Mint, Token, TokenAccount};
use mpl_token_metadata::state::{PREFIX};
use s_rgb_craft::pda::{craft, craft::pixel::Pixel};
use crate::pda::paint::proof::{Plan, Proof};
use crate::pda::paint::proof_index::ProofIndex;
use crate::pda::paint::proof_indexer::ProofIndexer;

mod pda;
mod ix;

declare_id!("BHaigrDd4Ei5ok5XnoNCxzGCGeK9T9RAQtyWKFphGnhi");

#[program]
pub mod s_rgb_paint {
    use super::*;

    pub fn init_proof_indexer(_ctx: Context<InitProofIndexer>) -> Result<()> {
        Ok(())
    }

    pub fn mint_nft(ctx: Context<MintNft>, plan: Plan, url: Pubkey) -> Result<()> {
        ix::paint::mint::ix(ctx, plan, url)
    }

    pub fn burn_pixels_one(ctx: Context<BurnPixelsOne>) -> Result<()> {
        ix::paint::burn::one::ix(ctx)
    }
}

#[derive(Accounts)]
pub struct InitProofIndexer<'info> {
    #[account(init,
    seeds = [
    pda::paint::proof_indexer::SEED.as_bytes(),
    & payer.key().to_bytes()
    ], bump,
    space = pda::paint::proof_indexer::SIZE,
    payer = payer
    )]
    pub proof_indexer: Box<Account<'info, ProofIndexer>>,
    // payer
    #[account(mut)]
    pub payer: Signer<'info>,
    // system
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct MintNft<'info> {
    // pda
    #[account(init,
    seeds = [
    pda::paint::proof::SEED.as_bytes(),
    & mint.key().to_bytes()
    ], bump,
    space = pda::paint::proof::SIZE,
    payer = payer
    )]
    pub proof: Box<Account<'info, Proof>>,
    #[account(init,
    seeds = [
    pda::paint::proof_index::SEED.as_bytes(),
    & payer.key().to_bytes(),
    (proof_indexer.indexer + 1).to_string().as_bytes()
    ], bump,
    space = pda::paint::proof_index::SIZE,
    payer = payer
    )]
    pub proof_index: Box<Account<'info, ProofIndex>>,
    #[account(mut,
    seeds = [
    pda::paint::proof_indexer::SEED.as_bytes(),
    & payer.key().to_bytes()
    ], bump,
    )]
    pub proof_indexer: Box<Account<'info, ProofIndexer>>,
    // cpi accounts
    #[account(init,
    mint::authority = proof,
    mint::freeze_authority = proof,
    mint::decimals = 0,
    payer = payer
    )]
    pub mint: Box<Account<'info, Mint>>,
    #[account(init,
    associated_token::mint = mint,
    associated_token::authority = payer,
    payer = payer
    )]
    pub mint_ata: Box<Account<'info, TokenAccount>>,
    #[account(mut,
    seeds = [
    PREFIX.as_bytes(),
    metadata_program.key().as_ref(),
    mint.key().as_ref()
    ], bump,
    seeds::program = metadata_program.key()
    )]
    /// CHECK: uninitialized metadata
    pub metadata: UncheckedAccount<'info>,
    // payer
    #[account(mut)]
    pub payer: Signer<'info>,
    // cpi programs
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub metadata_program: Program<'info, MetadataProgram>,
    // system
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct BurnPixelsOne<'info> {
    // pda
    #[account(mut,
    seeds = [
    pda::paint::proof::SEED.as_bytes(),
    & mint.key().to_bytes()
    ], bump,
    )]
    pub proof: Account<'info, Proof>,
    #[account(
    address = proof.burned.plan.one.as_ref().unwrap().pda
    )]
    pub pixel: Account<'info, Pixel>,
    // cpi accounts
    #[account(mut,
    address = pixel.mint
    )]
    pub pixel_mint: Account<'info, Mint>,
    #[account(mut,
    associated_token::mint = pixel_mint,
    associated_token::authority = payer,
    )]
    pub pixel_mint_ata: Account<'info, TokenAccount>,
    #[account(mut,
    address = proof.nft.mint
    )]
    pub mint: Account<'info, Mint>,
    // payer
    #[account(mut)]
    pub payer: Signer<'info>,
    // cpi programs
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    // system
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Clone)]
pub struct MetadataProgram;

impl anchor_lang::Id for MetadataProgram {
    fn id() -> Pubkey {
        mpl_token_metadata::ID
    }
}
