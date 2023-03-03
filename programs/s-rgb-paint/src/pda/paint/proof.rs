use anchor_lang::prelude::*;

pub const SEED: &str = "proof";

pub const SIZE: usize = 8 // discriminator
    + 1 // burned
    + (8 * 7) // plan
    + 32 // nft mint
    + 32; // nft url


#[account]
pub struct Proof {
    pub burned: Burned,
    pub nft: Nft,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Nft {
    pub mint: Pubkey,
    pub url: Pubkey,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Burned {
    pub burned: bool,
    pub plan: Plan,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Plan {
    pub red: u64,
    pub green: u64,
    pub blue: u64,
    pub yellow: u64,
    pub magenta: u64,
    pub cyan: u64,
    pub white: u64,
}
