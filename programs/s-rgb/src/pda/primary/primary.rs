use anchor_lang::prelude::*;

pub const SEED: &str = "primary";

pub const SIZE: usize = 8 // discriminator
    + 32 // mint
    + 8; // tvl

#[account]
pub struct Primary {
    pub mint: Pubkey,
    pub tvl: u64,
}
