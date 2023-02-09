import {AnchorProvider, Program} from "@project-serum/anchor";
import {SRgb} from "../../idl/idl";
import * as Pixel from "./../../pda/pixel/pixel-pda";
import {Keypair, SystemProgram, SYSVAR_RENT_PUBKEY} from "@solana/web3.js";
import {SPL_TOKEN_PROGRAM_ID} from "../../util/constants";

export async function ix(
    app,
    provider: AnchorProvider,
    program: Program<SRgb>,
    seeds: Pixel.Seeds
): Promise<void> {
    const pixelPda = Pixel.derivePixelPda(
        program,
        seeds
    );
    const pixelMint = Keypair.generate(
    );
    await program
        .methods
        .initPixel(
            seeds as any
        ).accounts(
            {
                pixel: pixelPda.address,
                pixelMint: pixelMint.publicKey,
                payer: provider.wallet.publicKey,
                tokenProgram: SPL_TOKEN_PROGRAM_ID,
                systemProgram: SystemProgram.programId,
                rent: SYSVAR_RENT_PUBKEY
            }
        ).signers(
            [pixelMint]
        ).rpc()
    const pixel = await Pixel.getPixelPda(
        program,
        pixelPda
    );
    console.log(pixel.seeds);
    console.log(pixel.mint.toString());
    console.log(pixelMint.publicKey.toString());
}
