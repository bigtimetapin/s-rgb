import {AnchorProvider, BN, Program, SplToken} from "@project-serum/anchor";
import {SRgb} from "../../idl/idl";
import {deriveAuthorityPda} from "../../pda/authority-pda";
import {deriveRedPda} from "../../pda/primary/primary-pda";
import {deriveRedStakePda} from "../../pda/stake-pda";
import {LAMPORTS_PER_SOL, SystemProgram, SYSVAR_RENT_PUBKEY} from "@solana/web3.js";
import {getPools} from "../../pda/get-pools";
import {deriveAtaPda} from "../../pda/ata-pda";
import {SPL_ASSOCIATED_TOKEN_PROGRAM_ID, SPL_TOKEN_PROGRAM_ID, W_SOL} from "../../util/constants";

export async function ix(
    app,
    provider: AnchorProvider,
    programs: {
        sRgb: Program<SRgb>,
        token: Program<SplToken>
    },
): Promise<void> {
    const authorityPda = deriveAuthorityPda(
        programs.sRgb
    );
    const redPda = deriveRedPda(
        programs.sRgb
    );
    const redStakePda = deriveRedStakePda(
        provider,
        programs.sRgb
    );
    const redStakeAtaPda = deriveAtaPda(
        redStakePda.address,
        W_SOL
    );
    const payerAtaPda = deriveAtaPda(
        provider.wallet.publicKey,
        W_SOL
    );
    const sol = 1;
    await programs
        .sRgb
        .methods
        .stakeRed(
            new BN(sol * LAMPORTS_PER_SOL)
        )
        .accounts(
            {
                authority: authorityPda.address,
                red: redPda.address,
                stake: redStakePda.address,
                wsol: W_SOL,
                stakeAta: redStakeAtaPda,
                payerAta: payerAtaPda,
                payer: provider.wallet.publicKey,
                tokenProgram: SPL_TOKEN_PROGRAM_ID,
                associatedTokenProgram: SPL_ASSOCIATED_TOKEN_PROGRAM_ID,
                systemProgram: SystemProgram.programId,
                rent: SYSVAR_RENT_PUBKEY,
            }
        ).rpc();
    const pools = await getPools(
        provider,
        programs
    );
    const user = {
        wallet: provider.wallet.publicKey.toString(),
        tvl: pools.tvl,
        pools: pools.pools
    };
    app.ports.success.send(
        JSON.stringify(
            {
                listener: "global-found-user",
                more: JSON.stringify(
                    user
                )
            }
        )
    );
}
