import {Pda} from "../pda";
import * as Pixel from "./pixel-pda";
import {Program} from "@project-serum/anchor";
import {SRgb} from "../../idl/idl";
import {PublicKey} from "@solana/web3.js";

export interface PixelIndexLookupPda extends Pda {
}

export interface PixelIndexLookup {
    seeds: Seeds
    index: number // encoded as bn
}

export interface Seeds extends Pixel.Seeds {
    authority: PublicKey
}

export async function getPixelIndexLookupPda(program: Program<SRgb>, pda: PixelIndexLookupPda): Promise<PixelIndexLookup> {
    const fetched = await program.account.pixelIndexLookup.fetch(
        pda.address
    ) as any;
    return {
        seeds: fetched.seeds,
        index: fetched.index.toNumber()
    }
}

export function derivePixelIndexLookupPda(program: Program<SRgb>, seeds: Seeds): PixelIndexLookupPda {
    let pda, bump;
    [pda, bump] = PublicKey.findProgramAddressSync(
        [
            Buffer.from(
                SEED
            ),
            seeds.authority.toBuffer(
            ),
            Buffer.from(
                seeds.r.toString()
            ),
            Buffer.from(
                seeds.g.toString()
            ),
            Buffer.from(
                seeds.b.toString()
            ),
            Buffer.from(
                seeds.depth.toString()
            )
        ],
        program.programId
    );
    return {
        address: pda,
        bump
    }
}


const SEED = "pixel-index-lookup";
