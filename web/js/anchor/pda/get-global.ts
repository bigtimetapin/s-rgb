import {AnchorProvider, Program, SplToken} from "@project-serum/anchor";
import {SRgb} from "../idl/idl";
import {getPools} from "./get-pools";

export async function getGlobal(
    app,
    provider: AnchorProvider,
    programs: {
        sRgb: Program<SRgb>,
        token: Program<SplToken>
    },
): Promise<void> {
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
