import {AnchorProvider, Program, SplToken} from "@project-serum/anchor";
import {deriveAuthorityPda} from "../../pda/authority-pda";
import {deriveRedPda, getPrimaryPda} from "../../pda/stake/primary-pda";
import {deriveRedStakePda, getStakePda} from "../../pda/stake-pda";
import {deriveAtaPda} from "../../pda/ata-pda";
import {SystemProgram, SYSVAR_RENT_PUBKEY} from "@solana/web3.js";
import {SPL_ASSOCIATED_TOKEN_PROGRAM_ID, SPL_TOKEN_PROGRAM_ID, W_SOL} from "../../util/constants";
import {getGlobal} from "../../pda/get-global";
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
    }
): Promise<void> {
    const authorityPda = deriveAuthorityPda(
        programs.stake
    );
    const redPda = deriveRedPda(
        programs.stake
    );
    const red = await getPrimaryPda(
        programs.stake,
        redPda
    );
    const redStakePda = deriveRedStakePda(
        provider,
        programs.stake
    );
    const redStake = await getStakePda(
        programs,
        redStakePda
    );
    const redMintAtaPda = deriveAtaPda(
        provider.wallet.publicKey,
        red.mint
    );
    await programs
        .stake
        .methods
        .harvestRed()
        .accounts(
            {
                authority: authorityPda.address,
                red: redPda.address,
                stake: redStakePda.address,
                wsol: W_SOL,
                stakeTa: redStake.tokenAccount,
                redMint: red.mint,
                redMintAta: redMintAtaPda,
                payer: provider.wallet.publicKey,
                tokenProgram: SPL_TOKEN_PROGRAM_ID,
                associatedTokenProgram: SPL_ASSOCIATED_TOKEN_PROGRAM_ID,
                systemProgram: SystemProgram.programId,
                rent: SYSVAR_RENT_PUBKEY,
            }
        ).rpc();
    await getGlobal(
        app,
        provider,
        programs
    )
}
