import {Connection, Keypair} from "@solana/web3.js";
import {AnchorProvider, Program, Spl, SplToken, Wallet} from "@project-serum/anchor";
import {COMMITMENT, NETWORK, PROGRAM_ID} from "../config";
import {EphemeralWallet, PhantomWallet} from "../wallet";
import {SRgb, IDL} from "../idl/idl";

// get provider & program
export function getPP(_phantom: any): {
    provider: AnchorProvider;
    programs: {
        sRgb: Program<SRgb>;
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
        sRgb: Program<SRgb>;
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
        sRgb: Program<SRgb>;
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
    // s-rgb program
    const sRgbProgram = new Program<SRgb>(
        IDL,
        PROGRAM_ID,
        provider
    );
    // spl-token program
    const tokenProgram: Program<SplToken> = Spl.token(
        provider
    );
    return {
        provider: provider,
        programs: {
            sRgb: sRgbProgram,
            token: tokenProgram,
        }
    }
}
