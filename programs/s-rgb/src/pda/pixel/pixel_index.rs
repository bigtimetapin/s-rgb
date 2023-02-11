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
    fn seed1(&self) -> String {
        format!("{}", SEED)
    }

    fn seed2(&self) -> String {
        format!("{}", self.authority)
    }

    fn seed3(&self) -> String {
        format!("{}", self.depth)
    }

    fn seed4(&self) -> String {
        format!("{}", self.index)
    }
}
