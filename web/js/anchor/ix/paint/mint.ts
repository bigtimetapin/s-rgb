import {AnchorProvider, BN, Program, SplToken} from "@project-serum/anchor";
import {SRgb} from "../../idl/idl";
import {Keypair, PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY} from "@solana/web3.js";
import {deriveAtaPda} from "../../pda/ata-pda";
import * as Proof from "../../pda/paint/proof-pda";
import * as ProofIndexer from "../../pda/paint/proof-indexer-pda";
import * as InitProofIndexer from "./init-proof-indexer";
import * as ProofIndex from "../../pda/paint/proof-index-pda";
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
    let metadataPda, _;
    [metadataPda, _] = PublicKey.findProgramAddressSync(
        [
            Buffer.from(MPL_PREFIX),
            MPL_TOKEN_METADATA_PROGRAM_ID.toBuffer(),
            mint.publicKey.toBuffer()
        ],
        MPL_TOKEN_METADATA_PROGRAM_ID
    );
    const plan = {
        red: new BN(1),
        green: new BN(1),
        blue: new BN(1),
        yellow: new BN(1),
        magenta: new BN(1),
        cyan: new BN(1),
        white: new BN(1)
    };
    const url = new PublicKey(
        "4BezDfLSWqPCKqFCutLJ8JsNE3WqFCyP5ZjwNcVpMtJ2"
    );
    await programs
        .sRgb
        .methods
        .mintNftForPaint(
            plan as any,
            url as any
        ).accounts(
            {
                proof: proofPda.address,
                proofIndex: proofIndexPda.address,
                proofIndexer: proofIndexerPda.address,
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
