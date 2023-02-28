import {Pda} from "../pda";
import {Program} from "@project-serum/anchor";
import {SRgb} from "../../idl/idl";
import {PublicKey} from "@solana/web3.js";

export interface ProofPda extends Pda {
}

export interface Proof {
    mint: PublicKey
    burned: Burned
}

export interface Burned {
    red: number // decoded as bn
    green: number // decoded as bn
    blue: number // decoded as bn
    yellow: number // decoded as bn
    magenta: number // decoded as bn
    cyan: number // decoded as bn
    white: number // decoded as bn
}

export async function getMany(program: Program<SRgb>, pdaArray: PublicKey[]): Promise<Proof[]> {
    const fetched = (await program.account.proof.fetchMultiple(
        pdaArray
    )).filter(Boolean) as any[];
    return fetched.map(obj => {
            return {
                mint: obj.mint,
                burned: {
                    red: obj.burned.red.toNumber(),
                    green: obj.green.toNumber(),
                    blue: obj.blue.toNumber(),
                    yellow: obj.yellow.toNumber(),
                    magenta: obj.magenta.toNumber(),
                    cyan: obj.cyan.toNumber(),
                    white: obj.white.toNumber()
                }
            } as Proof
        }
    )
}

export function derive(program: Program<SRgb>, mint: PublicKey): ProofPda {
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

const SEED = "proof";
