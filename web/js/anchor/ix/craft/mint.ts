import {AnchorProvider, Program, SplToken} from "@project-serum/anchor";
import * as InitPixel from "./init";
import * as Pixel from "../../pda/craft/pixel-pda";
import * as PixelIndex from "../../pda/craft/pixel-index-pda";
import * as PixelIndexLookup from "../../pda/craft/pixel-index-lookup-pda";
import * as Palette from "../../pda/craft/palette-pda";
import {deriveAtaPda} from "../../pda/ata-pda";
import {SPL_ASSOCIATED_TOKEN_PROGRAM_ID, SPL_TOKEN_PROGRAM_ID} from "../../util/constants";
import {SystemProgram, SYSVAR_RENT_PUBKEY} from "@solana/web3.js";
import {getUser} from "../../pda/get-global";
import {deriveBluePda, deriveGreenPda, deriveRedPda, getPrimaryPda} from "../../pda/stake/primary-pda";
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
    pixelSeeds: Pixel.Seeds,
): Promise<void> {
    const pixelPda = Pixel.derivePixelPda(
        programs.craft,
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
        programs.craft,
        pixelIndexLookupSeeds
    );
    const paletteSeeds: Palette.Seeds = {
        authority: provider.wallet.publicKey,
        depth: pixelSeeds.depth
    };
    const palettePda = Palette.derivePalettePda(
        programs.craft,
        paletteSeeds
    );
    let palette: Palette.Palette;
    try {
        palette = await Palette.getPalettePda(
            programs.craft,
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
            programs.craft,
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
        programs.craft,
        pixelIndexSeeds
    );
    const pixelMintAta = deriveAtaPda(
        provider.wallet.publicKey,
        pixel.mint
    );
    const redPda = deriveRedPda(
        programs.stake
    );
    const red = await getPrimaryPda(
        programs.stake,
        redPda
    );
    const greenPda = deriveGreenPda(
        programs.stake
    );
    const green = await getPrimaryPda(
        programs.stake,
        greenPda
    );
    const bluePda = deriveBluePda(
        programs.stake
    );
    const blue = await getPrimaryPda(
        programs.stake,
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
        .craft
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
                stakingProgram: programs.stake.programId,
                systemProgram: SystemProgram.programId,
                rent: SYSVAR_RENT_PUBKEY
            }
        ).rpc()
    await getUser(
        app,
        provider,
        programs
    );
}
