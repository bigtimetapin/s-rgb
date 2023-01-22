use anchor_lang::prelude::*;

pub const SEED: &str = "stake";

pub const SIZE: usize = 8 // discriminator
    + 32 // pool
    + 8; // timestamp

#[account]
pub struct Stake {
    pub pool: Pubkey,
    pub timestamp: i64,
}
