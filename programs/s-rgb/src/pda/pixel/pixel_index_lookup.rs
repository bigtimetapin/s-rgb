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
    fn seed1(&self) -> Vec<u8> {
        SEED.as_bytes().to_vec()
    }

    fn seed2(&self) -> Vec<u8> {
        self.r.to_string().as_bytes().to_vec()
    }

    fn seed3(&self) -> Vec<u8> {
        self.g.to_string().as_bytes().to_vec()
    }

    fn seed4(&self) -> Vec<u8> {
        self.b.to_string().as_bytes().to_vec()
    }

    fn seed5(&self) -> Vec<u8> {
        self.depth.to_string().as_bytes().to_vec()
    }
}
