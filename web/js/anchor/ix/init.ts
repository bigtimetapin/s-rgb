import {AnchorProvider, Program} from "@project-serum/anchor";
import {deriveAuthorityPda, getAuthorityPda} from "../pda/authority-pda";
import {deriveBluePda, deriveGreenPda, deriveRedPda, getPrimaryPda} from "../pda/stake/primary-pda";
import {Keypair, SystemProgram, SYSVAR_RENT_PUBKEY} from "@solana/web3.js";
import {SPL_TOKEN_PROGRAM_ID, W_SOL} from "../util/constants";
import {SRgbStake} from "../idl/stake";

export async function ix(provider: AnchorProvider, program: Program<SRgbStake>): Promise<void> {
    const authorityPda = deriveAuthorityPda(
        program
    );
    const redPda = deriveRedPda(
        program
    );
    const greenPda = deriveGreenPda(
        program
    );
    const bluePda = deriveBluePda(
        program
    );
    const redMint = Keypair.generate(
    );
    const greenMint = Keypair.generate(
    );
    const blueMint = Keypair.generate(
    );
    await program
        .methods
        .init()
        .accounts(
            {
                authority: authorityPda.address,
                red: redPda.address,
                green: greenPda.address,
                blue: bluePda.address,
                wsol: W_SOL,
                redMint: redMint.publicKey,
                greenMint: greenMint.publicKey,
                blueMint: blueMint.publicKey,
                payer: provider.wallet.publicKey,
                tokenProgram: SPL_TOKEN_PROGRAM_ID,
                systemProgram: SystemProgram.programId,
                rent: SYSVAR_RENT_PUBKEY,
            }
        ).signers([
                redMint,
                greenMint,
                blueMint
            ]
        )
        .rpc();
    const authority = await getAuthorityPda(
        program,
        authorityPda
    );
    console.log(authority.tvl)
    const red = await getPrimaryPda(
        program,
        redPda
    );
    console.log(red.mint.toString());
    console.log(redMint.publicKey.toString());
    const green = await getPrimaryPda(
        program,
        greenPda
    );
    console.log(green.mint.toString());
    console.log(greenMint.publicKey.toString());
    const blue = await getPrimaryPda(
        program,
        bluePda
    );
    console.log(blue.mint.toString());
    console.log(blueMint.publicKey.toString());
}
