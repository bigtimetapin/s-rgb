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

impl HasThreeSeeds for PaletteSeeds {
    fn seed1(&self) -> String {
        format!("{}", SEED)
    }

    fn seed2(&self) -> String {
        format!("{}", self.authority)
    }

    fn seed3(&self) -> String {
        format!("{}", self.depth)
    }
}