import {AnchorProvider, Program, SplToken} from "@project-serum/anchor";
import {PublicKey} from "@solana/web3.js";
import {SRgb} from "../../idl/idl";
import {Pda} from "../pda";
import {deriveAtaPda, getManyTokenAccount, getTokenAccount} from "../ata-pda";

export interface PixelPda extends Pda {
}

export interface Pixel extends RawPixel {
    balance: number
}

interface RawPixel {
    seeds: Seeds
    mint: PublicKey
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
    const fetched = (await programs.sRgb.account.pixel.fetchMultiple(
        pdaArray
    )).filter(Boolean) as RawPixel[];
    const ataArray = fetched.map(obj =>
        deriveAtaPda(
            provider.wallet.publicKey,
            obj.mint
        )
    );
    const tokenAccounts = await getManyTokenAccount(
        programs.token,
        ataArray
    );
    return fetched.map((rawPixel) => {
            const found = tokenAccounts.find(
                ta => ta.mint.equals(rawPixel.mint)
            );
            return {
                seeds: rawPixel.seeds,
                mint: rawPixel.mint,
                balance: found.amount
            } as Pixel
        }
    )
}

export async function getPixelPda(
    provider: AnchorProvider,
    programs: {
        sRgb: Program<SRgb>;
        token: Program<SplToken>
    },
    pda: PixelPda): Promise<Pixel> {
    const fetched = await programs.sRgb.account.pixel.fetch(
        pda.address
    ) as RawPixel;
    const ata = deriveAtaPda(
        provider.wallet.publicKey,
        fetched.mint
    );
    let balance;
    try {
        const tokenAccount = await getTokenAccount(
            programs.token,
            ata
        );
        balance = tokenAccount.amount
    } catch (error) {
        console.log(error);
        balance = 0;
    }
    return {
        seeds: fetched.seeds,
        mint: fetched.mint,
        balance: balance
    }
}

export function derivePixelPda(program: Program<SRgb>, seeds: Seeds): PixelPda {
    let pda, bump;
    [pda, bump] = PublicKey.findProgramAddressSync(
        [
            Buffer.from(
                SEED
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

const SEED = "pixel";
