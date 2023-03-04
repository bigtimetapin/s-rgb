import {AnchorProvider, Program, SplToken} from "@project-serum/anchor";
import {deriveAuthorityPda} from "../../pda/authority-pda";
import {deriveGreenPda, getPrimaryPda} from "../../pda/stake/primary-pda";
import {deriveGreenStakePda, getStakePda} from "../../pda/stake-pda";
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
    const greenPda = deriveGreenPda(
        programs.stake
    );
    const green = await getPrimaryPda(
        programs.stake,
        greenPda
    );
    const greenStakePda = deriveGreenStakePda(
        provider,
        programs.stake
    );
    const greenStake = await getStakePda(
        programs,
        greenStakePda
    );
    const greenMintAtaPda = deriveAtaPda(
        provider.wallet.publicKey,
        green.mint
    );
    await programs
        .stake
        .methods
        .harvestGreen()
        .accounts(
            {
                authority: authorityPda.address,
                green: greenPda.address,
                stake: greenStakePda.address,
                wsol: W_SOL,
                stakeTa: greenStake.tokenAccount,
                greenMint: green.mint,
                greenMintAta: greenMintAtaPda,
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
