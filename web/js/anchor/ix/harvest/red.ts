import {AnchorProvider, Program, SplToken} from "@project-serum/anchor";
import {SRgb} from "../../idl/idl";
import {deriveAuthorityPda} from "../../pda/authority-pda";
import {deriveRedPda, getPrimaryPda} from "../../pda/primary/primary-pda";
import {deriveRedStakePda} from "../../pda/stake-pda";
import {deriveAtaPda} from "../../pda/ata-pda";
import {SystemProgram, SYSVAR_RENT_PUBKEY} from "@solana/web3.js";
import {SPL_ASSOCIATED_TOKEN_PROGRAM_ID, SPL_TOKEN_PROGRAM_ID} from "../../util/constants";
import {getPools} from "../../pda/get-pools";

export async function ix(
    app,
    provider: AnchorProvider,
    programs: {
        sRgb: Program<SRgb>,
        token: Program<SplToken>
    }
): Promise<void> {
    const authorityPda = deriveAuthorityPda(
        programs.sRgb
    );
    const redPda = deriveRedPda(
        programs.sRgb
    );
    const red = await getPrimaryPda(
        programs.sRgb,
        redPda
    );
    const redStakePda = deriveRedStakePda(
        provider,
        programs.sRgb
    );
    const ataPda = deriveAtaPda(
        provider.wallet.publicKey,
        red.mint
    );
    await programs
        .sRgb
        .methods
        .harvestRed()
        .accounts(
            {
                authority: authorityPda.address,
                red: redPda.address,
                stake: redStakePda.address,
                redMint: red.mint,
                ata: ataPda,
                payer: provider.wallet.publicKey,
                systemProgram: SystemProgram.programId,
                tokenProgram: SPL_TOKEN_PROGRAM_ID,
                associatedTokenProgram: SPL_ASSOCIATED_TOKEN_PROGRAM_ID,
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
