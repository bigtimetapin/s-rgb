import {AnchorProvider, Program, SplToken} from "@project-serum/anchor";
import {SystemProgram, SYSVAR_RENT_PUBKEY} from "@solana/web3.js";
import * as Proof from "../../../pda/paint/proof-pda";
import * as ProofIndex from "../../../pda/paint/proof-index-pda";
import * as ProofIndexer from "../../../pda/paint/proof-indexer-pda";
import * as Pixel from "../../../pda/craft/pixel-pda";
import {deriveAtaPda} from "../../../pda/ata-pda";
import {
    SPL_ASSOCIATED_TOKEN_PROGRAM_ID,
    SPL_TOKEN_PROGRAM_ID
} from "../../../util/constants";
import {SRgbStake} from "../../../idl/stake";
import {SRgbCraft} from "../../../idl/craft";
import {SRgbPaint} from "../../../idl/paint";

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
    const pixelOne = await Pixel.getPixelPda(
        provider,
        programs,
        proof.burned.plan.one.pda
    );
    const pixelOneMintAta = deriveAtaPda(
        provider.wallet.publicKey,
        pixelOne.mint
    );
    const pixelTwo = await Pixel.getPixelPda(
        provider,
        programs,
        proof.burned.plan.two.pda
    );
    const pixelTwoMintAta = deriveAtaPda(
        provider.wallet.publicKey,
        pixelTwo.mint
    );
    const pixelThree = await Pixel.getPixelPda(
        provider,
        programs,
        proof.burned.plan.three.pda
    );
    const pixelThreeMintAta = deriveAtaPda(
        provider.wallet.publicKey,
        pixelThree.mint
    );
    const pixelFour = await Pixel.getPixelPda(
        provider,
        programs,
        proof.burned.plan.four.pda
    );
    const pixelFourMintAta = deriveAtaPda(
        provider.wallet.publicKey,
        pixelFour.mint
    );
    const pixelFive = await Pixel.getPixelPda(
        provider,
        programs,
        proof.burned.plan.five.pda
    );
    const pixelFiveMintAta = deriveAtaPda(
        provider.wallet.publicKey,
        pixelFive.mint
    );
    const pixelSix = await Pixel.getPixelPda(
        provider,
        programs,
        proof.burned.plan.six.pda
    );
    const pixelSixMintAta = deriveAtaPda(
        provider.wallet.publicKey,
        pixelSix.mint
    );
    const pixelSeven = await Pixel.getPixelPda(
        provider,
        programs,
        proof.burned.plan.seven.pda
    );
    const pixelSevenMintAta = deriveAtaPda(
        provider.wallet.publicKey,
        pixelSeven.mint
    );
    await programs
        .paint
        .methods
        .burnPixelsOne()
        .accounts(
            {
                proof: proofIndex.proof,
                pixelOne: proof.burned.plan.one.pda,
                pixelTwo: proof.burned.plan.two.pda,
                pixelThree: proof.burned.plan.three.pda,
                pixelFour: proof.burned.plan.four.pda,
                pixelFive: proof.burned.plan.five.pda,
                pixelSix: proof.burned.plan.six.pda,
                pixelSeven: proof.burned.plan.seven.pda,
                pixelOneMint: pixelOne.mint,
                pixelOneMintAta: pixelOneMintAta,
                pixelTwoMint: pixelTwo.mint,
                pixelTwoMintAta: pixelTwoMintAta,
                pixelThreeMint: pixelThree.mint,
                pixelThreeMintAta: pixelThreeMintAta,
                pixelFourMint: pixelFour.mint,
                pixelFourMintAta: pixelFourMintAta,
                pixelFiveMint: pixelFive.mint,
                pixelFiveMintAta: pixelFiveMintAta,
                pixelSixMint: pixelSix.mint,
                pixelSixMintAta: pixelSixMintAta,
                pixelSevenMint: pixelSeven.mint,
                pixelSevenMintAta: pixelSevenMintAta,
                mint: proof.nft.mint,
                payer: provider.wallet.publicKey,
                tokenProgram: SPL_TOKEN_PROGRAM_ID,
                associatedTokenProgram: SPL_ASSOCIATED_TOKEN_PROGRAM_ID,
                systemProgram: SystemProgram.programId,
                rent: SYSVAR_RENT_PUBKEY
            }
        ).rpc()
}
