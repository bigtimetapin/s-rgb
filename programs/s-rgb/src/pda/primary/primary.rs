use anchor_lang::prelude::*;

pub const SEED: &str = "primary";

pub const SIZE: usize = 8 // discriminator
    + 8; // tvl

#[account]
pub struct Primary {
    pub tvl: u64,
}
