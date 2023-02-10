import {AnchorProvider, Program, SplToken} from "@project-serum/anchor";
import {SRgb} from "../idl/idl";
import {Amount, Pool, getPools} from "./get-pools";
import * as Palette from "./pixel/palette-pda";
import * as Pixel from "./pixel/pixel-pda";
import * as PixelIndex from "./pixel/pixel-index-pda";

export interface User {
    wallet: string // pubkey
    tvl: Amount
    pools: {
        red: Pool,
        green: Pool,
        blue: Pool
    }
    palette: Palette_
}

type Palette_ = {
    depth: number;
    pixels: Pixel.Pixel[]
}[]

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
    const palette = await getPalette(
        provider,
        programs
    );
    const user = {
        wallet: provider.wallet.publicKey.toString(),
        tvl: pools.tvl,
        pools: pools.pools,
        palette: palette
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

export async function getPalette(
    provider: AnchorProvider,
    programs: {
        sRgb: Program<SRgb>,
        token: Program<SplToken>
    }
): Promise<Palette_> {
    const allPalettesPdas = await Palette.getAllPalettePda(
        provider,
        programs.sRgb
    );
    return await Promise.all(
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
}
