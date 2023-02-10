import {AnchorProvider, Program, SplToken} from "@project-serum/anchor";
import {SRgb} from "../idl/idl";
import {deriveAuthorityPda, getAuthorityPda} from "./authority-pda";
import {deriveBluePda, deriveGreenPda, deriveRedPda, getPrimaryPda, Primary} from "./primary/primary-pda";
import {deriveBlueStakePda, deriveGreenStakePda, deriveRedStakePda, getStakePda, StakePda} from "./stake-pda";
import {deriveAtaPda, getTokenAccount} from "./ata-pda";

export interface Pools {
    tvl: Amount
    pools: {
        red: Pool
        green: Pool
        blue: Pool
    }
}

export interface Pool {
    tvl: Amount
    staked: Amount
    balance: Amount
}

export interface Amount {
    amount: number
    formatted: string
}

export async function getPools(
    provider: AnchorProvider,
    programs: {
        sRgb: Program<SRgb>,
        token: Program<SplToken>
    },
): Promise<Pools> {
    // derive & get authority pda
    const authorityPda = deriveAuthorityPda(
        programs.sRgb
    );
    const authority = await getAuthorityPda(
        programs.sRgb,
        authorityPda
    );
    // derive & get red pda
    const redPda = deriveRedPda(
        programs.sRgb
    );
    const red = await getPrimaryPda(
        programs.sRgb,
        redPda
    );
    // derive & get green pda
    const greenPda = deriveGreenPda(
        programs.sRgb
    );
    const green = await getPrimaryPda(
        programs.sRgb,
        greenPda
    );
    // derive & get blue pda
    const bluePda = deriveBluePda(
        programs.sRgb
    );
    const blue = await getPrimaryPda(
        programs.sRgb,
        bluePda
    );
    // derive & get red stake pda
    const redStakePda = deriveRedStakePda(
        provider,
        programs.sRgb
    );
    const redPool = await getPool(
        provider,
        programs,
        redStakePda,
        red,
        "red"
    );
    // derive & get green stake pda
    const greenStakePda = deriveGreenStakePda(
        provider,
        programs.sRgb
    );
    const greenPool = await getPool(
        provider,
        programs,
        greenStakePda,
        green,
        "green"
    );
    // derive & get blue stake pda
    const blueStakePda = deriveBlueStakePda(
        provider,
        programs.sRgb
    );
    const bluePool = await getPool(
        provider,
        programs,
        blueStakePda,
        blue,
        "blue"
    );
    return {
        tvl: authority.tvl,
        pools: {
            red: redPool,
            green: greenPool,
            blue: bluePool
        }
    }
}

async function getPool(
    provider: AnchorProvider,
    programs: {
        sRgb: Program<SRgb>,
        token: Program<SplToken>
    },
    pda: StakePda,
    primary: Primary,
    name: string
): Promise<Pool> {
    let pool: Pool;
    let stakedAmount: Amount;
    let balanceAmount: Amount
    try {
        const stake = await getStakePda(
            programs,
            pda
        );
        stakedAmount = stake.amount;
    } catch (error) {
        console.log(error);
        console.log("no existing" + " " + name + "-stake");
        stakedAmount = {
            amount: 0,
            formatted: "0"
        }
    }
    try {
        const primaryAtaPda = deriveAtaPda(
            provider.wallet.publicKey,
            primary.mint
        );
        const primaryAta = await getTokenAccount(
            programs.token,
            primaryAtaPda
        );
        console.log(primaryAta.amount);
        console.log(primaryAta.mint.toString());
        balanceAmount = {
            amount: primaryAta.amount,
            formatted: primaryAta.amount.toLocaleString()
        };
    } catch (error) {
        console.log(error);
        console.log("no existing" + " " + name + "-balance");
        balanceAmount = {
            amount: 0,
            formatted: "0"
        };
    }
    pool = {
        tvl: primary.tvl,
        staked: stakedAmount,
        balance: balanceAmount
    }
    return pool
}
