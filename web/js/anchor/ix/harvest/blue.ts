import {AnchorProvider, Program, SplToken} from "@project-serum/anchor";
import {deriveAuthorityPda} from "../../pda/authority-pda";
import {deriveBluePda, getPrimaryPda} from "../../pda/stake/primary-pda";
import {deriveBlueStakePda, getStakePda} from "../../pda/stake-pda";
import {deriveAtaPda} from "../../pda/ata-pda";
import {SystemProgram, SYSVAR_RENT_PUBKEY} from "@solana/web3.js";
import {SPL_ASSOCIATED_TOKEN_PROGRAM_ID, SPL_TOKEN_PROGRAM_ID, W_SOL} from "../../util/constants";
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
    }
): Promise<void> {
    const authorityPda = deriveAuthorityPda(
        programs.stake
    );
    const bluePda = deriveBluePda(
        programs.stake
    );
    const blue = await getPrimaryPda(
        programs.stake,
        bluePda
    );
    const blueStakePda = deriveBlueStakePda(
        provider,
        programs.stake
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
        .stake
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
    await getUser(
        app,
        provider,
        programs
    )
}
