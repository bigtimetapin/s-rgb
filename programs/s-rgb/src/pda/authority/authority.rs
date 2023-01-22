use anchor_lang::prelude::*;

pub const SEED: &str = "authority";

pub const SIZE: usize = 8 // discriminator
    + 8; // tvl

#[account]
pub struct Authority {
    pub tvl: u64,
}
