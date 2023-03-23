use anchor_lang::prelude::*;
use partial_application::partial;
use crate::BurnPixelsThree;
use crate::ix::paint::burn::almost_burn;

pub fn ix(ctx: Context<BurnPixelsThree>) -> Result<()> {
    // partially apply almost burn
    let burn = partial!(almost_burn =>
        &ctx.accounts.token_program,
        &ctx.accounts.payer,
        &ctx.accounts.proof,
        _, _, _
    );
    // burn pixel one
    burn(
        &ctx.accounts.pixel_one_mint,
        &ctx.accounts.pixel_one_mint_ata,
        |p| &p.burned.plan.one,
    )?;
    // burn pixel two
    burn(
        &ctx.accounts.pixel_two_mint,
        &ctx.accounts.pixel_two_mint_ata,
        |p| &p.burned.plan.two,
    )?;
    // burn pixel three
    burn(
        &ctx.accounts.pixel_three_mint,
        &ctx.accounts.pixel_three_mint_ata,
        |p| &p.burned.plan.three,
    )?;
    // proof
    let proof = &mut ctx.accounts.proof;
    assert_eq!(proof.arity, 3);
    proof.burned.burned = true;
    Ok(())
}
