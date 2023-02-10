import {AnchorProvider, Program, SplToken} from "@project-serum/anchor";
import {SRgb} from "../../idl/idl";
import * as InitPixel from "./../../ix/pixel/init";
import * as Pixel from "./../../pda/pixel/pixel-pda";
import * as PixelIndex from "./../../pda/pixel/pixel-index-pda";
import * as Palette from "./../../pda/pixel/palette-pda";
import {deriveAtaPda} from "../../pda/ata-pda";
import {SPL_ASSOCIATED_TOKEN_PROGRAM_ID, SPL_TOKEN_PROGRAM_ID} from "../../util/constants";
import {SystemProgram, SYSVAR_RENT_PUBKEY} from "@solana/web3.js";

export async function ix(
    app,
    provider: AnchorProvider,
    programs: {
        sRgb: Program<SRgb>;
        token: Program<SplToken>
    },
    pixelSeeds: Pixel.Seeds,
    pixelIndexSeeds: PixelIndex.Seeds,
    paletteSeeds: Palette.Seeds
): Promise<void> {
    const pixelPda = Pixel.derivePixelPda(
        programs.sRgb,
        pixelSeeds
    );
    const pixelIndaPda = PixelIndex.derivePixelIndexPda(
        programs.sRgb,
        pixelIndexSeeds
    );
    const palettePda = Palette.derivePalettePda(
        programs.sRgb,
        paletteSeeds
    );
    let pixel: Pixel.Pixel;
    try {
        pixel = await Pixel.getPixelPda(
            provider,
            programs,
            pixelPda
        );
    } catch (error) {
        await InitPixel.ix(
            app,
            provider,
            programs,
            pixelSeeds
        );
        pixel = await Pixel.getPixelPda(
            provider,
            programs,
            pixelPda
        );
    }
    const pixelMintAta = deriveAtaPda(
        provider.wallet.publicKey,
        pixel.mint
    )
    await programs
        .sRgb
        .methods
        .mintPixel(
            PixelIndex.toRaw(pixelIndexSeeds) as any,
            paletteSeeds as any
        )
        .accounts(
            {
                pixel: pixelPda.address,
                pixelIndex: pixelIndaPda.address,
                palette: palettePda.address,
                pixelMint: pixel.mint,
                pixelMintAta: pixelMintAta,
                payer: provider.wallet.publicKey,
                tokenProgram: SPL_TOKEN_PROGRAM_ID,
                associatedTokenProgram: SPL_ASSOCIATED_TOKEN_PROGRAM_ID,
                systemProgram: SystemProgram.programId,
                rent: SYSVAR_RENT_PUBKEY
            }
        ).rpc()

}
