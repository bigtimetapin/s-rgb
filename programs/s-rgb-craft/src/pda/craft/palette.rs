use anchor_lang::prelude::*;
use crate::pda::HasThreeSeeds;

pub const SEED: &str = "palette";

pub const SIZE: usize = 8 // discriminator
    + 32 // authority
    + 1 // depth
    + 16; // indexer

#[account]
pub struct Palette {
    pub seeds: PaletteSeeds,
    pub indexer: u128,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct PaletteSeeds {
    pub authority: Pubkey,
    pub depth: u8,
}

impl HasThreeSeeds for Palette {
    fn seed1(&self) -> Vec<u8> {
        self.seeds.seed1()
    }

    fn seed2(&self) -> Vec<u8> {
        self.seeds.seed2()
    }

    fn seed3(&self) -> Vec<u8> {
        self.seeds.seed3()
    }
}

impl HasThreeSeeds for PaletteSeeds {
    fn seed1(&self) -> Vec<u8> {
        SEED.as_bytes().to_vec()
    }

    fn seed2(&self) -> Vec<u8> {
        self.authority.to_bytes().to_vec()
    }

    fn seed3(&self) -> Vec<u8> {
        self.depth.to_string().as_bytes().to_vec()
    }
}