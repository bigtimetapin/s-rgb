import {AnchorProvider, Program, SplToken} from "@project-serum/anchor";
import {SRgb} from "../../idl/idl";
import * as Pixel from "./../../pda/pixel/pixel-pda";
import {Keypair, SystemProgram, SYSVAR_RENT_PUBKEY} from "@solana/web3.js";
import {SPL_TOKEN_PROGRAM_ID} from "../../util/constants";

export async function ix(
    provider: AnchorProvider,
    programs: {
        sRgb: Program<SRgb>;
        token: Program<SplToken>
    },
    pixelSeeds: Pixel.Seeds,
    pixelPda: Pixel.PixelPda
): Promise<void> {
    const pixelMint = Keypair.generate(
    );
    await programs
        .sRgb
        .methods
        .initPixel(
            pixelSeeds as any
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
}

export async function getOrInit(
    provider: AnchorProvider,
    programs: {
        sRgb: Program<SRgb>;
        token: Program<SplToken>
    },
    pixelSeeds: Pixel.Seeds,
    pixelPda: Pixel.PixelPda
): Promise<Pixel.Pixel> {
    let pixel: Pixel.Pixel;
    try {
        pixel = await Pixel.getPixelPda(
            provider,
            programs,
            pixelPda
        );
    } catch (error) {
        console.log(error);
        await ix(
            provider,
            programs,
            pixelSeeds,
            pixelPda
        );
        pixel = await Pixel.getPixelPda(
            provider,
            programs,
            pixelPda
        );
    }
    return pixel
}
