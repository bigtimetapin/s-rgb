use anchor_lang::prelude::*;

pub const SEED: &str = "stake";

pub const SIZE: usize = 8 // discriminator
    + 8; // amount

#[account]
pub struct Stake {
    pub amount: u64,
}
