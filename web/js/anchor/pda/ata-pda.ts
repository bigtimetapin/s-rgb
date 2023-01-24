import {PublicKey} from "@solana/web3.js";
import {SPL_ASSOCIATED_TOKEN_PROGRAM_ID, SPL_TOKEN_PROGRAM_ID} from "../util/constants";
import {Program, SplToken} from "@project-serum/anchor";

export interface SplTokenAccount {
    mint: PublicKey
    amount: number
}

interface RawSplTokenAccount {
    mint: PublicKey
    amount: any // decoded as BN
}

export async function getAtaPda(program: Program<SplToken>, ata: PublicKey): Promise<SplTokenAccount> {
    const fetched = await program.account.token.fetch(
        ata
    ) as RawSplTokenAccount;
    return {
        mint: fetched.mint,
        amount: fetched.amount.toNumber()
    }
}

export function deriveAtaPda(authority: PublicKey, mint: PublicKey): PublicKey {
    let ataPda: PublicKey, _;
    [ataPda, _] = PublicKey.findProgramAddressSync(
        [
            authority.toBuffer(),
            SPL_TOKEN_PROGRAM_ID.toBuffer(),
            mint.toBuffer()
        ],
        SPL_ASSOCIATED_TOKEN_PROGRAM_ID
    )
    return ataPda
}
