import {Pda} from "../pda";
import {Program} from "@project-serum/anchor";
import {PublicKey} from "@solana/web3.js";
import {SRgbPaint} from "../../idl/paint";

export interface ProofPda extends Pda {
}

export interface Proof {
    nft: {
        mint: PublicKey
        url: PublicKey
    }
    burned: {
        burned: boolean
        plan: Plan
    }
}

export interface Plan {
    red: number // decoded as bn
    green: number // decoded as bn
    blue: number // decoded as bn
    yellow: number // decoded as bn
    magenta: number // decoded as bn
    cyan: number // decoded as bn
    white: number // decoded as bn
}

export async function getMany(program: Program<SRgbPaint>, pdaArray: PublicKey[]): Promise<Proof[]> {
    const fetched = (await program.account.proof.fetchMultiple(
        pdaArray
    )).filter(Boolean) as any[];
    return fetched.map(obj =>
        fromObj(obj)
    )
}

export async function get(program: Program<SRgbPaint>, pda: PublicKey): Promise<Proof> {
    console.log(pda.toString());
    const fetched = await program.account.proof.fetch(
        pda
    );
    console.log(fetched);
    return fromObj(
        fetched
    )
}

export function derive(program: Program<SRgbPaint>, mint: PublicKey): ProofPda {
    let pda, bump;
    [pda, bump] = PublicKey.findProgramAddressSync(
        [
            Buffer.from(SEED),
            mint.toBuffer()
        ],
        program.programId
    );
    return {
        address: pda,
        bump
    }
}

function fromObj(obj: any): Proof {
    return {
        nft: {
            mint: obj.nft.mint,
            url: obj.nft.url
        },
        burned: {
            burned: obj.burned.burned,
            plan: {
                red: obj.burned.plan.red.toNumber(),
                green: obj.burned.plan.green.toNumber(),
                blue: obj.burned.plan.blue.toNumber(),
                yellow: obj.burned.plan.yellow.toNumber(),
                magenta: obj.burned.plan.magenta.toNumber(),
                cyan: obj.burned.plan.cyan.toNumber(),
                white: obj.burned.plan.white.toNumber()
            }
        }
    } as Proof
}

const SEED = "proof";
