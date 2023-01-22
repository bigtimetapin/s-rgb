use anchor_lang::prelude::*;

pub const SEED: &str = "stake";

pub const SIZE: usize = 8 // discriminator
    + 8 // amount
    + 32; // pool

#[account]
pub struct Stake {
    pub amount: u64,
    pub pool: Pubkey,
}
