use anchor_lang::prelude::*;
use anchor_spl::associated_token::AssociatedToken;
use anchor_spl::token::{Mint, Token, TokenAccount};
use crate::pda::authority::authority::Authority;
use crate::pda::primary::primary::Primary;
use crate::pda::stake::stake::Stake;

pub mod pda;
mod ix;

declare_id!("FAimDhcwrK9hikkkFnLx3FXs32ZBk2kw8kwzbLJH8AcV");

#[program]
pub mod s_rgb_stake {
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
