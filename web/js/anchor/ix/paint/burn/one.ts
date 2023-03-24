import {AnchorProvider, Program, SplToken} from "@project-serum/anchor";
import {PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY} from "@solana/web3.js";
import * as Proof from "../../../pda/paint/proof-pda";
import * as Pixel from "../../../pda/craft/pixel-pda";
import {deriveAtaPda} from "../../../pda/ata-pda";
import {
    SPL_ASSOCIATED_TOKEN_PROGRAM_ID,
    SPL_TOKEN_PROGRAM_ID
} from "../../../util/constants";
import {SRgbStake} from "../../../idl/stake";
import {SRgbCraft} from "../../../idl/craft";
import {SRgbPaint} from "../../../idl/paint";

export async function ix(
    provider: AnchorProvider,
    programs: {
        stake: Program<SRgbStake>;
        craft: Program<SRgbCraft>;
        paint: Program<SRgbPaint>;
        token: Program<SplToken>
    },
    proof: {
        pda: PublicKey,
        proof: Proof.Proof
    }
): Promise<void> {
    const pixel = await Pixel.getPixelPda(
        provider,
        programs,
        proof.proof.burned.plan.one.pda
    );
    const pixelMintAta = deriveAtaPda(
        provider.wallet.publicKey,
        pixel.mint
    );
    await programs
        .paint
        .methods
        .burnPixelsOne()
        .accounts(
            {
                proof: proof.pda,
                pixel: proof.proof.burned.plan.one.pda,
                pixelMint: pixel.mint,
                pixelMintAta: pixelMintAta,
                mint: proof.proof.nft.mint,
                payer: provider.wallet.publicKey,
                tokenProgram: SPL_TOKEN_PROGRAM_ID,
                associatedTokenProgram: SPL_ASSOCIATED_TOKEN_PROGRAM_ID,
                systemProgram: SystemProgram.programId,
                rent: SYSVAR_RENT_PUBKEY
            }
        ).rpc()
}
