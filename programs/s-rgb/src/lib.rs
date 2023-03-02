use anchor_lang::prelude::*;
use anchor_spl::associated_token::AssociatedToken;
use anchor_spl::token::{Mint, Token, TokenAccount};
use mpl_token_metadata::state::{PREFIX};
use crate::pda::authority::authority::Authority;
use crate::pda::{HasSixSeeds, HasFiveSeeds, HasFourSeeds, HasThreeSeeds};
use crate::pda::paint::proof::{Plan, Proof};
use crate::pda::paint::proof_index::ProofIndex;
use crate::pda::paint::proof_indexer::ProofIndexer;
use crate::pda::pixel::palette::{Palette, PaletteSeeds};
use crate::pda::pixel::pixel::{Pixel, PixelSeeds};
use crate::pda::pixel::pixel_index::{PixelIndex, PixelIndexSeeds};
use crate::pda::pixel::pixel_index_lookup::{PixelIndexLookup, PixelIndexLookupSeeds};
use crate::pda::primary::primary::Primary;
use crate::pda::stake::stake::Stake;

mod pda;
mod ix;
mod error;

declare_id!("AKp4ZmWbXB11bd8xYLW2eZpqJSgXfvDQNSJRrGazKKAx");

#[program]
pub mod s_rgb {
    use super::*;

    pub fn init(ctx: Context<Init>) -> Result<()> {
        ix::init::ix(ctx)
    }

    pub fn stake_red(ctx: Context<StakeRed>, lamports: u64) -> Result<()> {
        ix::stake::red::ix(ctx, lamports)
    }

    pub fn stake_green(ctx: Context<StakeGreen>, lamports: u64) -> Result<()> {
        ix::stake::green::ix(ctx, lamports)
    }

    pub fn stake_blue(ctx: Context<StakeBlue>, lamports: u64) -> Result<()> {
        ix::stake::blue::ix(ctx, lamports)
    }

    pub fn harvest_red(ctx: Context<HarvestRed>) -> Result<()> {
        ix::harvest::red::ix(ctx)
    }

    pub fn harvest_green(ctx: Context<HarvestGreen>) -> Result<()> {
        ix::harvest::green::ix(ctx)
    }

    pub fn harvest_blue(ctx: Context<HarvestBlue>) -> Result<()> {
        ix::harvest::blue::ix(ctx)
    }

    pub fn init_pixel(ctx: Context<InitPixelMint>, seeds: PixelSeeds) -> Result<()> {
        ix::pixel::init::ix(ctx, seeds)
    }

    pub fn mint_pixel(
        ctx: Context<MintPixel>,
        pixel_index_seeds: PixelIndexSeeds,
        pixel_index_lookup_seeds: PixelIndexLookupSeeds,
        palette_seeds: PaletteSeeds,
    ) -> Result<()> {
        ix::pixel::mint::ix(
            ctx,
            pixel_index_seeds,
            pixel_index_lookup_seeds,
            palette_seeds,
        )
    }

    pub fn merge_pixel(
        ctx: Context<MergePixel>,
        dst_pixel_index_seeds: PixelIndexSeeds,
        dst_pixel_index_lookup_seeds: PixelIndexLookupSeeds,
        dst_palette_seeds: PaletteSeeds,
        amount: u32,
    ) -> Result<()> {
        ix::pixel::merge::ix(
            ctx,
            dst_pixel_index_seeds,
            dst_pixel_index_lookup_seeds,
            dst_palette_seeds,
            amount,
        )
    }

    pub fn add_pixel(
        ctx: Context<AddPixel>,
        dst_pixel_index_seeds: PixelIndexSeeds,
        dst_pixel_index_lookup_seeds: PixelIndexLookupSeeds,
    ) -> Result<()> {
        ix::pixel::math::add::ix(
            ctx,
            dst_pixel_index_seeds,
            dst_pixel_index_lookup_seeds,
        )
    }

    pub fn separate_pixel(
        ctx: Context<SeparatePixel>,
        dst_pixel_index_seeds: PixelIndexSeeds,
        dst_pixel_index_lookup_seeds: PixelIndexLookupSeeds,
    ) -> Result<()> {
        ix::pixel::math::separate::ix(
            ctx,
            dst_pixel_index_seeds,
            dst_pixel_index_lookup_seeds,
        )
    }

    pub fn init_proof_indexer(_ctx: Context<InitProofIndexer>) -> Result<()> {
        Ok(())
    }

    pub fn mint_nft_for_paint(ctx: Context<MintNftForPaint>, plan: Plan, url: Pubkey) -> Result<()> {
        ix::paint::mint::ix(ctx, plan, url)
    }
}

#[derive(Accounts)]
pub struct Init<'info> {
    // pda
    #[account(init,
    seeds = [
    pda::authority::authority::SEED.as_bytes()
    ], bump,
    space = pda::authority::authority::SIZE,
    payer = payer,
    )]
    pub authority: Account<'info, Authority>,
    #[account(init,
    seeds = [
    pda::primary::primary::SEED.as_bytes(),
    pda::primary::red::SEED.as_bytes()
    ], bump,
    space = pda::primary::primary::SIZE,
    payer = payer,
    )]
    pub red: Account<'info, Primary>,
    #[account(init,
    seeds = [
    pda::primary::primary::SEED.as_bytes(),
    pda::primary::green::SEED.as_bytes()
    ], bump,
    space = pda::primary::primary::SIZE,
    payer = payer,
    )]
    pub green: Account<'info, Primary>,
    #[account(init,
    seeds = [
    pda::primary::primary::SEED.as_bytes(),
    pda::primary::blue::SEED.as_bytes()
    ], bump,
    space = pda::primary::primary::SIZE,
    payer = payer,
    )]
    pub blue: Account<'info, Primary>,
    // cpi accounts
    #[account()]
    pub wsol: Account<'info, Mint>,
    #[account(init,
    mint::authority = authority,
    mint::freeze_authority = authority,
    mint::decimals = 0,
    payer = payer
    )]
    pub red_mint: Account<'info, Mint>,
    #[account(init,
    mint::authority = authority,
    mint::freeze_authority = authority,
    mint::decimals = 0,
    payer = payer
    )]
    pub green_mint: Account<'info, Mint>,
    #[account(init,
    mint::authority = authority,
    mint::freeze_authority = authority,
    mint::decimals = 0,
    payer = payer
    )]
    pub blue_mint: Account<'info, Mint>,
    // payer
    #[account(mut)]
    pub payer: Signer<'info>,
    // cpi programs
    pub token_program: Program<'info, Token>,
    // system
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct StakeRed<'info> {
    // pda
    #[account(mut,
    seeds = [
    pda::authority::authority::SEED.as_bytes()
    ], bump,
    )]
    pub authority: Account<'info, Authority>,
    #[account(mut,
    seeds = [
    pda::primary::primary::SEED.as_bytes(),
    pda::primary::red::SEED.as_bytes()
    ], bump,
    )]
    pub red: Account<'info, Primary>,
    #[account(init_if_needed,
    seeds = [
    pda::stake::stake::SEED.as_bytes(),
    pda::primary::red::SEED.as_bytes(),
    payer.key().as_ref()
    ], bump,
    space = pda::stake::stake::SIZE,
    payer = payer,
    )]
    pub stake: Account<'info, Stake>,
    // cpi accounts
    #[account(
    address = authority.wsol,
    owner = token_program.key()
    )]
    pub wsol: Account<'info, Mint>,
    #[account(init,
    token::mint = wsol,
    token::authority = stake,
    payer = payer
    )]
    pub stake_ta: Account<'info, TokenAccount>,
    #[account(init_if_needed,
    associated_token::mint = wsol,
    associated_token::authority = payer,
    payer = payer
    )]
    pub payer_ata: Account<'info, TokenAccount>,
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

#[derive(Accounts)]
pub struct StakeGreen<'info> {
    // pda
    #[account(mut,
    seeds = [
    pda::authority::authority::SEED.as_bytes()
    ], bump,
    )]
    pub authority: Account<'info, Authority>,
    #[account(mut,
    seeds = [
    pda::primary::primary::SEED.as_bytes(),
    pda::primary::green::SEED.as_bytes()
    ], bump,
    )]
    pub green: Account<'info, Primary>,
    #[account(init_if_needed,
    seeds = [
    pda::stake::stake::SEED.as_bytes(),
    pda::primary::green::SEED.as_bytes(),
    payer.key().as_ref()
    ], bump,
    space = pda::stake::stake::SIZE,
    payer = payer,
    )]
    pub stake: Account<'info, Stake>,
    // cpi accounts
    #[account(
    address = authority.wsol,
    owner = token_program.key()
    )]
    pub wsol: Account<'info, Mint>,
    #[account(init,
    token::mint = wsol,
    token::authority = stake,
    payer = payer
    )]
    pub stake_ta: Account<'info, TokenAccount>,
    #[account(init_if_needed,
    associated_token::mint = wsol,
    associated_token::authority = payer,
    payer = payer
    )]
    pub payer_ata: Account<'info, TokenAccount>,
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

#[derive(Accounts)]
pub struct StakeBlue<'info> {
    // pda
    #[account(mut,
    seeds = [
    pda::authority::authority::SEED.as_bytes()
    ], bump,
    )]
    pub authority: Account<'info, Authority>,
    #[account(mut,
    seeds = [
    pda::primary::primary::SEED.as_bytes(),
    pda::primary::blue::SEED.as_bytes()
    ], bump,
    )]
    pub blue: Account<'info, Primary>,
    #[account(init_if_needed,
    seeds = [
    pda::stake::stake::SEED.as_bytes(),
    pda::primary::blue::SEED.as_bytes(),
    payer.key().as_ref()
    ], bump,
    space = pda::stake::stake::SIZE,
    payer = payer,
    )]
    pub stake: Account<'info, Stake>,
    // cpi accounts
    #[account(
    address = authority.wsol,
    owner = token_program.key()
    )]
    pub wsol: Account<'info, Mint>,
    #[account(init,
    token::mint = wsol,
    token::authority = stake,
    payer = payer
    )]
    pub stake_ta: Account<'info, TokenAccount>,
    #[account(init_if_needed,
    associated_token::mint = wsol,
    associated_token::authority = payer,
    payer = payer
    )]
    pub payer_ata: Account<'info, TokenAccount>,
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

#[derive(Accounts)]
pub struct HarvestRed<'info> {
    // pda
    #[account(mut,
    seeds = [
    pda::authority::authority::SEED.as_bytes()
    ], bump,
    )]
    pub authority: Account<'info, Authority>,
    #[account(mut,
    seeds = [
    pda::primary::primary::SEED.as_bytes(),
    pda::primary::red::SEED.as_bytes()
    ], bump,
    )]
    pub red: Account<'info, Primary>,
    #[account(mut,
    seeds = [
    pda::stake::stake::SEED.as_bytes(),
    pda::primary::red::SEED.as_bytes(),
    payer.key().as_ref()
    ], bump,
    )]
    pub stake: Account<'info, Stake>,
    // cpi accounts
    #[account(
    address = authority.wsol,
    owner = token_program.key()
    )]
    pub wsol: Account<'info, Mint>,
    #[account(mut,
    address = stake.token_account,
    owner = token_program.key()
    )]
    pub stake_ta: Account<'info, TokenAccount>,
    #[account(mut,
    address = red.mint,
    owner = token_program.key()
    )]
    pub red_mint: Account<'info, Mint>,
    #[account(init_if_needed,
    associated_token::mint = red_mint,
    associated_token::authority = payer,
    payer = payer
    )]
    pub red_mint_ata: Account<'info, TokenAccount>,
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

#[derive(Accounts)]
pub struct HarvestGreen<'info> {
    // pda
    #[account(mut,
    seeds = [
    pda::authority::authority::SEED.as_bytes()
    ], bump,
    )]
    pub authority: Account<'info, Authority>,
    #[account(mut,
    seeds = [
    pda::primary::primary::SEED.as_bytes(),
    pda::primary::green::SEED.as_bytes()
    ], bump,
    )]
    pub green: Account<'info, Primary>,
    #[account(mut,
    seeds = [
    pda::stake::stake::SEED.as_bytes(),
    pda::primary::green::SEED.as_bytes(),
    payer.key().as_ref()
    ], bump,
    )]
    pub stake: Account<'info, Stake>,
    // cpi accounts
    #[account(
    address = authority.wsol,
    owner = token_program.key()
    )]
    pub wsol: Account<'info, Mint>,
    #[account(mut,
    address = stake.token_account,
    owner = token_program.key()
    )]
    pub stake_ta: Account<'info, TokenAccount>,
    #[account(mut,
    address = green.mint,
    owner = token_program.key()
    )]
    pub green_mint: Account<'info, Mint>,
    #[account(init_if_needed,
    associated_token::mint = green_mint,
    associated_token::authority = payer,
    payer = payer
    )]
    pub green_mint_ata: Account<'info, TokenAccount>,
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

#[derive(Accounts)]
pub struct HarvestBlue<'info> {
    // pda
    #[account(mut,
    seeds = [
    pda::authority::authority::SEED.as_bytes()
    ], bump,
    )]
    pub authority: Account<'info, Authority>,
    #[account(mut,
    seeds = [
    pda::primary::primary::SEED.as_bytes(),
    pda::primary::blue::SEED.as_bytes()
    ], bump,
    )]
    pub blue: Account<'info, Primary>,
    #[account(mut,
    seeds = [
    pda::stake::stake::SEED.as_bytes(),
    pda::primary::blue::SEED.as_bytes(),
    payer.key().as_ref()
    ], bump,
    )]
    pub stake: Account<'info, Stake>,
    // cpi accounts
    #[account(
    address = authority.wsol,
    owner = token_program.key()
    )]
    pub wsol: Account<'info, Mint>,
    #[account(mut,
    address = stake.token_account,
    owner = token_program.key()
    )]
    pub stake_ta: Account<'info, TokenAccount>,
    #[account(mut,
    address = blue.mint,
    owner = token_program.key()
    )]
    pub blue_mint: Account<'info, Mint>,
    #[account(init_if_needed,
    associated_token::mint = blue_mint,
    associated_token::authority = payer,
    payer = payer
    )]
    pub blue_mint_ata: Account<'info, TokenAccount>,
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

#[derive(Accounts)]
#[instruction(
seeds: PixelSeeds
)]
pub struct InitPixelMint<'info> {
    // cpi accounts
    #[account(init,
    seeds = [
    seeds.seed1().as_slice(),
    seeds.seed2().as_slice(),
    seeds.seed3().as_slice(),
    seeds.seed4().as_slice(),
    seeds.seed5().as_slice(),
    ], bump,
    space = pda::pixel::pixel::SIZE,
    payer = payer,
    )]
    pub pixel: Account<'info, Pixel>,
    #[account(init,
    mint::authority = pixel,
    mint::freeze_authority = pixel,
    mint::decimals = 0,
    payer = payer
    )]
    pub pixel_mint: Account<'info, Mint>,
    // payer
    #[account(mut)]
    pub payer: Signer<'info>,
    // cpi programs
    pub token_program: Program<'info, Token>,
    // system
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
#[instruction(
pixel_index_seeds: PixelIndexSeeds,
pixel_index_lookup_seeds: PixelIndexLookupSeeds,
palette_seeds: PaletteSeeds,
)]
pub struct MintPixel<'info> {
    // pda
    #[account(
    seeds = [
    pixel.seed1().as_slice(),
    pixel.seed2().as_slice(),
    pixel.seed3().as_slice(),
    pixel.seed4().as_slice(),
    pixel.seed5().as_slice(),
    ], bump,
    )]
    pub pixel: Box<Account<'info, Pixel>>,
    #[account(init_if_needed,
    seeds = [
    pixel_index_seeds.seed1().as_slice(),
    payer.key().as_ref(),
    pixel_index_seeds.seed3().as_slice(),
    pixel_index_seeds.seed4().as_slice(),
    ], bump,
    space = pda::pixel::pixel_index::SIZE,
    payer = payer,
    )]
    pub pixel_index: Box<Account<'info, PixelIndex>>,
    #[account(init_if_needed,
    seeds = [
    pixel_index_lookup_seeds.seed1().as_slice(),
    payer.key().as_ref(),
    pixel_index_lookup_seeds.seed3().as_slice(),
    pixel_index_lookup_seeds.seed4().as_slice(),
    pixel_index_lookup_seeds.seed5().as_slice(),
    pixel_index_lookup_seeds.seed6().as_slice(),
    ], bump,
    space = pda::pixel::pixel_index_lookup::SIZE,
    payer = payer,
    )]
    pub pixel_index_lookup: Box<Account<'info, PixelIndexLookup>>,
    #[account(init_if_needed,
    seeds = [
    palette_seeds.seed1().as_slice(),
    payer.key().as_ref(),
    palette_seeds.seed3().as_slice(),
    ], bump,
    space = pda::pixel::palette::SIZE,
    payer = payer,
    )]
    pub palette: Box<Account<'info, Palette>>,
    #[account(
    seeds = [
    pda::primary::primary::SEED.as_bytes(),
    pda::primary::red::SEED.as_bytes()
    ], bump,
    )]
    pub red: Box<Account<'info, Primary>>,
    #[account(
    seeds = [
    pda::primary::primary::SEED.as_bytes(),
    pda::primary::green::SEED.as_bytes()
    ], bump,
    )]
    pub green: Box<Account<'info, Primary>>,
    #[account(
    seeds = [
    pda::primary::primary::SEED.as_bytes(),
    pda::primary::blue::SEED.as_bytes()
    ], bump,
    )]
    pub blue: Box<Account<'info, Primary>>,
    // cpi accounts
    #[account(mut,
    address = pixel.mint,
    owner = token_program.key()
    )]
    pub pixel_mint: Account<'info, Mint>,
    #[account(init_if_needed,
    associated_token::mint = pixel_mint,
    associated_token::authority = payer,
    payer = payer
    )]
    pub pixel_mint_ata: Box<Account<'info, TokenAccount>>,
    #[account(mut,
    address = red.mint,
    owner = token_program.key()
    )]
    pub red_mint: Account<'info, Mint>,
    #[account(init_if_needed,
    associated_token::mint = red_mint,
    associated_token::authority = payer,
    payer = payer
    )]
    pub red_mint_ata: Box<Account<'info, TokenAccount>>,
    #[account(mut,
    address = green.mint,
    owner = token_program.key()
    )]
    pub green_mint: Account<'info, Mint>,
    #[account(init_if_needed,
    associated_token::mint = green_mint,
    associated_token::authority = payer,
    payer = payer
    )]
    pub green_mint_ata: Box<Account<'info, TokenAccount>>,
    #[account(mut,
    address = blue.mint,
    owner = token_program.key()
    )]
    pub blue_mint: Account<'info, Mint>,
    #[account(init_if_needed,
    associated_token::mint = blue_mint,
    associated_token::authority = payer,
    payer = payer
    )]
    pub blue_mint_ata: Box<Account<'info, TokenAccount>>,
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

#[derive(Accounts)]
#[instruction(
dst_pixel_index_seeds: PixelIndexSeeds,
dst_pixel_index_lookup_seeds: PixelIndexLookupSeeds,
dst_palette_seeds: PaletteSeeds,
)]
pub struct MergePixel<'info> {
    // pda
    #[account(
    seeds = [
    src_pixel.seed1().as_slice(),
    src_pixel.seed2().as_slice(),
    src_pixel.seed3().as_slice(),
    src_pixel.seed4().as_slice(),
    src_pixel.seed5().as_slice(),
    ], bump,
    )]
    pub src_pixel: Box<Account<'info, Pixel>>,
    #[account(
    seeds = [
    dst_pixel.seed1().as_slice(),
    dst_pixel.seed2().as_slice(),
    dst_pixel.seed3().as_slice(),
    dst_pixel.seed4().as_slice(),
    dst_pixel.seed5().as_slice(),
    ], bump,
    )]
    pub dst_pixel: Box<Account<'info, Pixel>>,
    #[account(init_if_needed,
    seeds = [
    dst_pixel_index_seeds.seed1().as_slice(),
    payer.key().as_ref(),
    dst_pixel_index_seeds.seed3().as_slice(),
    dst_pixel_index_seeds.seed4().as_slice(),
    ], bump,
    space = pda::pixel::pixel_index::SIZE,
    payer = payer,
    )]
    pub dst_pixel_index: Box<Account<'info, PixelIndex>>,
    #[account(init_if_needed,
    seeds = [
    dst_pixel_index_lookup_seeds.seed1().as_slice(),
    payer.key().as_ref(),
    dst_pixel_index_lookup_seeds.seed3().as_slice(),
    dst_pixel_index_lookup_seeds.seed4().as_slice(),
    dst_pixel_index_lookup_seeds.seed5().as_slice(),
    dst_pixel_index_lookup_seeds.seed6().as_slice(),
    ], bump,
    space = pda::pixel::pixel_index_lookup::SIZE,
    payer = payer,
    )]
    pub dst_pixel_index_lookup: Box<Account<'info, PixelIndexLookup>>,
    #[account(init_if_needed,
    seeds = [
    dst_palette_seeds.seed1().as_slice(),
    payer.key().as_ref(),
    dst_palette_seeds.seed3().as_slice(),
    ], bump,
    space = pda::pixel::palette::SIZE,
    payer = payer,
    )]
    pub dst_palette: Box<Account<'info, Palette>>,
    // cpi accounts
    #[account(mut,
    address = src_pixel.mint,
    owner = token_program.key()
    )]
    pub src_pixel_mint: Account<'info, Mint>,
    #[account(mut,
    associated_token::mint = src_pixel_mint,
    associated_token::authority = payer
    )]
    pub src_pixel_mint_ata: Box<Account<'info, TokenAccount>>,
    #[account(mut,
    address = dst_pixel.mint,
    owner = token_program.key()
    )]
    pub dst_pixel_mint: Account<'info, Mint>,
    #[account(init_if_needed,
    associated_token::mint = dst_pixel_mint,
    associated_token::authority = payer,
    payer = payer
    )]
    pub dst_pixel_mint_ata: Box<Account<'info, TokenAccount>>,
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

#[derive(Accounts)]
#[instruction(
dst_pixel_index_seeds: PixelIndexSeeds,
dst_pixel_index_lookup_seeds: PixelIndexLookupSeeds,
)]
pub struct AddPixel<'info> {
    // pda
    #[account(
    seeds = [
    left_pixel.seed1().as_slice(),
    left_pixel.seed2().as_slice(),
    left_pixel.seed3().as_slice(),
    left_pixel.seed4().as_slice(),
    left_pixel.seed5().as_slice(),
    ], bump,
    )]
    pub left_pixel: Box<Account<'info, Pixel>>,
    #[account(
    seeds = [
    right_pixel.seed1().as_slice(),
    right_pixel.seed2().as_slice(),
    right_pixel.seed3().as_slice(),
    right_pixel.seed4().as_slice(),
    right_pixel.seed5().as_slice(),
    ], bump,
    )]
    pub right_pixel: Box<Account<'info, Pixel>>,
    #[account(
    seeds = [
    dst_pixel.seed1().as_slice(),
    dst_pixel.seed2().as_slice(),
    dst_pixel.seed3().as_slice(),
    dst_pixel.seed4().as_slice(),
    dst_pixel.seed5().as_slice(),
    ], bump,
    )]
    pub dst_pixel: Box<Account<'info, Pixel>>,
    #[account(init_if_needed,
    seeds = [
    dst_pixel_index_seeds.seed1().as_slice(),
    payer.key().as_ref(),
    dst_pixel_index_seeds.seed3().as_slice(),
    dst_pixel_index_seeds.seed4().as_slice(),
    ], bump,
    space = pda::pixel::pixel_index::SIZE,
    payer = payer,
    )]
    pub dst_pixel_index: Box<Account<'info, PixelIndex>>,
    #[account(init_if_needed,
    seeds = [
    dst_pixel_index_lookup_seeds.seed1().as_slice(),
    payer.key().as_ref(),
    dst_pixel_index_lookup_seeds.seed3().as_slice(),
    dst_pixel_index_lookup_seeds.seed4().as_slice(),
    dst_pixel_index_lookup_seeds.seed5().as_slice(),
    dst_pixel_index_lookup_seeds.seed6().as_slice(),
    ], bump,
    space = pda::pixel::pixel_index_lookup::SIZE,
    payer = payer,
    )]
    pub dst_pixel_index_lookup: Box<Account<'info, PixelIndexLookup>>,
    #[account(mut,
    seeds = [
    dst_palette.seed1().as_slice(),
    payer.key().as_ref(),
    dst_palette.seed3().as_slice(),
    ], bump,
    )]
    pub dst_palette: Box<Account<'info, Palette>>,
    // cpi accounts
    #[account(mut,
    address = left_pixel.mint,
    owner = token_program.key()
    )]
    pub left_pixel_mint: Account<'info, Mint>,
    #[account(mut,
    associated_token::mint = left_pixel_mint,
    associated_token::authority = payer
    )]
    pub left_pixel_mint_ata: Box<Account<'info, TokenAccount>>,
    #[account(mut,
    address = right_pixel.mint,
    owner = token_program.key()
    )]
    pub right_pixel_mint: Account<'info, Mint>,
    #[account(mut,
    associated_token::mint = right_pixel_mint,
    associated_token::authority = payer
    )]
    pub right_pixel_mint_ata: Box<Account<'info, TokenAccount>>,
    #[account(mut,
    address = dst_pixel.mint,
    owner = token_program.key()
    )]
    pub dst_pixel_mint: Account<'info, Mint>,
    #[account(init_if_needed,
    associated_token::mint = dst_pixel_mint,
    associated_token::authority = payer,
    payer = payer
    )]
    pub dst_pixel_mint_ata: Box<Account<'info, TokenAccount>>,
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

#[derive(Accounts)]
#[instruction(
dst_pixel_index_seeds: PixelIndexSeeds,
dst_pixel_index_lookup_seeds: PixelIndexLookupSeeds,
)]
pub struct SeparatePixel<'info> {
    // pda
    #[account(
    seeds = [
    left_pixel.seed1().as_slice(),
    left_pixel.seed2().as_slice(),
    left_pixel.seed3().as_slice(),
    left_pixel.seed4().as_slice(),
    left_pixel.seed5().as_slice(),
    ], bump,
    )]
    pub left_pixel: Box<Account<'info, Pixel>>,
    #[account(
    seeds = [
    right_pixel.seed1().as_slice(),
    right_pixel.seed2().as_slice(),
    right_pixel.seed3().as_slice(),
    right_pixel.seed4().as_slice(),
    right_pixel.seed5().as_slice(),
    ], bump,
    )]
    pub right_pixel: Box<Account<'info, Pixel>>,
    #[account(
    seeds = [
    dst_pixel.seed1().as_slice(),
    dst_pixel.seed2().as_slice(),
    dst_pixel.seed3().as_slice(),
    dst_pixel.seed4().as_slice(),
    dst_pixel.seed5().as_slice(),
    ], bump,
    )]
    pub dst_pixel: Box<Account<'info, Pixel>>,
    #[account(init_if_needed,
    seeds = [
    dst_pixel_index_seeds.seed1().as_slice(),
    payer.key().as_ref(),
    dst_pixel_index_seeds.seed3().as_slice(),
    dst_pixel_index_seeds.seed4().as_slice(),
    ], bump,
    space = pda::pixel::pixel_index::SIZE,
    payer = payer,
    )]
    pub dst_pixel_index: Box<Account<'info, PixelIndex>>,
    #[account(init_if_needed,
    seeds = [
    dst_pixel_index_lookup_seeds.seed1().as_slice(),
    payer.key().as_ref(),
    dst_pixel_index_lookup_seeds.seed3().as_slice(),
    dst_pixel_index_lookup_seeds.seed4().as_slice(),
    dst_pixel_index_lookup_seeds.seed5().as_slice(),
    dst_pixel_index_lookup_seeds.seed6().as_slice(),
    ], bump,
    space = pda::pixel::pixel_index_lookup::SIZE,
    payer = payer,
    )]
    pub dst_pixel_index_lookup: Box<Account<'info, PixelIndexLookup>>,
    #[account(mut,
    seeds = [
    dst_palette.seed1().as_slice(),
    payer.key().as_ref(),
    dst_palette.seed3().as_slice(),
    ], bump,
    )]
    pub dst_palette: Box<Account<'info, Palette>>,
    // cpi accounts
    #[account(mut,
    address = left_pixel.mint,
    owner = token_program.key()
    )]
    pub left_pixel_mint: Account<'info, Mint>,
    #[account(mut,
    associated_token::mint = left_pixel_mint,
    associated_token::authority = payer
    )]
    pub left_pixel_mint_ata: Box<Account<'info, TokenAccount>>,
    #[account(mut,
    address = dst_pixel.mint,
    owner = token_program.key()
    )]
    pub dst_pixel_mint: Account<'info, Mint>,
    #[account(init_if_needed,
    associated_token::mint = dst_pixel_mint,
    associated_token::authority = payer,
    payer = payer
    )]
    pub dst_pixel_mint_ata: Box<Account<'info, TokenAccount>>,
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
pub struct MintNftForPaint<'info> {
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
pub struct BurnPixelsForPaint<'info> {
    // pda
    #[account(mut,
    seeds = [
    pda::paint::proof::SEED.as_bytes(),
    & mint.key().to_bytes()
    ], bump,
    )]
    pub proof: Box<Account<'info, Proof>>,
    #[account(
    seeds = [
    pda::pixel::pixel::SEED.as_bytes(),
    (1 as u32).to_string().as_bytes(), // r
    (0 as u32).to_string().as_bytes(), // g
    (0 as u32).to_string().as_bytes(), // b
    (1 as u32).to_string().as_bytes(), // depth
    ], bump,
    )]
    pub red_pixel: Box<Account<'info, Pixel>>,
    #[account(
    seeds = [
    pda::pixel::pixel::SEED.as_bytes(),
    (0 as u32).to_string().as_bytes(), // r
    (1 as u32).to_string().as_bytes(), // g
    (0 as u32).to_string().as_bytes(), // b
    (1 as u32).to_string().as_bytes(), // depth
    ], bump,
    )]
    pub green_pixel: Box<Account<'info, Pixel>>,
    #[account(
    seeds = [
    pda::pixel::pixel::SEED.as_bytes(),
    (0 as u32).to_string().as_bytes(), // r
    (0 as u32).to_string().as_bytes(), // g
    (1 as u32).to_string().as_bytes(), // b
    (1 as u32).to_string().as_bytes(), // depth
    ], bump,
    )]
    pub blue_pixel: Box<Account<'info, Pixel>>,
    #[account(
    seeds = [
    pda::pixel::pixel::SEED.as_bytes(),
    (1 as u32).to_string().as_bytes(), // r
    (1 as u32).to_string().as_bytes(), // g
    (0 as u32).to_string().as_bytes(), // b
    (1 as u32).to_string().as_bytes(), // depth
    ], bump,
    )]
    pub yellow_pixel: Box<Account<'info, Pixel>>,
    #[account(
    seeds = [
    pda::pixel::pixel::SEED.as_bytes(),
    (1 as u32).to_string().as_bytes(), // r
    (0 as u32).to_string().as_bytes(), // g
    (1 as u32).to_string().as_bytes(), // b
    (1 as u32).to_string().as_bytes(), // depth
    ], bump,
    )]
    pub magenta_pixel: Box<Account<'info, Pixel>>,
    #[account(
    seeds = [
    pda::pixel::pixel::SEED.as_bytes(),
    (0 as u32).to_string().as_bytes(), // r
    (1 as u32).to_string().as_bytes(), // g
    (1 as u32).to_string().as_bytes(), // b
    (1 as u32).to_string().as_bytes(), // depth
    ], bump,
    )]
    pub cyan_pixel: Box<Account<'info, Pixel>>,
    #[account(
    seeds = [
    pda::pixel::pixel::SEED.as_bytes(),
    (1 as u32).to_string().as_bytes(), // r
    (1 as u32).to_string().as_bytes(), // g
    (1 as u32).to_string().as_bytes(), // b
    (1 as u32).to_string().as_bytes(), // depth
    ], bump,
    )]
    pub white_pixel: Box<Account<'info, Pixel>>,
    // cpi accounts
    #[account(mut,
    address = red_pixel.mint
    )]
    pub red_pixel_mint: Box<Account<'info, Mint>>,
    #[account(init_if_needed,
    associated_token::mint = red_pixel_mint,
    associated_token::authority = payer,
    payer = payer
    )]
    pub red_pixel_mint_ata: Box<Account<'info, TokenAccount>>,
    #[account(mut,
    address = green_pixel.mint
    )]
    pub green_pixel_mint: Box<Account<'info, Mint>>,
    #[account(init_if_needed,
    associated_token::mint = green_pixel_mint,
    associated_token::authority = payer,
    payer = payer
    )]
    pub green_pixel_mint_ata: Box<Account<'info, TokenAccount>>,
    #[account(mut,
    address = blue_pixel.mint
    )]
    pub blue_pixel_mint: Box<Account<'info, Mint>>,
    #[account(init_if_needed,
    associated_token::mint = blue_pixel_mint,
    associated_token::authority = payer,
    payer = payer
    )]
    pub blue_pixel_mint_ata: Box<Account<'info, TokenAccount>>,
    #[account(mut,
    address = yellow_pixel.mint
    )]
    pub yellow_pixel_mint: Box<Account<'info, Mint>>,
    #[account(init_if_needed,
    associated_token::mint = yellow_pixel_mint,
    associated_token::authority = payer,
    payer = payer
    )]
    pub yellow_pixel_mint_ata: Box<Account<'info, TokenAccount>>,
    #[account(mut,
    address = magenta_pixel.mint
    )]
    pub magenta_pixel_mint: Box<Account<'info, Mint>>,
    #[account(init_if_needed,
    associated_token::mint = magenta_pixel_mint,
    associated_token::authority = payer,
    payer = payer
    )]
    pub magenta_pixel_mint_ata: Box<Account<'info, TokenAccount>>,
    #[account(mut,
    address = cyan_pixel.mint
    )]
    pub cyan_pixel_mint: Box<Account<'info, Mint>>,
    #[account(init_if_needed,
    associated_token::mint = cyan_pixel_mint,
    associated_token::authority = payer,
    payer = payer
    )]
    pub cyan_pixel_mint_ata: Box<Account<'info, TokenAccount>>,
    #[account(mut,
    address = white_pixel.mint
    )]
    pub white_pixel_mint: Box<Account<'info, Mint>>,
    #[account(init_if_needed,
    associated_token::mint = white_pixel_mint,
    associated_token::authority = payer,
    payer = payer
    )]
    pub white_pixel_mint_ata: Box<Account<'info, TokenAccount>>,
    #[account(mut,
    address = proof.nft.mint
    )]
    pub mint: Box<Account<'info, Mint>>,
    #[account(
    associated_token::mint = mint,
    associated_token::authority = payer
    )]
    pub mint_ata: Box<Account<'info, TokenAccount>>,
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
