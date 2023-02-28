import {AnchorProvider, Program, SplToken} from "@project-serum/anchor";
import {SRgb} from "../../idl/idl";
import * as InitPixel from "./init";
import * as Pixel from "./../../pda/pixel/pixel-pda";
import * as PixelIndex from "./../../pda/pixel/pixel-index-pda";
import * as PixelIndexLookup from "./../../pda/pixel/pixel-index-lookup-pda";
import * as Palette from "./../../pda/pixel/palette-pda";
import {deriveAtaPda} from "../../pda/ata-pda";
import {SPL_ASSOCIATED_TOKEN_PROGRAM_ID, SPL_TOKEN_PROGRAM_ID} from "../../util/constants";
import {SystemProgram, SYSVAR_RENT_PUBKEY} from "@solana/web3.js";
import {getGlobal} from "../../pda/get-global";
import {deriveBluePda, deriveGreenPda, deriveRedPda, getPrimaryPda} from "../../pda/primary/primary-pda";

export async function ix(
    app,
    provider: AnchorProvider,
    programs: {
        sRgb: Program<SRgb>;
        token: Program<SplToken>
    },
    pixelSeeds: Pixel.Seeds,
): Promise<void> {
    const pixelPda = Pixel.derivePixelPda(
        programs.sRgb,
        pixelSeeds
    );
    let pixel: Pixel.Pixel = await InitPixel.getOrInit(
        provider,
        programs,
        pixelSeeds,
        pixelPda
    );
    const pixelIndexLookupSeeds: PixelIndexLookup.Seeds = {
        authority: provider.wallet.publicKey,
        r: pixelSeeds.r,
        g: pixelSeeds.g,
        b: pixelSeeds.b,
        depth: pixelSeeds.depth
    };
    const pixelIndexLookupPda = PixelIndexLookup.derivePixelIndexLookupPda(
        programs.sRgb,
        pixelIndexLookupSeeds
    );
    const paletteSeeds: Palette.Seeds = {
        authority: provider.wallet.publicKey,
        depth: pixelSeeds.depth
    };
    const palettePda = Palette.derivePalettePda(
        programs.sRgb,
        paletteSeeds
    );
    let palette: Palette.Palette;
    try {
        palette = await Palette.getPalettePda(
            programs.sRgb,
            palettePda
        );
    } catch (error) {
        console.log(error);
        palette = {
            seeds: paletteSeeds,
            indexer: 0
        }
    }
    let pixelIndexLookup: PixelIndexLookup.PixelIndexLookup;
    try {
        pixelIndexLookup = await PixelIndexLookup.getPixelIndexLookupPda(
            programs.sRgb,
            pixelIndexLookupPda
        );
    } catch (error) {
        console.log(error);
        pixelIndexLookup = {
            seeds: pixelIndexLookupSeeds,
            index: palette.indexer + 1
        }
    }
    const pixelIndexSeeds: PixelIndex.Seeds = {
        authority: provider.wallet.publicKey,
        depth: pixelSeeds.depth,
        index: pixelIndexLookup.index
    };
    const pixelIndexPda = PixelIndex.derivePixelIndexPda(
        programs.sRgb,
        pixelIndexSeeds
    );
    const pixelMintAta = deriveAtaPda(
        provider.wallet.publicKey,
        pixel.mint
    );
    const redPda = deriveRedPda(
        programs.sRgb
    );
    const red = await getPrimaryPda(
        programs.sRgb,
        redPda
    );
    const greenPda = deriveGreenPda(
        programs.sRgb
    );
    const green = await getPrimaryPda(
        programs.sRgb,
        greenPda
    );
    const bluePda = deriveBluePda(
        programs.sRgb
    );
    const blue = await getPrimaryPda(
        programs.sRgb,
        bluePda
    );
    const redMintAta = deriveAtaPda(
        provider.wallet.publicKey,
        red.mint
    );
    const greenMintAta = deriveAtaPda(
        provider.wallet.publicKey,
        green.mint
    );
    const blueMintAta = deriveAtaPda(
        provider.wallet.publicKey,
        blue.mint
    );
    await programs
        .sRgb
        .methods
        .mintPixel(
            PixelIndex.toRaw(pixelIndexSeeds) as any,
            pixelIndexLookupSeeds as any,
            paletteSeeds as any
        )
        .accounts(
            {
                pixel: pixelPda.address,
                pixelIndex: pixelIndexPda.address,
                pixelIndexLookup: pixelIndexLookupPda.address,
                palette: palettePda.address,
                red: redPda.address,
                green: greenPda.address,
                blue: bluePda.address,
                pixelMint: pixel.mint,
                pixelMintAta: pixelMintAta,
                redMint: red.mint,
                redMintAta: redMintAta,
                greenMint: green.mint,
                greenMintAta: greenMintAta,
                blueMint: blue.mint,
                blueMintAta: blueMintAta,
                payer: provider.wallet.publicKey,
                tokenProgram: SPL_TOKEN_PROGRAM_ID,
                associatedTokenProgram: SPL_ASSOCIATED_TOKEN_PROGRAM_ID,
                systemProgram: SystemProgram.programId,
                rent: SYSVAR_RENT_PUBKEY
            }
        ).rpc()
    await getGlobal(
        app,
        provider,
        programs
    );
}
