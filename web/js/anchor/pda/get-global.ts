import {AnchorProvider, Program, SplToken} from "@project-serum/anchor";
import {SRgb} from "../idl/idl";
import {Amount, Pool, getPools} from "./get-pools";
import * as Palette from "./pixel/palette-pda";
import * as Pixel from "./pixel/pixel-pda";
import * as PixelIndex from "./pixel/pixel-index-pda";
import {PublicKey} from "@solana/web3.js";

export interface User {
    wallet: PublicKey
    tvl: Amount
    pools: {
        red: Pool,
        green: Pool,
        blue: Pool
    }
    palette: {
        depth: number;
        pixels: Pixel.Pixel[]
    }[]
}

export async function getGlobal(
    app,
    provider: AnchorProvider,
    programs: {
        sRgb: Program<SRgb>,
        token: Program<SplToken>
    },
): Promise<void> {
    const pools = await getPools(
        provider,
        programs
    );
    const allPalettesPdas = await Palette.getAllPalettePda(
        provider,
        programs.sRgb
    );
    const allPalettes: { depth: number; pixels: Pixel.Pixel[] }[] = await Promise.all(
        allPalettesPdas.map(async (palette) => {
                const allPixelIndexArray = await PixelIndex.getAllPixelIndexPda(
                    programs.sRgb,
                    palette
                );
                const allPixelMintAddresses = allPixelIndexArray.map(pixelIndex =>
                    pixelIndex.pixel
                );
                const allPixelArray = await Pixel.getManyPixelPda(
                    provider,
                    programs,
                    allPixelMintAddresses
                );
                return {
                    depth: palette.seeds.depth,
                    pixels: allPixelArray
                }
            }
        )
    );
    const user = {
        wallet: provider.wallet.publicKey,
        tvl: pools.tvl,
        pools: pools.pools,
        palette: allPalettes
    } as User;
    app.ports.success.send(
        JSON.stringify(
            {
                listener: "global-found-user",
                more: JSON.stringify(
                    user
                )
            }
        )
    );
}
