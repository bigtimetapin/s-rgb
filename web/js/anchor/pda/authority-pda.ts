import {Pda} from "./pda";
import {Program} from "@project-serum/anchor";
import {SRgb} from "../idl/idl";
import {PublicKey} from "@solana/web3.js";

export interface AuthorityPda extends Pda {
}

export interface Authority {
    tvl: number // decoded as BN
}

export interface RawAuthority {
    tvl: any // decoded as BN
}

export async function getAuthorityPda(program: Program<SRgb>, pda: AuthorityPda): Promise<Authority> {
    const fetched = await program.account.authority.fetch(
        pda.address
    ) as RawAuthority;
    return {
        tvl: fetched.tvl.toNumber()
    }
}

export function deriveAuthorityPda(program: Program<SRgb>): AuthorityPda {
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
