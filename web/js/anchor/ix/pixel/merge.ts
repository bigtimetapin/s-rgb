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

export async function ix(
    app,
    provider: AnchorProvider,
    programs: {
        sRgb: Program<SRgb>;
        token: Program<SplToken>
    },
    srcPixelSeeds: Pixel.Seeds,
    amount: number
): Promise<void> {
    const srcPixelPda = Pixel.derivePixelPda(
        programs.sRgb,
        srcPixelSeeds
    );
    const srcPixel = await Pixel.getPixelPda(
        provider,
        programs,
        srcPixelPda
    );
    const dstPixelSeeds = {
        r: srcPixelSeeds.r,
        g: srcPixelSeeds.g,
        b: srcPixelSeeds.b,
        depth: srcPixelSeeds.depth + 1
    };
    const dstPixelPda = Pixel.derivePixelPda(
        programs.sRgb,
        dstPixelSeeds
    );
    let dstPixel: Pixel.Pixel = await InitPixel.getOrInit(
        provider,
        programs,
        dstPixelSeeds,
        dstPixelPda
    );
    const dstPaletteSeeds = {
        authority: provider.wallet.publicKey,
        depth: srcPixelSeeds.depth + 1
    } as Palette.Seeds;
    const dstPalettePda = Palette.derivePalettePda(
        programs.sRgb,
        dstPaletteSeeds
    );
    let dstPalette: Palette.Palette;
    try {
        dstPalette = await Palette.getPalettePda(
            programs.sRgb,
            dstPalettePda
        );
    } catch (error) {
        console.log(error);
        dstPalette = {
            seeds: dstPaletteSeeds,
            indexer: 0
        };
    }
    const dstPixelIndexLookupSeeds = {
        r: srcPixelSeeds.r,
        g: srcPixelSeeds.g,
        b: srcPixelSeeds.b,
        depth: srcPixelSeeds.depth + 1
    } as Pixel.Seeds;
    const dstPixelIndexLookupPda = PixelIndexLookup.derivePixelIndexLookupPda(
        programs.sRgb,
        dstPixelIndexLookupSeeds
    );
    let dstPixelIndexLookup: PixelIndexLookup.PixelIndexLookup;
    try {
        dstPixelIndexLookup = await PixelIndexLookup.getPixelIndexLookupPda(
            programs.sRgb,
            dstPixelIndexLookupPda
        );
    } catch (error) {
        dstPixelIndexLookup = {
            seeds: dstPixelSeeds,
            index: dstPalette.indexer + 1
        };
    }
    const dstPixelIndexSeeds: PixelIndex.Seeds = {
        authority: provider.wallet.publicKey,
        depth: srcPixelSeeds.depth + 1,
        index: dstPixelIndexLookup.index
    };
    const dstPixelIndexPda = PixelIndex.derivePixelIndexPda(
        programs.sRgb,
        dstPixelIndexSeeds
    );
    const srcPixelMintAta = deriveAtaPda(
        provider.wallet.publicKey,
        srcPixel.mint
    );
    const dstPixelMintAta = deriveAtaPda(
        provider.wallet.publicKey,
        dstPixel.mint
    );
    await programs
        .sRgb
        .methods
        .mergePixel(
            PixelIndex.toRaw(dstPixelIndexSeeds) as any,
            dstPixelIndexLookupSeeds as any,
            dstPaletteSeeds as any,
            amount as any
        ).accounts(
            {
                srcPixel: srcPixelPda.address,
                dstPixel: dstPixelPda.address,
                dstPixelIndex: dstPixelIndexPda.address,
                dstPixelIndexLookup: dstPixelIndexLookupPda.address,
                dstPalette: dstPalettePda.address,
                srcPixelMint: srcPixel.mint,
                srcPixelMintAta: srcPixelMintAta,
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
