import {Pda} from "../pda";
import {PublicKey} from "@solana/web3.js";
import {AnchorProvider, Program} from "@project-serum/anchor";
import {SRgbCraft} from "../../idl/craft";

export interface PalettePda extends Pda {
}

export interface Palette {
    seeds: Seeds
    indexer: number // decoded as bn
}

interface RawPalette {
    seeds: Seeds
    indexer: any // decoded as bn
}

export interface Seeds {
    authority: PublicKey
    depth: number
}

export async function getAllPalettePda(provider: AnchorProvider, program: Program<SRgbCraft>): Promise<Palette[]> {
    const pdaArray = Array.from(new Array(MAX_DEPTH), (_, i) =>
        derivePalettePda(
            program,
            {
                authority: provider.wallet.publicKey,
                depth: i + 1
            }
        ).address
    );
    const fetched = (await program.account.palette.fetchMultiple(pdaArray)).filter(Boolean) as RawPalette[];
    return fetched.map((obj) => {
            return {
                seeds: obj.seeds,
                indexer: obj.indexer.toNumber()
            } as Palette
        }
    )
}

export async function getPalettePda(program: Program<SRgbCraft>, pda: PalettePda): Promise<Palette> {
    const fetched = await program.account.palette.fetch(
        pda.address
    ) as RawPalette;
    return {
        seeds: fetched.seeds,
        indexer: fetched.indexer.toNumber()
    }
}

export function derivePalettePda(program: Program<SRgbCraft>, seeds: Seeds): PalettePda {
    let pda, bump;
    [pda, bump] = PublicKey.findProgramAddressSync(
        [
            Buffer.from(
                SEED
            ),
            seeds.authority.toBuffer(),
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

const SEED = "palette";

const MAX_DEPTH = 32;
