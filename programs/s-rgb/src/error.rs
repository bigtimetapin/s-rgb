use anchor_lang::prelude::{error_code};

#[error_code]
pub enum CustomErrors {
    #[msg("Invalid bit depth specified.")]
    InvalidBitDepth,
    #[msg("Input value found outside channel bounds.")]
    ChannelOverflow,
    #[msg("Insufficient balance of primary color token.")]
    InsufficientPrimaryBalance,
    #[msg("Source and destination channel values do not match.")]
    ChannelImbalance,
    #[msg("Insufficient balance of pixel token.")]
    InsufficientPixelBalance,
    #[msg("Destination pixel specified is not the addition of the source pixels.")]
    InvalidAddition,
}
