import {Pda} from "./pda";
import {LAMPORTS_PER_SOL, PublicKey} from "@solana/web3.js";
import {AnchorProvider, Program, SplToken} from "@project-serum/anchor";
import {SRgb} from "../idl/idl";
import * as Red from "./primary/red"
import * as Green from "./primary/green"
import * as Blue from "./primary/blue"
import {deriveAtaPda} from "./ata-pda";
import {W_SOL} from "../util/constants";

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

interface RawSplToken {
    mint: PublicKey
    amount: any // encoded as BN
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
    const ataPda = deriveAtaPda(
        pda.address,
        W_SOL
    );
    const ata = await programs.token.account.token.fetch(
        ataPda
    ) as RawSplToken;
    return {
        pool: fetched.pool,
        timestamp: fetched.timestamp.toNumber(),
        amount: {
            amount: ata.amount.toNumber(),
            formatted: (Math.floor(ata.amount.toNumber() / LAMPORTS_PER_SOL)).toLocaleString()
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
