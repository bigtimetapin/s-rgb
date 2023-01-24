import {AnchorProvider, BN, Program, SplToken} from "@project-serum/anchor";
import {SRgb} from "../../idl/idl";
import {deriveAuthorityPda} from "../../pda/authority-pda";
import {deriveBluePda} from "../../pda/primary/primary-pda";
import {deriveBlueStakePda} from "../../pda/stake-pda";
import {LAMPORTS_PER_SOL, SystemProgram} from "@solana/web3.js";
import {getPools} from "../../pda/get-pools";

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
    const bluePda = deriveBluePda(
        programs.sRgb
    );
    const blueStakePda = deriveBlueStakePda(
        provider,
        programs.sRgb
    );
    const sol = 1;
    await programs
        .sRgb
        .methods
        .stakeBlue(
            new BN(sol * LAMPORTS_PER_SOL)
        )
        .accounts(
            {
                authority: authorityPda.address,
                blue: bluePda.address,
                stake: blueStakePda.address,
                payer: provider.wallet.publicKey,
                systemProgram: SystemProgram.programId
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
