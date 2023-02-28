import {Pda} from "../pda";
import {PublicKey} from "@solana/web3.js";
import {AnchorProvider, Program} from "@project-serum/anchor";
import {SRgb} from "../../idl/idl";

export interface ProofIndexPda extends Pda {
}

export interface ProofIndex {
    proof: PublicKey,
    index: number // decoded as bn
}

export async function getMany(program: Program<SRgb>, pdaArray: ProofIndexPda[]): Promise<ProofIndex[]> {
    const fetched = (await program.account.proofIndex.fetchMultiple(
        pdaArray.map(pda => pda.address)
    )).filter(Boolean) as any[];
    return fetched.map(obj => {
            return {
                proof: obj.proof,
                index: obj.index.toNumber()
            } as ProofIndex
        }
    )
}

export function derive(provider: AnchorProvider, program: Program<SRgb>, index: number): ProofIndexPda {
    let pda, bump;
    [pda, bump] = PublicKey.findProgramAddressSync(
        [
            Buffer.from(SEED),
            provider.wallet.publicKey.toBuffer(),
            Buffer.from(index.toString())
        ],
        program.programId
    );
    return {
        address: pda,
        bump
    }
}

const SEED = "proof-index";
