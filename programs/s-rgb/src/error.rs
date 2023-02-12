use anchor_lang::prelude::{error_code};

#[error_code]
pub enum CustomErrors {
    #[msg("Invalid bit depth specified.")]
    InvalidBitDepth,
    #[msg("Input value found outside channel bounds.")]
    ChannelOverflow,
    #[msg("Insufficient balance of primary color token.")]
    InsufficientPrimaryBalance,
}
