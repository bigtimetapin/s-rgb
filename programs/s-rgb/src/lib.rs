use anchor_lang::prelude::*;
use crate::pda::primary::primary::Primary;

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
    // payer
    #[account(mut)]
    pub payer: Signer<'info>,
    // system
    pub system_program: Program<'info, System>,
}
