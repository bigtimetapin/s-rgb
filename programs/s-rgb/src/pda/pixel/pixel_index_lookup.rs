use std::fmt;
use std::fmt::Formatter;
use anchor_lang::prelude::*;
use crate::pda::pixel::pixel::SEEDS_SIZE;

pub const SEED: &str = "pixel-index-lookup";

pub const SIZE: usize = 8 // discriminator
    + SEEDS_SIZE
    + 1 + 16; // index

#[account]
pub struct PixelIndexLookup {
    pub seeds: PixelIndexLookupSeeds,
    pub index: Option<u128>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct PixelIndexLookupSeeds {
    pub r: u32,
    pub g: u32,
    pub b: u32,
    pub depth: u8,
}


impl fmt::Display for PixelIndexLookupSeeds {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        write!(f, "{}/r{}/g{}/b{}/d{}", SEED, self.r, self.g, self.b, self.depth)
    }
}
