import {AnchorProvider, BN, Program, SplToken} from "@project-serum/anchor";
import {deriveAuthorityPda} from "../../pda/authority-pda";
import {deriveGreenPda} from "../../pda/stake/primary-pda";
import {deriveGreenStakePda} from "../../pda/stake-pda";
import {
    Keypair,
    LAMPORTS_PER_SOL,
    SystemProgram,
    SYSVAR_RENT_PUBKEY,
    TransactionInstruction
} from "@solana/web3.js";
import {SPL_ASSOCIATED_TOKEN_PROGRAM_ID, SPL_TOKEN_PROGRAM_ID, W_SOL} from "../../util/constants";
import {deriveAtaPda} from "../../pda/ata-pda";
import {getUser} from "../../pda/get-global";
import {buildTxForMany} from "../../util/tx";
import {SRgbStake} from "../../idl/stake";
import {SRgbCraft} from "../../idl/craft";
import {SRgbPaint} from "../../idl/paint";

export async function ix(
    app,
    provider: AnchorProvider,
    programs: {
        stake: Program<SRgbStake>;
        craft: Program<SRgbCraft>;
        paint: Program<SRgbPaint>;
        token: Program<SplToken>
    },
): Promise<void> {
    const authorityPda = deriveAuthorityPda(
        programs.stake
    );
    const greenPda = deriveGreenPda(
        programs.stake
    );
    const greenStakePda = deriveGreenStakePda(
        provider,
        programs.stake
    );
    const greenStakeTokenAccount = Keypair.generate(
    );
    const payerAtaPda = deriveAtaPda(
        provider.wallet.publicKey,
        W_SOL
    );
    const sol = 1;
    const ix: TransactionInstruction = await programs
        .stake
        .methods
        .stakeGreen(
            new BN(sol * LAMPORTS_PER_SOL)
        )
        .accounts(
            {
                authority: authorityPda.address,
                green: greenPda.address,
                stake: greenStakePda.address,
                wsol: W_SOL,
                stakeTa: greenStakeTokenAccount.publicKey,
                payerAta: payerAtaPda,
                payer: provider.wallet.publicKey,
                tokenProgram: SPL_TOKEN_PROGRAM_ID,
                associatedTokenProgram: SPL_ASSOCIATED_TOKEN_PROGRAM_ID,
                systemProgram: SystemProgram.programId,
                rent: SYSVAR_RENT_PUBKEY,
            }
        ).instruction();
    const ready = await buildTxForMany(
        provider,
        ix,
        [
            greenStakeTokenAccount
        ]
    )
    const sent = await provider.sendAll(
        [
            ready
        ]
    );
    console.log(sent);
    await getUser(
        app,
        provider,
        programs
    )
}
