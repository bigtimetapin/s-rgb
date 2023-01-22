use anchor_lang::prelude::*;
use anchor_spl::associated_token::AssociatedToken;
use anchor_spl::token::{Mint, Token, TokenAccount};
use crate::pda::authority::authority::Authority;
use crate::pda::primary::primary::Primary;
use crate::pda::stake::stake::Stake;

mod pda;
mod ix;

declare_id!("3tgVL9TfPbEe7tgxjjmMCLUMzyFqspJkGW3u4hiEoFu6");

#[program]
pub mod s_rgb {
    use super::*;

    pub fn init(ctx: Context<Init>) -> Result<()> {
        ix::init::ix(ctx)
    }
}

#[derive(Accounts)]
pub struct Init<'info> {
    // pda
    #[account(init,
    seeds = [
    pda::authority::authority::SEED.as_bytes()
    ], bump,
    payer = payer,
    space = pda::authority::authority::SIZE
    )]
    pub authority: Account<'info, Authority>,
    #[account(init,
    seeds = [
    pda::primary::primary::SEED.as_bytes(),
    pda::primary::red::SEED.as_bytes()
    ], bump,
    payer = payer,
    space = pda::primary::primary::SIZE
    )]
    pub red: Account<'info, Primary>,
    #[account(init,
    seeds = [
    pda::primary::primary::SEED.as_bytes(),
    pda::primary::green::SEED.as_bytes()
    ], bump,
    payer = payer,
    space = pda::primary::primary::SIZE
    )]
    pub green: Account<'info, Primary>,
    #[account(init,
    seeds = [
    pda::primary::primary::SEED.as_bytes(),
    pda::primary::blue::SEED.as_bytes()
    ], bump,
    payer = payer,
    space = pda::primary::primary::SIZE
    )]
    pub blue: Account<'info, Primary>,
    // cpi accounts
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
    pub associated_token_program: Program<'info, AssociatedToken>,
    // system
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}
