use anchor_lang::prelude::*;

pub const SEED: &str = "proof-index";

pub const SIZE: usize = 8 // discriminator
    + 32 // proof
    + 16; // index

#[account]
pub struct ProofIndex {
    pub proof: Pubkey,
    pub index: u128,
}
