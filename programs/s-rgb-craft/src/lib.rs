use crate::pda::craft::palette::{Palette, PaletteSeeds};
use crate::pda::craft::pixel::{Pixel, PixelSeeds};
use crate::pda::craft::pixel_index::{PixelIndex, PixelIndexSeeds};
use crate::pda::craft::pixel_index_lookup::{PixelIndexLookup, PixelIndexLookupSeeds};
use crate::pda::{HasFiveSeeds, HasFourSeeds, HasSixSeeds, HasThreeSeeds};
use anchor_lang::prelude::*;
use anchor_spl::associated_token::AssociatedToken;
use anchor_spl::token::{Mint, Token, TokenAccount};
use mpl_token_metadata::state::{Metadata, PREFIX};
use s_rgb_stake::pda::{primary, primary::primary::Primary};

mod error;
mod ix;
pub mod pda;

declare_id!("G4Wm9es5xZoZLpyzoFHrtgM4Vmo84CenCSrCK6ZxDSmf");

#[program]
pub mod s_rgb_craft {
    use super::*;

    pub fn init_pixel(ctx: Context<InitPixelMint>, seeds: PixelSeeds) -> Result<()> {
        ix::craft::init::ix(ctx, seeds)
    }

    pub fn add_metadata(ctx: Context<AddMetadataToPixel>, url: Pubkey) -> Result<()> {
        ix::craft::add_metadata::ix(ctx, url)
    }

    pub fn edit_metdata(ctx: Context<EditMetadata>, url: Pubkey) -> Result<()> {
        ix::craft::edit_metadata::ix(ctx, url)
    }

    pub fn mint_pixel(
        ctx: Context<MintPixel>,
        pixel_index_seeds: PixelIndexSeeds,
        pixel_index_lookup_seeds: PixelIndexLookupSeeds,
        palette_seeds: PaletteSeeds,
    ) -> Result<()> {
        ix::craft::mint::ix(
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
        ix::craft::merge::ix(
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
        ix::craft::math::add::ix(ctx, dst_pixel_index_seeds, dst_pixel_index_lookup_seeds)
    }

    pub fn separate_pixel(
        ctx: Context<SeparatePixel>,
        dst_pixel_index_seeds: PixelIndexSeeds,
        dst_pixel_index_lookup_seeds: PixelIndexLookupSeeds,
    ) -> Result<()> {
        ix::craft::math::separate::ix(ctx, dst_pixel_index_seeds, dst_pixel_index_lookup_seeds)
    }
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
    space = pda::craft::pixel::SIZE,
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
pub struct AddMetadataToPixel<'info> {
    #[account()]
    pub pixel: Account<'info, Pixel>,
    #[account(
        address = pixel.mint
    )]
    pub pixel_mint: Account<'info, Mint>,
    #[account(mut,
    seeds = [
    PREFIX.as_bytes(),
    metadata_program.key().as_ref(),
    pixel_mint.key().as_ref()
    ], bump,
    seeds::program = metadata_program.key()
    )]
    /// CHECK: uninitialized metadata
    pub metadata: UncheckedAccount<'info>,
    // payer
    #[account(mut)]
    pub payer: Signer<'info>,
    // cpi programs
    pub metadata_program: Program<'info, MetadataProgram>,
    // system
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct EditMetadata<'info> {
    #[account()]
    pub pixel: Account<'info, Pixel>,
    #[account(
        address = pixel.mint
    )]
    pub pixel_mint: Account<'info, Mint>,
    #[account(mut,
    seeds = [
    PREFIX.as_bytes(),
    metadata_program.key().as_ref(),
    pixel_mint.key().as_ref()
    ], bump,
    seeds::program = metadata_program.key()
    )]
    pub metadata: Account<'info, InitializedMetadata>,
    // cpi programs
    pub metadata_program: Program<'info, MetadataProgram>,
    // system
    pub system_program: Program<'info, System>,
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
    space = pda::craft::pixel_index::SIZE,
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
    space = pda::craft::pixel_index_lookup::SIZE,
    payer = payer,
    )]
    pub pixel_index_lookup: Box<Account<'info, PixelIndexLookup>>,
    #[account(init_if_needed,
    seeds = [
    palette_seeds.seed1().as_slice(),
    payer.key().as_ref(),
    palette_seeds.seed3().as_slice(),
    ], bump,
    space = pda::craft::palette::SIZE,
    payer = payer,
    )]
    pub palette: Box<Account<'info, Palette>>,
    #[account(
    seeds = [
    primary::primary::SEED.as_bytes(),
    primary::red::SEED.as_bytes()
    ], bump,
    seeds::program = staking_program.key()
    )]
    pub red: Box<Account<'info, Primary>>,
    #[account(
    seeds = [
    primary::primary::SEED.as_bytes(),
    primary::green::SEED.as_bytes()
    ], bump,
    seeds::program = staking_program.key()
    )]
    pub green: Box<Account<'info, Primary>>,
    #[account(
    seeds = [
    primary::primary::SEED.as_bytes(),
    primary::blue::SEED.as_bytes()
    ], bump,
    seeds::program = staking_program.key()
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
    pub staking_program: Program<'info, StakingProgram>,
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
    space = pda::craft::pixel_index::SIZE,
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
    space = pda::craft::pixel_index_lookup::SIZE,
    payer = payer,
    )]
    pub dst_pixel_index_lookup: Box<Account<'info, PixelIndexLookup>>,
    #[account(init_if_needed,
    seeds = [
    dst_palette_seeds.seed1().as_slice(),
    payer.key().as_ref(),
    dst_palette_seeds.seed3().as_slice(),
    ], bump,
    space = pda::craft::palette::SIZE,
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
    space = pda::craft::pixel_index::SIZE,
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
    space = pda::craft::pixel_index_lookup::SIZE,
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
    space = pda::craft::pixel_index::SIZE,
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
    space = pda::craft::pixel_index_lookup::SIZE,
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

#[derive(Clone)]
pub struct StakingProgram;

impl anchor_lang::Id for StakingProgram {
    fn id() -> Pubkey {
        s_rgb_stake::ID
    }
}

#[derive(Clone)]
pub struct MetadataProgram;

impl anchor_lang::Id for MetadataProgram {
    fn id() -> Pubkey {
        mpl_token_metadata::ID
    }
}

#[derive(Clone, Debug, Default, PartialEq)]
pub struct InitializedMetadata(Metadata);

impl anchor_lang::Owner for InitializedMetadata {
    fn owner() -> Pubkey {
        mpl_token_metadata::ID
    }
}

impl anchor_lang::AccountDeserialize for InitializedMetadata {
    fn try_deserialize_unchecked(buf: &mut &[u8]) -> Result<Self> {
        Metadata::deserialize(buf)
            .map(InitializedMetadata)
            .map_err(Into::into)
    }
}

impl anchor_lang::AccountSerialize for InitializedMetadata {}
