import {AnchorProvider, Program, SplToken} from "@project-serum/anchor";
import {PublicKey} from "@solana/web3.js";
import {SRgb} from "../../idl/idl";
import {Pda} from "../pda";
import {deriveAtaPda, getTokenAccount} from "../ata-pda";

export interface PixelPda extends Pda {
}

export interface Pixel {
    seeds: Seeds
    mint: PublicKey
    balance: number
}

export interface Seeds {
    r: number
    g: number
    b: number
    depth: number
}

export async function getManyPixelPda(
    provider: AnchorProvider,
    programs: {
        sRgb: Program<SRgb>;
        token: Program<SplToken>
    },
    pdaArray: PublicKey[]
): Promise<Pixel[]> {
    const fetched = (await programs.sRgb.account.pixel.fetchMultiple(pdaArray)).filter(Boolean) as any[]
    return Promise.all(
        fetched.map(async (obj) => {
                const ata = deriveAtaPda(
                    provider.wallet.publicKey,
                    obj.mint
                );
                const tokenAccount = await getTokenAccount(
                    programs.token,
                    ata
                );
                return {
                    seeds: obj.seeds,
                    mint: obj.mint,
                    balance: tokenAccount.amount
                } as Pixel
            }
        )
    )
}

export async function getPixelPda(program: Program<SRgb>, pda: PixelPda): Promise<Pixel> {
    return await program.account.pixel.fetch(
        pda.address
    ) as Pixel
}

export function derivePixelPda(program: Program<SRgb>, seeds: Seeds): PixelPda {
    let pda, bump;
    [pda, bump] = PublicKey.findProgramAddressSync(
        [
            Buffer.from(
                SEED + "/r" + seeds.r + "/g" + seeds.g + "/b" + seeds.b + "/d" + seeds.depth
            )
        ],
        program.programId
    );
    return {
        address: pda,
        bump
    }
}

const SEED = "pixel";
