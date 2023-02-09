use std::fmt;
use std::fmt::Formatter;
use anchor_lang::prelude::*;

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

impl fmt::Display for PaletteSeeds {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}/{}/{}", SEED, self.authority, self.depth)
    }
}

impl fmt::Display for Palette {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        PaletteSeeds::fmt(& self.seeds, f)
    }
}
