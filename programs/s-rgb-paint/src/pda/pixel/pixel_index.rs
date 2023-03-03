use anchor_lang::prelude::*;
use crate::pda::HasFourSeeds;

pub const SEED: &str = "pixel-index";

pub const SIZE: usize = 8 // discriminator
    + 32 // authority
    + 1 // depth
    + 16 // index
    + 32; // pixel

#[account]
pub struct PixelIndex {
    pub seeds: PixelIndexSeeds,
    pub pixel: Pubkey,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct PixelIndexSeeds {
    pub authority: Pubkey,
    pub depth: u8,
    pub index: u128,
}

impl HasFourSeeds for PixelIndexSeeds {
    fn seed1(&self) -> Vec<u8> {
        SEED.as_bytes().to_vec()
    }

    fn seed2(&self) -> Vec<u8> {
        self.authority.to_bytes().to_vec()
    }

    fn seed3(&self) -> Vec<u8> {
        self.depth.to_string().as_bytes().to_vec()
    }

    fn seed4(&self) -> Vec<u8> {
        self.index.to_string().as_bytes().to_vec()
    }
}
