use anchor_lang::prelude::*;

pub const SEED: &str = "proof";

pub const SIZE: usize = 8 // discriminator
    + 32 // mint
    + (8 * 7); // pixel balances


#[account]
pub struct Proof {
    pub mint: Pubkey,
    pub burned: Burned,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Burned {
    pub red: u64,
    pub green: u64,
    pub blue: u64,
    pub yellow: u64,
    pub magenta: u64,
    pub cyan: u64,
    pub white: u64,
}
