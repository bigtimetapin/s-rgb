use anchor_lang::prelude::*;
use anchor_spl::token::{burn, Burn, Mint, Token, TokenAccount};
use crate::pda::paint::proof::PlanMember;
use crate::Proof;

pub mod one;
pub mod two;
pub mod three;
pub mod four;
pub mod five;

fn almost_burn<'info>(
    token_program: &Program<'info, Token>,
    payer: &Signer<'info>,
    proof: &Proof,
    mint: &Account<'info, Mint>,
    ata: &Account<'info, TokenAccount>,
    f: fn(&Proof) -> &Option<PlanMember>,
) -> Result<()> {
    let maybe_plan_member = f(proof);
    match maybe_plan_member {
        None => {
            Ok(())
        }
        Some(plan_member) => {
            let cpi_context = CpiContext::new(
                token_program.to_account_info(),
                Burn {
                    mint: mint.to_account_info(),
                    from: ata.to_account_info(),
                    authority: payer.to_account_info(),
                },
            );
            burn(
                cpi_context,
                plan_member.amount,
            )
        }
    }
}
