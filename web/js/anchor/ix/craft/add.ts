import {AnchorProvider, Program, SplToken} from "@project-serum/anchor";
import * as InitPixel from "./init";
import * as Palette from "../../pda/craft/palette-pda";
import * as Pixel from "../../pda/craft/pixel-pda";
import * as PixelIndex from "../../pda/craft/pixel-index-pda";
import * as PixelIndexLookup from "../../pda/craft/pixel-index-lookup-pda";
import {deriveAtaPda} from "../../pda/ata-pda";
import {SPL_ASSOCIATED_TOKEN_PROGRAM_ID, SPL_TOKEN_PROGRAM_ID} from "../../util/constants";
import {SystemProgram, SYSVAR_RENT_PUBKEY} from "@solana/web3.js";
import {getGlobal} from "../../pda/get-global";
import {SRgbStake} from "../../idl/stake";
import {SRgbCraft} from "../../idl/craft";
import {SRgbPaint} from "../../idl/paint";

export interface Input {
    left: Pixel.Seeds,
    right: Pixel.Seeds
}

export async function ix(
    app,
    provider: AnchorProvider,
    programs: {
        stake: Program<SRgbStake>;
        craft: Program<SRgbCraft>;
        paint: Program<SRgbPaint>;
        token: Program<SplToken>
    },
    input: Input
): Promise<void> {
    const leftPixelPda = Pixel.derivePixelPda(
        programs.craft,
        input.left
    );
    const leftPixel = await Pixel.getPixelPda(
        provider,
        programs,
        leftPixelPda
    );
    const rightPixelPda = Pixel.derivePixelPda(
        programs.craft,
        input.right
    );
    const rightPixel = await Pixel.getPixelPda(
        provider,
        programs,
        rightPixelPda
    );
    const dstPixelSeeds = add(
        input.left,
        input.right
    );
    const dstPixelPda = Pixel.derivePixelPda(
        programs.craft,
        dstPixelSeeds
    );
    const dstPixel: Pixel.Pixel = await InitPixel.getOrInit(
        provider,
        programs,
        dstPixelSeeds,
        dstPixelPda
    );
    const dstPalettePda = Palette.derivePalettePda(
        programs.craft,
        {
            authority: provider.wallet.publicKey,
            depth: input.left.depth
        }
    );
    const dstPalette = await Palette.getPalettePda(
        programs.craft,
        dstPalettePda
    );
    const distPixelIndexLookupSeeds: PixelIndexLookup.Seeds = {
        authority: provider.wallet.publicKey,
        r: dstPixelSeeds.r,
        g: dstPixelSeeds.g,
        b: dstPixelSeeds.b,
        depth: dstPixelSeeds.depth
    };
    const dstPixelIndexLookupPda = PixelIndexLookup.derivePixelIndexLookupPda(
        programs.craft,
        distPixelIndexLookupSeeds
    );
    let dstPixelIndexLookup: PixelIndexLookup.PixelIndexLookup;
    try {
        dstPixelIndexLookup = await PixelIndexLookup.getPixelIndexLookupPda(
            programs.craft,
            dstPixelIndexLookupPda
        );
    } catch (error) {
        console.log(error);
        dstPixelIndexLookup = {
            seeds: distPixelIndexLookupSeeds,
            index: dstPalette.indexer + 1
        }
    }
    const dstPixelIndexSeeds = {
        authority: provider.wallet.publicKey,
        depth: input.left.depth,
        index: dstPixelIndexLookup.index
    } as PixelIndex.Seeds;
    const dstPixelIndexPda = PixelIndex.derivePixelIndexPda(
        programs.craft,
        dstPixelIndexSeeds
    )
    const leftPixelMintAta = deriveAtaPda(
        provider.wallet.publicKey,
        leftPixel.mint
    );
    const rightPixelMintAta = deriveAtaPda(
        provider.wallet.publicKey,
        rightPixel.mint
    );
    const dstPixelMintAta = deriveAtaPda(
        provider.wallet.publicKey,
        dstPixel.mint
    );
    await programs
        .craft
        .methods
        .addPixel(
            PixelIndex.toRaw(dstPixelIndexSeeds) as any,
            distPixelIndexLookupSeeds as any
        )
        .accounts(
            {
                leftPixel: leftPixelPda.address,
                rightPixel: rightPixelPda.address,
                dstPixel: dstPixelPda.address,
                dstPixelIndex: dstPixelIndexPda.address,
                dstPixelIndexLookup: dstPixelIndexLookupPda.address,
                dstPalette: dstPalettePda.address,
                leftPixelMint: leftPixel.mint,
                leftPixelMintAta: leftPixelMintAta,
                rightPixelMint: rightPixel.mint,
                rightPixelMintAta: rightPixelMintAta,
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

function add(left: Pixel.Seeds, right: Pixel.Seeds): Pixel.Seeds {
    let max = (2 ** left.depth) - 1;
    let r = Math.min(
        left.r + right.r,
        max
    );
    let g = Math.min(
        left.g + right.g,
        max
    );
    let b = Math.min(
        left.b + right.b,
        max
    );
    return {
        r: r,
        g: g,
        b: b,
        depth: left.depth
    }
}
