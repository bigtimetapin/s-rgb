use anchor_lang::prelude::*;
use crate::HasFiveSeeds;
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

impl HasFiveSeeds for PixelIndexLookupSeeds {
    fn seed1(&self) -> String {
        format!("{}", SEED)
    }

    fn seed2(&self) -> String {
        format!("{}", self.r)
    }

    fn seed3(&self) -> String {
        format!("{}", self.g)
    }

    fn seed4(&self) -> String {
        format!("{}", self.b)
    }

    fn seed5(&self) -> String {
        format!("{}", self.depth)
    }
}
