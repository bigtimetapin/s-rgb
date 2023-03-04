import {Pda} from "./pda";
import {Program} from "@project-serum/anchor";
import {LAMPORTS_PER_SOL, PublicKey} from "@solana/web3.js";
import {SRgbStake} from "../idl/stake";

export interface AuthorityPda extends Pda {
}

export interface Authority {
    tvl: {
        amount: number // decoded as BN
        formatted: string
    }
}

export interface RawAuthority {
    tvl: any // decoded as BN
}

export async function getAuthorityPda(program: Program<SRgbStake>, pda: AuthorityPda): Promise<Authority> {
    const fetched = await program.account.authority.fetch(
        pda.address
    ) as RawAuthority;
    return {
        tvl: {
            amount: fetched.tvl.toNumber(),
            formatted: (fetched.tvl.toNumber() / LAMPORTS_PER_SOL).toLocaleString()
        }
    }
}

export function deriveAuthorityPda(program: Program<SRgbStake>): AuthorityPda {
    let pda, bump;
    [pda, bump] = PublicKey.findProgramAddressSync(
        [
            Buffer.from(SEED)
        ],
        program.programId
    );
    return {
        address: pda,
        bump
    }
}

const SEED = "authority";
