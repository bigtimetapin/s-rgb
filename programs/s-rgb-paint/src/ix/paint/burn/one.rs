use anchor_lang::prelude::*;
use partial_application::partial;
use crate::BurnPixelsOne;
use crate::ix::paint::burn::almost_burn;

pub fn ix(ctx: Context<BurnPixelsOne>) -> Result<()> {
    // partially apply almost burn
    let burn = partial!(almost_burn =>
        &ctx.accounts.token_program,
        &ctx.accounts.payer,
        &ctx.accounts.proof,
        _, _, _
    );
    // burn pixel
    burn(
        &ctx.accounts.pixel_mint,
        &ctx.accounts.pixel_mint_ata,
        |p| &p.burned.plan.one,
    )?;
    // proof
    let proof = &mut ctx.accounts.proof;
    assert_eq!(proof.arity, 1);
    proof.burned.burned = true;
    Ok(())
}
