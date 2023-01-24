import {Pda} from "./pda";
import {LAMPORTS_PER_SOL, PublicKey} from "@solana/web3.js";
import {AnchorProvider, Program} from "@project-serum/anchor";
import {SRgb} from "../idl/idl";
import * as Red from "./primary/red"
import * as Green from "./primary/green"
import * as Blue from "./primary/blue"

export interface StakePda extends Pda {
}

export interface Stake {
    pool: PublicKey
    timestamp: number // decoded as BN
    amount: {
        amount: number
        formatted: string
    }
}

interface RawStake {
    pool: PublicKey
    timestamp: any // decoded as BN
}

export async function getStakePda(program: Program<SRgb>, pda: StakePda): Promise<Stake> {
    const accountInfo = await program.account.stake.getAccountInfo(
        pda.address
    );
    const decoded = program.coder.accounts.decode(
        "stake",
        accountInfo.data
    ) as RawStake;
    return {
        pool: decoded.pool,
        timestamp: decoded.timestamp.toNumber(),
        amount: {
            amount: accountInfo.lamports,
            formatted: (Math.floor(accountInfo.lamports / LAMPORTS_PER_SOL)).toLocaleString()
        }
    }
}

export function deriveRedStakePda(provider: AnchorProvider, program: Program<SRgb>): StakePda {
    return deriveStakePda(provider, program, Red.SEED)
}

export function deriveGreenStakePda(provider: AnchorProvider, program: Program<SRgb>): StakePda {
    return deriveStakePda(provider, program, Green.SEED)
}

export function deriveBlueStakePda(provider: AnchorProvider, program: Program<SRgb>): StakePda {
    return deriveStakePda(provider, program, Blue.SEED)
}

function deriveStakePda(provider: AnchorProvider, program: Program<SRgb>, primaryColorSeed: string): StakePda {
    let pda, bump;
    [pda, bump] = PublicKey.findProgramAddressSync(
        [
            Buffer.from(SEED),
            Buffer.from(primaryColorSeed),
            provider.wallet.publicKey.toBuffer()
        ],
        program.programId
    );
    return {
        address: pda,
        bump
    }
}

const SEED = "stake";
