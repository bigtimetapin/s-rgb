import {AnchorProvider, Program, SplToken} from "@project-serum/anchor";
import {SRgb} from "../../idl/idl";
import {deriveAuthorityPda} from "../../pda/authority-pda";
import {deriveBluePda, getPrimaryPda} from "../../pda/primary/primary-pda";
import {deriveBlueStakePda, getStakePda} from "../../pda/stake-pda";
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
    const bluePda = deriveBluePda(
        programs.sRgb
    );
    const blue = await getPrimaryPda(
        programs.sRgb,
        bluePda
    );
    const blueStakePda = deriveBlueStakePda(
        provider,
        programs.sRgb
    );
    const blueStake = await getStakePda(
        programs,
        blueStakePda
    );
    const blueMintAtaPda = deriveAtaPda(
        provider.wallet.publicKey,
        blue.mint
    );
    await programs
        .sRgb
        .methods
        .harvestBlue()
        .accounts(
            {
                authority: authorityPda.address,
                blue: bluePda.address,
                stake: blueStakePda.address,
                wsol: W_SOL,
                stakeTa: blueStake.tokenAccount,
                blueMint: blue.mint,
                blueMintAta: blueMintAtaPda,
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
