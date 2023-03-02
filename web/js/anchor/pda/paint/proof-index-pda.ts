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
    return fetched.map(obj =>
        fromObj(obj)
    )
}

export async function get(program: Program<SRgb>, pda: ProofIndexPda): Promise<ProofIndex> {
    const fetched = await program.account.proofIndex.fetch(
        pda.address
    );
    return fromObj(
        fetched
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

function fromObj(obj: any): ProofIndex {
    return {
        proof: obj.proof,
        index: obj.index.toNumber()
    } as ProofIndex
}

const SEED = "proof-index";
