use anchor_lang::prelude::*;
use crate::pda::HasSixSeeds;
use crate::pda::craft::pixel::SEEDS_SIZE;

pub const SEED: &str = "pixel-index-lookup";

pub const SIZE: usize = 8 // discriminator
    + (32 + SEEDS_SIZE) // seeds
    + 1 + 16; // index

#[account]
pub struct PixelIndexLookup {
    pub seeds: PixelIndexLookupSeeds,
    pub index: Option<u128>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct PixelIndexLookupSeeds {
    pub authority: Pubkey,
    pub r: u32,
    pub g: u32,
    pub b: u32,
    pub depth: u8,
}

impl HasSixSeeds for PixelIndexLookupSeeds {
    fn seed1(&self) -> Vec<u8> {
        SEED.as_bytes().to_vec()
    }

    fn seed2(&self) -> Vec<u8> {
        self.authority.to_bytes().to_vec()
    }

    fn seed3(&self) -> Vec<u8> {
        self.r.to_string().as_bytes().to_vec()
    }

    fn seed4(&self) -> Vec<u8> {
        self.g.to_string().as_bytes().to_vec()
    }

    fn seed5(&self) -> Vec<u8> {
        self.b.to_string().as_bytes().to_vec()
    }

    fn seed6(&self) -> Vec<u8> {
        self.depth.to_string().as_bytes().to_vec()
    }
}
