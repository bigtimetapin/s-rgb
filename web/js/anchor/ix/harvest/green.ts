import {AnchorProvider, Program, SplToken} from "@project-serum/anchor";
import {SRgb} from "../../idl/idl";
import {deriveAuthorityPda} from "../../pda/authority-pda";
import {deriveGreenPda, getPrimaryPda} from "../../pda/primary/primary-pda";
import {deriveGreenStakePda, getStakePda} from "../../pda/stake-pda";
import {deriveAtaPda} from "../../pda/ata-pda";
import {SystemProgram, SYSVAR_RENT_PUBKEY} from "@solana/web3.js";
import {SPL_ASSOCIATED_TOKEN_PROGRAM_ID, SPL_TOKEN_PROGRAM_ID, W_SOL} from "../../util/constants";
import {getGlobal} from "../../pda/get-global";

export async function ix(
    app,
    provider: AnchorProvider,
    programs: {
        sRgb: Program<SRgb>,
        token: Program<SplToken>
    }
): Promise<void> {
    const authorityPda = deriveAuthorityPda(
        programs.sRgb
    );
    const greenPda = deriveGreenPda(
        programs.sRgb
    );
    const green = await getPrimaryPda(
        programs.sRgb,
        greenPda
    );
    const greenStakePda = deriveGreenStakePda(
        provider,
        programs.sRgb
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
        .sRgb
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
