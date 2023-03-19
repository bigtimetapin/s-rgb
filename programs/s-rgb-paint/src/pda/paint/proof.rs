use anchor_lang::prelude::*;

pub const SEED: &str = "proof";

pub const SIZE: usize = 8 // discriminator
    + 1 // arity
    + 1 // burned
    + (
    (1 // option
        + 32 // pda
        + 8 // amount
    ) * 7 // colors
) // plan
    + 32 // nft mint
    + 32; // nft url

#[account]
pub struct Proof {
    pub arity: u8,
    pub burned: Burned,
    pub nft: Nft,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Nft {
    pub mint: Pubkey,
    pub url: Pubkey,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Burned {
    pub burned: bool,
    pub plan: Plan,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Plan {
    pub one: Option<PlanMember>,
    pub two: Option<PlanMember>,
    pub three: Option<PlanMember>,
    pub four: Option<PlanMember>,
    pub five: Option<PlanMember>,
    pub six: Option<PlanMember>,
    pub seven: Option<PlanMember>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct PlanMember {
    pub pda: Pubkey,
    pub amount: u64,
}
