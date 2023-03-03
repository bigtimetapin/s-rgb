use anchor_lang::prelude::*;
use anchor_spl::token::{burn, Burn, Mint, Token, TokenAccount};
use partial_application::partial;
use crate::{BurnPixelsForPaint, Proof};

pub fn ix(ctx: Context<BurnPixelsForPaint>) -> Result<()> {
    // partially apply conditional burn
    let conditional_burn = partial!(almost_conditional_burn =>
        &ctx.accounts.token_program,
        &ctx.accounts.payer,
        &ctx.accounts.proof,
        _, _, _
    );
    // conditionally burn red pixel
    conditional_burn(
        &ctx.accounts.red_pixel_mint,
        &ctx.accounts.red_pixel_mint_ata,
        |p| p.burned.plan.red,
    )?;
    // conditionally burn green pixel
    conditional_burn(
        &ctx.accounts.green_pixel_mint,
        &ctx.accounts.green_pixel_mint_ata,
        |p| p.burned.plan.green,
    )?;
    // conditionally burn blue pixel
    conditional_burn(
        &ctx.accounts.blue_pixel_mint,
        &ctx.accounts.blue_pixel_mint_ata,
        |p| p.burned.plan.blue,
    )?;
    // conditionally burn yellow pixel
    conditional_burn(
        &ctx.accounts.yellow_pixel_mint,
        &ctx.accounts.yellow_pixel_mint_ata,
        |p| p.burned.plan.yellow,
    )?;
    // conditionally burn magenta pixel
    conditional_burn(
        &ctx.accounts.magenta_pixel_mint,
        &ctx.accounts.magenta_pixel_mint_ata,
        |p| p.burned.plan.magenta,
    )?;
    // conditionally burn cyan pixel
    conditional_burn(
        &ctx.accounts.cyan_pixel_mint,
        &ctx.accounts.cyan_pixel_mint_ata,
        |p| p.burned.plan.cyan,
    )?;
    // conditionally burn white pixel
    conditional_burn(
        &ctx.accounts.white_pixel_mint,
        &ctx.accounts.white_pixel_mint_ata,
        |p| p.burned.plan.white,
    )?;
    // proof
    let proof = &mut ctx.accounts.proof;
    proof.burned.burned = true;
    Ok(())
}

fn almost_conditional_burn<'info>(
    token_program: &Program<'info, Token>,
    payer: &Signer<'info>,
    proof: &Proof,
    mint: &Account<'info, Mint>,
    ata: &Account<'info, TokenAccount>,
    f: fn(&Proof) -> u64,
) -> Result<()> {
    let pixel_balance = f(proof);
    match pixel_balance > 0 {
        true => {
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
                pixel_balance,
            )
        }
        false => {
            Ok(())
        }
    }
}
