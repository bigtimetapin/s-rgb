import {Connection, Keypair} from "@solana/web3.js";
import {AnchorProvider, Program, Spl, SplToken} from "@project-serum/anchor";
import {Wallet} from "@project-serum/anchor/dist/cjs/provider";
import {COMMITMENT, CRAFTING_PROGRAM_ID, NETWORK, PAINTING_PROGRAM_ID, STAKING_PROGRAM_ID} from "../config";
import {EphemeralWallet, PhantomWallet} from "../wallet";
import {IDL as StakingIDL, SRgbStake} from "../idl/stake";
import {IDL as CraftingIDL, SRgbCraft} from "../idl/craft";
import {IDL as PaintingIDL, SRgbPaint} from "../idl/paint";

// get provider & program
export function getPP(_phantom: any): {
    provider: AnchorProvider;
    programs: {
        stake: Program<SRgbStake>;
        craft: Program<SRgbCraft>;
        paint: Program<SRgbPaint>;
        token: Program<SplToken>
    }
} {
    const wallet = new PhantomWallet(_phantom);
    return getPP_(wallet)
}

// get ephemeral provider & program
export function getEphemeralPP(): {
    provider: AnchorProvider;
    programs: {
        stake: Program<SRgbStake>;
        craft: Program<SRgbCraft>;
        paint: Program<SRgbPaint>;
        token: Program<SplToken>
    }
} {
    const keypair = Keypair.generate();
    const wallet = new EphemeralWallet(keypair);
    return getPP_(wallet)
}

function getPP_(wallet: Wallet): {
    provider: AnchorProvider;
    programs: {
        stake: Program<SRgbStake>;
        craft: Program<SRgbCraft>;
        paint: Program<SRgbPaint>;
        token: Program<SplToken>
    }
} {
    // set provider
    const connection = new Connection(
        NETWORK,
        COMMITMENT
    );
    const provider = new AnchorProvider(
        connection,
        wallet,
        AnchorProvider.defaultOptions()
    );
    // s-rgb programs
    const stakingProgram = new Program<SRgbStake>(
        StakingIDL,
        STAKING_PROGRAM_ID,
        provider
    );
    const craftingProgram: Program<SRgbCraft> = new Program<SRgbCraft>(
        CraftingIDL,
        CRAFTING_PROGRAM_ID,
        provider
    )
    const paintingProgram: Program<SRgbPaint> = new Program<SRgbPaint>(
        PaintingIDL,
        PAINTING_PROGRAM_ID,
        provider
    );
    // spl-token program
    const tokenProgram: Program<SplToken> = Spl.token(
        provider
    );
    return {
        provider: provider,
        programs: {
            stake: stakingProgram,
            craft: craftingProgram,
            paint: paintingProgram,
            token: tokenProgram,
        }
    }
}
