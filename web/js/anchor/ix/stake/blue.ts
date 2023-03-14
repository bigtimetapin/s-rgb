import {AnchorProvider, BN, Program, SplToken} from "@project-serum/anchor";
import {deriveAuthorityPda} from "../../pda/authority-pda";
import {deriveBluePda} from "../../pda/stake/primary-pda";
import {deriveBlueStakePda} from "../../pda/stake-pda";
import {Keypair, LAMPORTS_PER_SOL, SystemProgram, SYSVAR_RENT_PUBKEY} from "@solana/web3.js";
import {SPL_ASSOCIATED_TOKEN_PROGRAM_ID, SPL_TOKEN_PROGRAM_ID, W_SOL} from "../../util/constants";
import {deriveAtaPda} from "../../pda/ata-pda";
import {getUser} from "../../pda/get-global";
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
    const bluePda = deriveBluePda(
        programs.stake
    );
    const blueStakePda = deriveBlueStakePda(
        provider,
        programs.stake
    );
    const blueStakeTokenAccount = Keypair.generate(
    );
    const payerAtaPda = deriveAtaPda(
        provider.wallet.publicKey,
        W_SOL
    );
    const sol = 1;
    await programs
        .stake
        .methods
        .stakeBlue(
            new BN(sol * LAMPORTS_PER_SOL)
        )
        .accounts(
            {
                authority: authorityPda.address,
                blue: bluePda.address,
                stake: blueStakePda.address,
                wsol: W_SOL,
                stakeTa: blueStakeTokenAccount.publicKey,
                payerAta: payerAtaPda,
                payer: provider.wallet.publicKey,
                tokenProgram: SPL_TOKEN_PROGRAM_ID,
                associatedTokenProgram: SPL_ASSOCIATED_TOKEN_PROGRAM_ID,
                systemProgram: SystemProgram.programId,
                rent: SYSVAR_RENT_PUBKEY,
            }
        ).signers(
            [
                blueStakeTokenAccount
            ]
        )
        .rpc();
    await getUser(
        app,
        provider,
        programs
    )
}
