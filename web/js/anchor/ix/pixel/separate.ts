import {AnchorProvider, Program, SplToken} from "@project-serum/anchor";
import {SRgb} from "../../idl/idl";
import * as InitPixel from "./init";
import * as Palette from "../../pda/pixel/palette-pda";
import * as Pixel from "../../pda/pixel/pixel-pda";
import * as PixelIndex from "../../pda/pixel/pixel-index-pda";
import * as PixelIndexLookup from "../../pda/pixel/pixel-index-lookup-pda";
import {deriveAtaPda} from "../../pda/ata-pda";
import {SPL_ASSOCIATED_TOKEN_PROGRAM_ID, SPL_TOKEN_PROGRAM_ID} from "../../util/constants";
import {SystemProgram, SYSVAR_RENT_PUBKEY} from "@solana/web3.js";
import {getGlobal} from "../../pda/get-global";

interface Input {
    left: Pixel.Seeds
    right: Pixel.Seeds
}

export async function ix(
    app,
    provider: AnchorProvider,
    programs: {
        sRgb: Program<SRgb>;
        token: Program<SplToken>
    },
    input: Input
): Promise<void> {
    const leftPixelPda = Pixel.derivePixelPda(
        programs.sRgb,
        input.left
    );
    const leftPixel = await Pixel.getPixelPda(
        provider,
        programs,
        leftPixelPda
    );
    const rightPixelPda = Pixel.derivePixelPda(
        programs.sRgb,
        input.right
    );
    const dstPixelSeeds = separate(
        input.left,
        input.right
    );
    const dstPixelPda = Pixel.derivePixelPda(
        programs.sRgb,
        dstPixelSeeds
    );
    const dstPixel = await InitPixel.getOrInit(
        app,
        provider,
        programs,
        dstPixelSeeds
    );
    const dstPalettePda = Palette.derivePalettePda(
        programs.sRgb,
        {
            authority: provider.wallet.publicKey,
            depth: input.left.depth
        }
    );
    const dstPalette = await Palette.getPalettePda(
        programs.sRgb,
        dstPalettePda
    );
    const dstPixelIndexLookupPda = PixelIndexLookup.derivePixelIndexLookupPda(
        programs.sRgb,
        dstPixelSeeds
    );
    const dstPixelIndexSeeds = await PixelIndex.getOrIncrementSeeds(
        provider,
        programs.sRgb,
        dstPixelIndexLookupPda,
        dstPalette
    );
    const dstPixelIndexPda = await PixelIndex.derivePixelIndexPda(
        programs.sRgb,
        dstPixelIndexSeeds
    );
    const leftPixelMintAta = deriveAtaPda(
        provider.wallet.publicKey,
        leftPixel.mint
    );
    const dstPixelMintAta = deriveAtaPda(
        provider.wallet.publicKey,
        dstPixel.mint
    );
    await programs
        .sRgb
        .methods
        .separatePixel(
            PixelIndex.toRaw(dstPixelIndexSeeds) as any,
            dstPixelSeeds as any // encoded as lookup-seeds
        ).accounts(
            {
                leftPixel: leftPixelPda.address,
                rightPixel: rightPixelPda.address,
                dstPixel: dstPixelPda.address,
                dstPixelIndex: dstPixelIndexPda.address,
                dstPixelIndexLookup: dstPixelIndexLookupPda.address,
                dstPalette: dstPalettePda.address,
                leftPixelMint: leftPixel.mint,
                leftPixelMintAta: leftPixelMintAta,
                dstPixelMint: dstPixel.mint,
                dstPixelMintAta: dstPixelMintAta,
                payer: provider.wallet.publicKey,
                tokenProgram: SPL_TOKEN_PROGRAM_ID,
                associatedTokenProgram: SPL_ASSOCIATED_TOKEN_PROGRAM_ID,
                systemProgram: SystemProgram.programId,
                rent: SYSVAR_RENT_PUBKEY
            }
        ).rpc();
    await getGlobal(
        app,
        provider,
        programs
    );
}

function separate(left: Pixel.Seeds, right: Pixel.Seeds): Pixel.Seeds {
    const r = left.r - right.r;
    const g = left.g - right.g;
    const b = left.b - right.b;
    return {
        r: r,
        g: g,
        b: b,
        depth: left.depth
    }
}
