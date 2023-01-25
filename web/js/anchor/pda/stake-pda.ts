import {Pda} from "./pda";
import {LAMPORTS_PER_SOL, PublicKey} from "@solana/web3.js";
import {AnchorProvider, Program, SplToken} from "@project-serum/anchor";
import {SRgb} from "../idl/idl";
import * as Red from "./primary/red"
import * as Green from "./primary/green"
import * as Blue from "./primary/blue"
import {getTokenAccount} from "./ata-pda";

export interface StakePda extends Pda {
}

export interface Stake {
    pool: PublicKey
    timestamp: number // decoded as BN
    tokenAccount: PublicKey
    amount: {
        amount: number
        formatted: string
    }
}

interface RawStake {
    pool: PublicKey
    timestamp: any // decoded as BN
    tokenAccount: PublicKey
}

export async function getStakePda(
    programs: {
        sRgb: Program<SRgb>,
        token: Program<SplToken>
    },
    pda: StakePda
): Promise<Stake> {
    const fetched = await programs.sRgb.account.stake.fetch(
        pda.address
    ) as RawStake;
    const ata = await getTokenAccount(
        programs.token,
        fetched.tokenAccount
    );
    return {
        pool: fetched.pool,
        timestamp: fetched.timestamp.toNumber(),
        tokenAccount: fetched.tokenAccount,
        amount: {
            amount: ata.amount,
            formatted: (Math.floor(ata.amount / LAMPORTS_PER_SOL)).toLocaleString()
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
