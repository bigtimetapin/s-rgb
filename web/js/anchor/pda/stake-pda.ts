import {Pda} from "./pda";
import {LAMPORTS_PER_SOL, PublicKey} from "@solana/web3.js";
import {AnchorProvider, Program, SplToken} from "@project-serum/anchor";
import * as Red from "./stake/red"
import * as Green from "./stake/green"
import * as Blue from "./stake/blue"
import {getTokenAccount} from "./ata-pda";
import {SRgbStake} from "../idl/stake";
import {SRgbCraft} from "../idl/craft";
import {SRgbPaint} from "../idl/paint";

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
        stake: Program<SRgbStake>;
        craft: Program<SRgbCraft>;
        paint: Program<SRgbPaint>;
        token: Program<SplToken>
    },
    pda: StakePda
): Promise<Stake> {
    const fetched = await programs.stake.account.stake.fetch(
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

export function deriveRedStakePda(provider: AnchorProvider, program: Program<SRgbStake>): StakePda {
    return deriveStakePda(provider, program, Red.SEED)
}

export function deriveGreenStakePda(provider: AnchorProvider, program: Program<SRgbStake>): StakePda {
    return deriveStakePda(provider, program, Green.SEED)
}

export function deriveBlueStakePda(provider: AnchorProvider, program: Program<SRgbStake>): StakePda {
    return deriveStakePda(provider, program, Blue.SEED)
}

function deriveStakePda(provider: AnchorProvider, program: Program<SRgbStake>, primaryColorSeed: string): StakePda {
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
