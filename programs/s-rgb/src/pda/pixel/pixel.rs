use std::fmt;
use std::fmt::Formatter;
use anchor_lang::prelude::*;

pub const SEED: &str = "pixel";

pub const SIZE: usize = 8 // discriminator
    + 32 // mint
    + 4 // r
    + 4 // g
    + 4 // b
    + 1; // depth

#[account]
pub struct Pixel {
    pub seeds: PixelSeeds,
    pub mint: Pubkey,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct PixelSeeds {
    pub r: u32,
    pub g: u32,
    pub b: u32,
    pub depth: u8,
}

impl fmt::Display for PixelSeeds {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        write!(f, "{}/r{}/g{}/b{}/d{}", SEED, self.r, self.g, self.b, self.depth)
    }
}

impl fmt::Display for Pixel {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        PixelSeeds::fmt(&self.seeds, f)
    }
}
