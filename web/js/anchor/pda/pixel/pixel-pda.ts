import {Program} from "@project-serum/anchor";
import {PublicKey} from "@solana/web3.js";
import {SRgb} from "../../idl/idl";
import {Pda} from "../pda";

export interface PixelPda extends Pda {
}

export interface Pixel {
    seeds: Seeds
    mint: PublicKey
}

export interface Seeds {
    r: number
    g: number
    b: number
    depth: number
}

export async function getPixelPda(program: Program<SRgb>, pda: PixelPda): Promise<Pixel> {
    return await program.account.pixel.fetch(
        pda.address
    ) as Pixel
}

export function derivePixelPda(program: Program<SRgb>, seeds: Seeds): PixelPda {
    let pda, bump;
    let seed = `"${SEED}/r${seeds.r}/g${seeds.g}/b${seeds.b}/d${seeds.depth}"`;
    console.log(seed);
    [pda, bump] = PublicKey.findProgramAddressSync(
        [
            Buffer.from(
                `"${SEED}/r${seeds.r}/g${seeds.g}/b${seeds.b}/d${seeds.depth}"`
            )
        ],
        program.programId
    );
    console.log(pda.toString());
    return {
        address: pda,
        bump
    }
}

const SEED = "pixel";
