use anchor_lang::prelude::*;

pub const SEED: &str = "proof-indexer";

pub const SIZE: usize = 8 // discriminator
    + 16; // indexer

#[account]
pub struct ProofIndexer {
    pub indexer: u128,
}
