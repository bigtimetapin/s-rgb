import {AnchorProvider, Program, SplToken} from "@project-serum/anchor";
import {SystemProgram, SYSVAR_RENT_PUBKEY} from "@solana/web3.js";
import * as InitPixel from "../craft/init";
import * as Proof from "../../pda/paint/proof-pda";
import * as ProofIndex from "../../pda/paint/proof-index-pda";
import * as ProofIndexer from "../../pda/paint/proof-indexer-pda";
import * as Pixel from "../../pda/craft/pixel-pda";
import {deriveAtaPda} from "../../pda/ata-pda";
import {
    SPL_ASSOCIATED_TOKEN_PROGRAM_ID,
    SPL_TOKEN_PROGRAM_ID
} from "../../util/constants";
import {SRgbStake} from "../../idl/stake";
import {SRgbCraft} from "../../idl/craft";
import {SRgbPaint} from "../../idl/paint";

export async function ix(
    provider: AnchorProvider,
    programs: {
        stake: Program<SRgbStake>;
        craft: Program<SRgbCraft>;
        paint: Program<SRgbPaint>;
        token: Program<SplToken>
    }
): Promise<void> {
    const proofIndexerPda = ProofIndexer.derive(
        provider,
        programs.paint
    );
    const proofIndexer = await ProofIndexer.get(
        programs.paint,
        proofIndexerPda
    );
    const proofIndexPda = ProofIndex.derive(
        provider,
        programs.paint,
        proofIndexer.indexer
    );
    const proofIndex = await ProofIndex.get(
        programs.paint,
        proofIndexPda
    );
    const proof = await Proof.get(
        programs.paint,
        proofIndex.proof
    );
    const redPixelSeeds = {
        r: 1,
        g: 0,
        b: 0,
        depth: 1
    };
    const redPixelPda = Pixel.derivePixelPda(
        programs.craft,
        redPixelSeeds
    );
    const redPixel = await InitPixel.getOrInit(
        provider,
        programs,
        redPixelSeeds,
        redPixelPda
    );
    const redPixelMintAta = deriveAtaPda(
        provider.wallet.publicKey,
        redPixel.mint
    );
    const greenPixelSeeds = {
        r: 0,
        g: 1,
        b: 0,
        depth: 1
    };
    const greenPixelPda = Pixel.derivePixelPda(
        programs.craft,
        greenPixelSeeds
    );
    const greenPixel = await InitPixel.getOrInit(
        provider,
        programs,
        greenPixelSeeds,
        greenPixelPda
    );
    const greenPixelMintAta = deriveAtaPda(
        provider.wallet.publicKey,
        greenPixel.mint
    );
    const bluePixelSeeds = {
        r: 0,
        g: 0,
        b: 1,
        depth: 1
    };
    const bluePixelPda = Pixel.derivePixelPda(
        programs.craft,
        bluePixelSeeds
    );
    const bluePixel = await InitPixel.getOrInit(
        provider,
        programs,
        bluePixelSeeds,
        bluePixelPda
    );
    const bluePixelMintAta = deriveAtaPda(
        provider.wallet.publicKey,
        bluePixel.mint
    );
    const yellowPixelSeeds = {
        r: 1,
        g: 1,
        b: 0,
        depth: 1
    };
    const yellowPixelPda = Pixel.derivePixelPda(
        programs.craft,
        yellowPixelSeeds
    );
    const yellowPixel = await InitPixel.getOrInit(
        provider,
        programs,
        yellowPixelSeeds,
        yellowPixelPda
    );
    const yellowPixelMintAta = deriveAtaPda(
        provider.wallet.publicKey,
        yellowPixel.mint
    );
    const magentaPixelSeeds = {
        r: 1,
        g: 0,
        b: 1,
        depth: 1
    };
    const magentaPixelPda = Pixel.derivePixelPda(
        programs.craft,
        magentaPixelSeeds
    );
    const magentaPixel = await InitPixel.getOrInit(
        provider,
        programs,
        magentaPixelSeeds,
        magentaPixelPda
    );
    const magentaPixelMintAta = deriveAtaPda(
        provider.wallet.publicKey,
        magentaPixel.mint
    );
    const cyanPixelSeeds = {
        r: 0,
        g: 1,
        b: 1,
        depth: 1
    };
    const cyanPixelPda = Pixel.derivePixelPda(
        programs.craft,
        cyanPixelSeeds
    );
    const cyanPixel = await InitPixel.getOrInit(
        provider,
        programs,
        cyanPixelSeeds,
        cyanPixelPda
    );
    const cyanPixelMintAta = deriveAtaPda(
        provider.wallet.publicKey,
        cyanPixel.mint
    );
    const whitePixelSeeds = {
        r: 1,
        g: 1,
        b: 1,
        depth: 1
    };
    const whitePixelPda = Pixel.derivePixelPda(
        programs.craft,
        whitePixelSeeds
    );
    const whitePixel = await InitPixel.getOrInit(
        provider,
        programs,
        whitePixelSeeds,
        whitePixelPda
    );
    const whitePixelMintAta = deriveAtaPda(
        provider.wallet.publicKey,
        whitePixel.mint
    );
    await programs
        .paint
        .methods
        .burnPixelsForPaint()
        .accounts(
            {
                proof: proofIndex.proof,
                redPixel: redPixelPda.address,
                greenPixel: greenPixelPda.address,
                bluePixel: bluePixelPda.address,
                yellowPixel: yellowPixelPda.address,
                magentaPixel: magentaPixelPda.address,
                cyanPixel: cyanPixelPda.address,
                whitePixel: whitePixelPda.address,
                redPixelMint: redPixel.mint,
                redPixelMintAta: redPixelMintAta,
                greenPixelMint: greenPixel.mint,
                greenPixelMintAta: greenPixelMintAta,
                bluePixelMint: bluePixel.mint,
                bluePixelMintAta: bluePixelMintAta,
                yellowPixelMint: yellowPixel.mint,
                yellowPixelMintAta: yellowPixelMintAta,
                magentaPixelMint: magentaPixel.mint,
                magentaPixelMintAta: magentaPixelMintAta,
                cyanPixelMint: cyanPixel.mint,
                cyanPixelMintAta: cyanPixelMintAta,
                whitePixelMint: whitePixel.mint,
                whitePixelMintAta: whitePixelMintAta,
                mint: proof.nft.mint,
                payer: provider.wallet.publicKey,
                tokenProgram: SPL_TOKEN_PROGRAM_ID,
                associatedTokenProgram: SPL_ASSOCIATED_TOKEN_PROGRAM_ID,
                craftingProgram: programs.craft.programId,
                systemProgram: SystemProgram.programId,
                rent: SYSVAR_RENT_PUBKEY
            }
        ).rpc()
}
