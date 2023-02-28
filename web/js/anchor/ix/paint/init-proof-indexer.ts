import {AnchorProvider, Program, SplToken} from "@project-serum/anchor";
import {SRgb} from "../../idl/idl";
import * as ProofIndexer from "../../pda/paint/proof-indexer-pda";
import {SystemProgram} from "@solana/web3.js";
import {getGlobal} from "../../pda/get-global";

export async function init(
    app,
    provider: AnchorProvider,
    programs: {
        sRgb: Program<SRgb>;
        token: Program<SplToken>
    }
): Promise<void> {
    await ix(
        provider,
        programs.sRgb
    );
    await getGlobal(
        app,
        provider,
        programs
    )
}

export async function getOrInit(
    provider: AnchorProvider,
    program: Program<SRgb>,
    proofIndexerPda: ProofIndexer.ProofIndexerPda
): Promise<ProofIndexer.ProofIndexer> {
    let proofIndexer: ProofIndexer.ProofIndexer;
    try {
        proofIndexer = await ProofIndexer.get(
            program,
            proofIndexerPda
        );
    } catch (error) {
        console.log(error);
        await ix(
            provider,
            program
        );
        proofIndexer = {
            indexer: 0
        }
    }
    return proofIndexer
}

async function ix(provider: AnchorProvider, program: Program<SRgb>): Promise<void> {
    const proofIndexerPda = ProofIndexer.derive(
        provider,
        program
    );
    await program
        .methods
        .initProofIndexer()
        .accounts(
            {
                proofIndexer: proofIndexerPda.address,
                payer: provider.wallet.publicKey,
                systemProgram: SystemProgram.programId
            }
        ).rpc();
}
