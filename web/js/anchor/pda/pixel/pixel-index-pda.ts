import {Pda} from "../pda";
import {PublicKey} from "@solana/web3.js";
import {BN, Program} from "@project-serum/anchor";
import {SRgb} from "../../idl/idl";
import {Palette} from "./palette-pda";


export interface PixelIndexPda extends Pda {
}

export interface PixelIndex {
    seeds: Seeds
    pixel: PublicKey
}

interface RawPixelIndex {
    seeds: RawSeeds
    pixel: PublicKey
}

export interface Seeds extends Seeds_ {
    index: number // decoded as bn
}

export interface RawSeeds extends Seeds_ {
    index: any // bn
}

interface Seeds_ {
    authority: PublicKey
    depth: number
}

export function toRaw(seeds: Seeds): RawSeeds {
    return {
        authority: seeds.authority,
        depth: seeds.depth,
        index: new BN(seeds.index)
    }
}

export async function getAllPixelIndexPda(program: Program<SRgb>, palette: Palette): Promise<PixelIndex[]> {
    const pdaArray = Array.from(new Array(palette.indexer), (_, i) =>
        derivePixelIndexPda(
            program,
            {
                authority: palette.seeds.authority,
                depth: palette.seeds.depth,
                index: i + 1
            }
        ).address
    );
    const fetched = (await program.account.pixelIndex.fetchMultiple(pdaArray)).filter(Boolean) as RawPixelIndex[];
    return fetched.map((obj) => {
            return {
                seeds: {
                    authority: obj.seeds.authority,
                    depth: obj.seeds.depth,
                    index: obj.seeds.index.toNumber()
                },
                pixel: obj.pixel
            } as PixelIndex
        }
    )
}

export async function getPixelIndexPda(program: Program<SRgb>, pda: PixelIndexPda): Promise<PixelIndex> {
    const fetched = await program.account.pixelIndex.fetch(
        pda.address
    ) as RawPixelIndex;
    return {
        seeds: {
            authority: fetched.seeds.authority,
            depth: fetched.seeds.depth,
            index: fetched.seeds.index.toNumber()
        },
        pixel: fetched.pixel
    }
}

export function derivePixelIndexPda(program: Program<SRgb>, seeds: Seeds): PixelIndexPda {
    let pda, bump;
    [pda, bump] = PublicKey.findProgramAddressSync(
        [
            Buffer.from(
                SEED + "/" + seeds.authority + "/" + seeds.depth + "/" + seeds.index
            )
        ],
        program.programId
    );
    return {
        address: pda,
        bump
    }
}

const SEED = "pixel-index";
