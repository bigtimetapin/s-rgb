use anchor_lang::prelude::*;
use crate::pda::HasFiveSeeds;

pub const SEED: &str = "pixel";

pub const SIZE: usize = 8 // discriminator
    + SEEDS_SIZE
    + 32; // mint

pub const SEEDS_SIZE: usize = 4 // r
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

impl HasFiveSeeds for Pixel {
    fn seed1(&self) -> Vec<u8> {
        self.seeds.seed1()
    }

    fn seed2(&self) -> Vec<u8> {
        self.seeds.seed2()
    }

    fn seed3(&self) -> Vec<u8> {
        self.seeds.seed3()
    }

    fn seed4(&self) -> Vec<u8> {
        self.seeds.seed4()
    }

    fn seed5(&self) -> Vec<u8> {
        self.seeds.seed5()
    }
}

impl HasFiveSeeds for PixelSeeds {
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
