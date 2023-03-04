import {AnchorProvider, Program, SplToken} from "@project-serum/anchor";
import {deriveAuthorityPda, getAuthorityPda} from "./authority-pda";
import {deriveBluePda, deriveGreenPda, deriveRedPda, getPrimaryPda, Primary} from "./stake/primary-pda";
import {deriveBlueStakePda, deriveGreenStakePda, deriveRedStakePda, getStakePda, StakePda} from "./stake-pda";
import {deriveAtaPda, getTokenAccount} from "./ata-pda";
import {SRgbStake} from "../idl/stake";
import {SRgbCraft} from "../idl/craft";
import {SRgbPaint} from "../idl/paint";

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
        stake: Program<SRgbStake>;
        craft: Program<SRgbCraft>;
        paint: Program<SRgbPaint>;
        token: Program<SplToken>
    },
): Promise<Pools> {
    // derive & get authority pda
    const authorityPda = deriveAuthorityPda(
        programs.stake
    );
    const authority = await getAuthorityPda(
        programs.stake,
        authorityPda
    );
    // derive & get red pda
    const redPda = deriveRedPda(
        programs.stake
    );
    const red = await getPrimaryPda(
        programs.stake,
        redPda
    );
    // derive & get green pda
    const greenPda = deriveGreenPda(
        programs.stake
    );
    const green = await getPrimaryPda(
        programs.stake,
        greenPda
    );
    // derive & get blue pda
    const bluePda = deriveBluePda(
        programs.stake
    );
    const blue = await getPrimaryPda(
        programs.stake,
        bluePda
    );
    // derive & get red stake pda
    const redStakePda = deriveRedStakePda(
        provider,
        programs.stake
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
        programs.stake
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
        programs.stake
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
        stake: Program<SRgbStake>;
        craft: Program<SRgbCraft>;
        paint: Program<SRgbPaint>;
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
