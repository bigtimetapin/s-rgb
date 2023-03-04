import {Pda} from "../pda";
import {AnchorProvider, Program} from "@project-serum/anchor";
import {PublicKey} from "@solana/web3.js";
import {SRgbPaint} from "../../idl/paint";

export interface ProofIndexerPda extends Pda {
}

export interface ProofIndexer {
    indexer: number // decoded as bn
}

export async function get(program: Program<SRgbPaint>, pda: ProofIndexerPda): Promise<ProofIndexer> {
    const fetched = await program.account.proofIndexer.fetch(
        pda.address
    );
    return {
        indexer: fetched.indexer.toNumber()
    }
}

export function derive(provider: AnchorProvider, program: Program<SRgbPaint>): ProofIndexerPda {
    let pda, bump;
    [pda, bump] = PublicKey.findProgramAddressSync(
        [
            Buffer.from(SEED),
            provider.wallet.publicKey.toBuffer()
        ],
        program.programId
    );
    return {
        address: pda,
        bump
    }
}

const SEED = "proof-indexer";
