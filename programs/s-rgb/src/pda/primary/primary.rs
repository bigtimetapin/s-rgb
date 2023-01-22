use anchor_lang::prelude::*;

pub const SEED: &str = "primary";

pub const SIZE: usize = 8 // discriminator
    + 32; // mint

#[account]
pub struct Primary {
    pub mint: Pubkey,
}
