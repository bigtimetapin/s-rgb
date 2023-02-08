use std::fmt;
use std::fmt::Formatter;
use anchor_lang::prelude::*;

pub const SEED: &str = "pixel-index";

pub const SIZE: usize = 8 // discriminator
    + 32 // authority
    + 1 // depth
    + 16 // index
    + 32; // pixel

#[account]
pub struct PixelIndex {
    pub seeds: Seeds,
    pub pixel: Pubkey,
    pub indexed: bool,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Seeds {
    pub authority: Pubkey,
    pub depth: u8,
    pub index: u128,
}

impl fmt::Display for Seeds {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}/{}/{}/{}", SEED, self.authority, self.depth, self.index)
    }
}

impl fmt::Display for PixelIndex {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        Seeds::fmt(&self.seeds, f)
    }
}
