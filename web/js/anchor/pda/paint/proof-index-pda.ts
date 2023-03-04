import {Pda} from "../pda";
import {PublicKey} from "@solana/web3.js";
import {AnchorProvider, Program} from "@project-serum/anchor";
import {SRgbPaint} from "../../idl/paint";

export interface ProofIndexPda extends Pda {
}

export interface ProofIndex {
    proof: PublicKey,
    index: number // decoded as bn
}

export async function getMany(program: Program<SRgbPaint>, pdaArray: ProofIndexPda[]): Promise<ProofIndex[]> {
    const fetched = (await program.account.proofIndex.fetchMultiple(
        pdaArray.map(pda => pda.address)
    )).filter(Boolean) as any[];
    return fetched.map(obj =>
        fromObj(obj)
    )
}

export async function get(program: Program<SRgbPaint>, pda: ProofIndexPda): Promise<ProofIndex> {
    const fetched = await program.account.proofIndex.fetch(
        pda.address
    );
    return fromObj(
        fetched
    )
}

export function derive(provider: AnchorProvider, program: Program<SRgbPaint>, index: number): ProofIndexPda {
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
