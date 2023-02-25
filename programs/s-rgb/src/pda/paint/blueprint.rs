use anchor_lang::prelude::*;

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct Blueprint {
    pub red: u8,
    pub green: u8,
    pub blue: u8,
    pub yellow: u8,
    pub magenta: u8,
    pub cyan: u8,
    pub white: u8,
}
