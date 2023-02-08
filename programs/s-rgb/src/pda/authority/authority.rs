use anchor_lang::prelude::*;

pub const SEED: &str = "authority";

pub const SIZE: usize = 8 // discriminator
    + 32 // wsol
    + 8; // tvl

#[account]
// TODO; rename global-tvl
// avoid using singular authority for signing as pda
// if another pda is already in scope
// consuming less CUs
pub struct Authority {
    pub wsol: Pubkey,
    pub tvl: u64,
}
