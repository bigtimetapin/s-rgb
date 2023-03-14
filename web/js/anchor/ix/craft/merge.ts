import {AnchorProvider, Program, SplToken} from "@project-serum/anchor";
import * as InitPixel from "./init";
import * as Palette from "../../pda/craft/palette-pda";
import * as Pixel from "../../pda/craft/pixel-pda";
import * as PixelIndex from "../../pda/craft/pixel-index-pda";
import * as PixelIndexLookup from "../../pda/craft/pixel-index-lookup-pda";
import {deriveAtaPda} from "../../pda/ata-pda";
import {SPL_ASSOCIATED_TOKEN_PROGRAM_ID, SPL_TOKEN_PROGRAM_ID} from "../../util/constants";
import {SystemProgram, SYSVAR_RENT_PUBKEY} from "@solana/web3.js";
import {getUser} from "../../pda/get-global";
import {SRgbStake} from "../../idl/stake";
import {SRgbCraft} from "../../idl/craft";
import {SRgbPaint} from "../../idl/paint";

export async function ix(
    app,
    provider: AnchorProvider,
    programs: {
        stake: Program<SRgbStake>;
        craft: Program<SRgbCraft>;
        paint: Program<SRgbPaint>;
        token: Program<SplToken>
    },
    srcPixelSeeds: Pixel.Seeds,
    amount: number
): Promise<void> {
    const srcPixelPda = Pixel.derivePixelPda(
        programs.craft,
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
        programs.craft,
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
        programs.craft,
        dstPaletteSeeds
    );
    let dstPalette: Palette.Palette;
    try {
        dstPalette = await Palette.getPalettePda(
            programs.craft,
            dstPalettePda
        );
    } catch (error) {
        console.log(error);
        dstPalette = {
            seeds: dstPaletteSeeds,
            indexer: 0
        };
    }
    const dstPixelIndexLookupSeeds: PixelIndexLookup.Seeds = {
        authority: provider.wallet.publicKey,
        r: srcPixelSeeds.r,
        g: srcPixelSeeds.g,
        b: srcPixelSeeds.b,
        depth: srcPixelSeeds.depth + 1
    };
    const dstPixelIndexLookupPda = PixelIndexLookup.derivePixelIndexLookupPda(
        programs.craft,
        dstPixelIndexLookupSeeds
    );
    let dstPixelIndexLookup: PixelIndexLookup.PixelIndexLookup;
    try {
        dstPixelIndexLookup = await PixelIndexLookup.getPixelIndexLookupPda(
            programs.craft,
            dstPixelIndexLookupPda
        );
    } catch (error) {
        dstPixelIndexLookup = {
            seeds: dstPixelIndexLookupSeeds,
            index: dstPalette.indexer + 1
        };
    }
    const dstPixelIndexSeeds: PixelIndex.Seeds = {
        authority: provider.wallet.publicKey,
        depth: srcPixelSeeds.depth + 1,
        index: dstPixelIndexLookup.index
    };
    const dstPixelIndexPda = PixelIndex.derivePixelIndexPda(
        programs.craft,
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
        .craft
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
    await getUser(
        app,
        provider,
        programs
    );
}
