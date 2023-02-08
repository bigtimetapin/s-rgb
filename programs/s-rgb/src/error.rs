use anchor_lang::prelude::{error_code};

#[error_code]
pub enum CustomErrors {
    #[msg("Invalid bit depth specified.")]
    InvalidBitDepth,
    #[msg("Input value found outside channel bounds.")]
    ChannelOverflow,
}
