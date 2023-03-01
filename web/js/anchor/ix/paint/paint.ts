import {AnchorProvider, BN, Program, SplToken} from "@project-serum/anchor";
import {SRgb} from "../../idl/idl";
import {Keypair, PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY} from "@solana/web3.js";
import * as InitPixel from "../pixel/init";
import * as InitProofIndexer from "./init-proof-indexer";
import * as Proof from "../../pda/paint/proof-pda";
import * as ProofIndex from "../../pda/paint/proof-index-pda";
import * as ProofIndexer from "../../pda/paint/proof-indexer-pda";
import * as Pixel from "../../pda/pixel/pixel-pda";
import {deriveAtaPda} from "../../pda/ata-pda";
import {
    MPL_PREFIX,
    MPL_TOKEN_METADATA_PROGRAM_ID,
    SPL_ASSOCIATED_TOKEN_PROGRAM_ID,
    SPL_TOKEN_PROGRAM_ID
} from "../../util/constants";
import {getGlobal} from "../../pda/get-global";

export async function ix(
    app,
    provider: AnchorProvider,
    programs: {
        sRgb: Program<SRgb>;
        token: Program<SplToken>
    }
): Promise<void> {
    const mint = Keypair.generate(
    );
    const mintAta = deriveAtaPda(
        provider.wallet.publicKey,
        mint.publicKey
    );
    const proofPda = Proof.derive(
        programs.sRgb,
        mint.publicKey
    );
    const proofIndexerPda = ProofIndexer.derive(
        provider,
        programs.sRgb
    );
    const proofIndexer = await InitProofIndexer.getOrInit(
        provider,
        programs.sRgb,
        proofIndexerPda
    );
    const proofIndexPda = ProofIndex.derive(
        provider,
        programs.sRgb,
        proofIndexer.indexer + 1
    );
    const redPixelSeeds = {
        r: 1,
        g: 0,
        b: 0,
        depth: 1
    };
    const redPixelPda = Pixel.derivePixelPda(
        programs.sRgb,
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
        programs.sRgb,
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
        programs.sRgb,
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
        programs.sRgb,
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
        programs.sRgb,
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
        programs.sRgb,
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
        programs.sRgb,
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
    let metadataPda, _;
    [metadataPda, _] = PublicKey.findProgramAddressSync(
        [
            Buffer.from(MPL_PREFIX),
            MPL_TOKEN_METADATA_PROGRAM_ID.toBuffer(),
            mint.publicKey.toBuffer()
        ],
        MPL_TOKEN_METADATA_PROGRAM_ID
    );
    const burned = {
        red: new BN(1),
        green: new BN(1),
        blue: new BN(1),
        yellow: new BN(1),
        magenta: new BN(1),
        cyan: new BN(1),
        white: new BN(1)
    };
    await programs
        .sRgb
        .methods
        .paint(
            burned as any
        )
        .accounts(
            {
                proof: proofPda.address,
                proofIndex: proofIndexPda.address,
                proofIndexer: proofIndexerPda.address,
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
                mint: mint.publicKey,
                mintAta: mintAta,
                metadata: metadataPda,
                payer: provider.wallet.publicKey,
                tokenProgram: SPL_TOKEN_PROGRAM_ID,
                associatedTokenProgram: SPL_ASSOCIATED_TOKEN_PROGRAM_ID,
                metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
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
