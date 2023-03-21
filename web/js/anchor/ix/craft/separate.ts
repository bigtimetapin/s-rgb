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

interface Input {
    left: Pixel.Seeds
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
        leftPixelPda.address
    );
    const rightPixelPda = Pixel.derivePixelPda(
        programs.craft,
        input.right
    );
    const dstPixelSeeds = separate(
        input.left,
        input.right
    );
    const dstPixelPda = Pixel.derivePixelPda(
        programs.craft,
        dstPixelSeeds
    );
    const dstPixel = await InitPixel.getOrInit(
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
    const dstPixelIndexLookupSeeds: PixelIndexLookup.Seeds = {
        authority: provider.wallet.publicKey,
        r: dstPixelSeeds.r,
        g: dstPixelSeeds.g,
        b: dstPixelSeeds.b,
        depth: dstPixelSeeds.depth
    };
    const dstPixelIndexLookupPda = PixelIndexLookup.derivePixelIndexLookupPda(
        programs.craft,
        dstPixelIndexLookupSeeds
    );
    const dstPixelIndexSeeds = await PixelIndex.getOrIncrementSeeds(
        provider,
        programs.craft,
        dstPixelIndexLookupPda,
        dstPalette
    );
    const dstPixelIndexPda = await PixelIndex.derivePixelIndexPda(
        programs.craft,
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
        .craft
        .methods
        .separatePixel(
            PixelIndex.toRaw(dstPixelIndexSeeds) as any,
            dstPixelIndexLookupSeeds as any
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
    await getUser(
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
