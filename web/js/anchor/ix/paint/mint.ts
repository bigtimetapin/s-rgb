import {AnchorProvider, BN, Program, SplToken} from "@project-serum/anchor";
import {Keypair, PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY} from "@solana/web3.js";
import {deriveAtaPda} from "../../pda/ata-pda";
import * as Pixel from "../../pda/craft/pixel-pda";
import * as Proof from "../../pda/paint/proof-pda";
import * as ProofIndexer from "../../pda/paint/proof-indexer-pda";
import * as InitProofIndexer from "./init-proof-indexer";
import * as ProofIndex from "../../pda/paint/proof-index-pda";
import {
    MPL_PREFIX,
    MPL_TOKEN_METADATA_PROGRAM_ID,
    SPL_ASSOCIATED_TOKEN_PROGRAM_ID,
    SPL_TOKEN_PROGRAM_ID
} from "../../util/constants";
import {getUser} from "../../pda/get-global";
import {SRgbStake} from "../../idl/stake";
import {SRgbCraft} from "../../idl/craft";
import {SRgbPaint} from "../../idl/paint";
import {buildUrl, provision, uploadMultipleFiles} from "../../../shdw";
import * as Metadata from "../../pda/paint/metadata";
import {domToImage} from "./dom-to-image";
import {burn} from "./burn/burn";

interface Input {
    white: number
    red: number
    green: number
    blue: number
    yellow: number
    magenta: number
    cyan: number
}

export async function ix(
    app,
    provider: AnchorProvider,
    programs: {
        stake: Program<SRgbStake>;
        craft: Program<SRgbCraft>;
        paint: Program<SRgbPaint>;
        token: Program<SplToken>
    },
    input: Input
): Promise<void> {
    const mint = Keypair.generate(
    );
    const mintAta = deriveAtaPda(
        provider.wallet.publicKey,
        mint.publicKey
    );
    const proofPda = Proof.derive(
        programs.paint,
        mint.publicKey
    );
    const proofIndexerPda = ProofIndexer.derive(
        provider,
        programs.paint
    );
    const proofIndexer = await InitProofIndexer.getOrInit(
        provider,
        programs.paint,
        proofIndexerPda
    );
    const proofIndexPda = ProofIndex.derive(
        provider,
        programs.paint,
        proofIndexer.indexer + 1
    );
    let metadataPda, _;
    [metadataPda, _] = PublicKey.findProgramAddressSync(
        [
            Buffer.from(MPL_PREFIX),
            MPL_TOKEN_METADATA_PROGRAM_ID.toBuffer(),
            mint.publicKey.toBuffer()
        ],
        MPL_TOKEN_METADATA_PROGRAM_ID
    );
    const plan = buildPlan(
        input,
        programs.craft
    );
    const image = await domToImage(
    );
    const provisioned = await provision(
        provider.connection,
        provider.wallet,
        image.size
    );
    const metadata = Metadata.build(
        buildUrl(provisioned.account) + image.name
    );
    await uploadMultipleFiles(
        [
            image,
            metadata
        ],
        provisioned.drive,
        provisioned.account
    );
    await programs
        .paint
        .methods
        .mintNft(
            plan as any,
            provisioned.account as any
        ).accounts(
            {
                proof: proofPda.address,
                proofIndex: proofIndexPda.address,
                proofIndexer: proofIndexerPda.address,
                mint: mint.publicKey,
                mintAta: mintAta,
                metadata: metadataPda,
                payer: provider.wallet.publicKey,
                tokenProgram: SPL_TOKEN_PROGRAM_ID,
                associatedTokenProgram: SPL_ASSOCIATED_TOKEN_PROGRAM_ID,
                metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
                systemProgram: SystemProgram.programId,
                rent: SYSVAR_RENT_PUBKEY
            }
        ).signers(
            [
                mint
            ]
        ).rpc();
    let proof: Proof.Proof | null;
    try {
        proof = await Proof.get(
            programs.paint,
            proofPda.address
        );
    } catch (error) {
        // it's likely that if this failed
        // it was a false DNE exception bc the RPC node is just behind the leader
        // and if we invoke one more time we're good
        console.log(error);
        try {
            proof = await Proof.get(
                programs.paint,
                proofPda.address
            );
        } catch (error2) {
            try {
                proof = await Proof.get(
                    programs.paint,
                    proofPda.address
                );
            } catch (error3) {
                console.log(error);
            }
        }
    }
    if (proof) {
        await burn(
            provider,
            programs,
            {
                proof: proof,
                pda: proofPda.address
            }
        );
    }
    await getUser(
        app,
        provider,
        programs
    );
}

function buildPlan(input: Input, program: Program<SRgbCraft>) {
    const redPixelSeeds = {
        r: 1,
        g: 0,
        b: 0,
        depth: 1
    };
    const redPixelPda = Pixel.derivePixelPda(
        program,
        redPixelSeeds
    );
    const greenPixelSeeds = {
        r: 0,
        g: 1,
        b: 0,
        depth: 1
    };
    const greenPixelPda = Pixel.derivePixelPda(
        program,
        greenPixelSeeds
    );
    const bluePixelSeeds = {
        r: 0,
        g: 0,
        b: 1,
        depth: 1
    };
    const bluePixelPda = Pixel.derivePixelPda(
        program,
        bluePixelSeeds
    );
    const yellowPixelSeeds = {
        r: 1,
        g: 1,
        b: 0,
        depth: 1
    };
    const yellowPixelPda = Pixel.derivePixelPda(
        program,
        yellowPixelSeeds
    );
    const magentaPixelSeeds = {
        r: 1,
        g: 0,
        b: 1,
        depth: 1
    };
    const magentaPixelPda = Pixel.derivePixelPda(
        program,
        magentaPixelSeeds
    );
    const cyanPixelSeeds = {
        r: 0,
        g: 1,
        b: 1,
        depth: 1
    };
    const cyanPixelPda = Pixel.derivePixelPda(
        program,
        cyanPixelSeeds
    );
    const whitePixelSeeds = {
        r: 1,
        g: 1,
        b: 1,
        depth: 1
    };
    const whitePixelPda = Pixel.derivePixelPda(
        program,
        whitePixelSeeds
    );
    let plan: Proof.Plan = {
        one: null,
        two: null,
        three: null,
        four: null,
        five: null,
        six: null,
        seven: null
    };
    plan = addToPlan(input.red, redPixelPda, plan);
    plan = addToPlan(input.green, greenPixelPda, plan);
    plan = addToPlan(input.blue, bluePixelPda, plan);
    plan = addToPlan(input.yellow, yellowPixelPda, plan);
    plan = addToPlan(input.magenta, magentaPixelPda, plan);
    plan = addToPlan(input.cyan, cyanPixelPda, plan);
    plan = addToPlan(input.white, whitePixelPda, plan);
    return plan
}


function addToPlan(number: number, pda: Pixel.PixelPda, plan: any): any {
    if (number == 0) {
    } else {
        const planMember = {
            amount: new BN(number),
            pda: pda.address
        }
        if (!plan.one) {
            plan.one = planMember
        } else if (!plan.two) {
            plan.two = planMember
        } else if (!plan.three) {
            plan.three = planMember
        } else if (!plan.four) {
            plan.four = planMember
        } else if (!plan.five) {
            plan.five = planMember
        } else if (!plan.six) {
            plan.six = planMember
        } else if (!plan.seven) {
            plan.seven = planMember
        }
    }
    return plan
}
