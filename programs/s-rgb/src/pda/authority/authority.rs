use anchor_lang::prelude::*;

pub const SEED: &str = "authority";

pub const SIZE: usize = 8 // discriminator
    + 32; // hydra

#[account]
pub struct Authority {
    pub hydra: Pubkey,
}
