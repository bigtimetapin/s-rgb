import {Pda} from "../pda";
import {LAMPORTS_PER_SOL, PublicKey} from "@solana/web3.js";
import {Program} from "@project-serum/anchor";
import * as Red from "./red"
import * as Green from "./green"
import * as Blue from "./blue"
import {SRgbStake} from "../../idl/stake";

export interface PrimaryPda extends Pda {
}

export interface Primary {
    mint: PublicKey
    tvl: {
        amount: number // decoded as BN
        formatted: string
    }
}

interface RawPrimary {
    mint: PublicKey
    tvl: any // decoded as BN
}

export async function getPrimaryPda(program: Program<SRgbStake>, pda: PrimaryPda): Promise<Primary> {
    const fetched = await program.account.primary.fetch(
        pda.address
    ) as RawPrimary;
    return {
        mint: fetched.mint,
        tvl: {
            amount: fetched.tvl.toNumber(),
            formatted: (fetched.tvl.toNumber() / LAMPORTS_PER_SOL).toLocaleString()
        }
    }
}

export function deriveRedPda(program: Program<SRgbStake>): PrimaryPda {
    return derivePrimaryPda(program, Red.SEED)
}

export function deriveGreenPda(program: Program<SRgbStake>): PrimaryPda {
    return derivePrimaryPda(program, Green.SEED)
}

export function deriveBluePda(program: Program<SRgbStake>): PrimaryPda {
    return derivePrimaryPda(program, Blue.SEED)
}

function derivePrimaryPda(program: Program<SRgbStake>, primaryColorSeed: string): PrimaryPda {
    let pda, bump;
    [pda, bump] = PublicKey.findProgramAddressSync(
        [
            Buffer.from(SEED),
            Buffer.from(primaryColorSeed)
        ],
        program.programId
    );
    return {
        address: pda,
        bump
    }
}

const SEED = "primary";
