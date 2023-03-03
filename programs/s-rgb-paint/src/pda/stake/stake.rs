use anchor_lang::prelude::*;

pub const SEED: &str = "stake";

pub const SIZE: usize = 8 // discriminator
    + 32 // pool
    + 8 // timestamp
    + 32; // token-account

#[account]
pub struct Stake {
    pub pool: Pubkey,
    pub timestamp: i64,
    pub token_account: Pubkey,
}
