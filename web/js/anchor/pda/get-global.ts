import {AnchorProvider, Program, SplToken} from "@project-serum/anchor";
import {Amount, Pool, getPools} from "./get-pools";
import * as Palette from "./craft/palette-pda";
import * as Pixel from "./craft/pixel-pda";
import * as PixelIndex from "./craft/pixel-index-pda";
import {SRgbStake} from "../idl/stake";
import {SRgbCraft} from "../idl/craft";
import {SRgbPaint} from "../idl/paint";

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
        stake: Program<SRgbStake>;
        craft: Program<SRgbCraft>;
        paint: Program<SRgbPaint>;
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
    console.log(palette);
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
        stake: Program<SRgbStake>;
        craft: Program<SRgbCraft>;
        paint: Program<SRgbPaint>;
        token: Program<SplToken>
    }
): Promise<Palette_> {
    const allPalettesPdas = await Palette.getAllPalettePda(
        provider,
        programs.craft
    );
    return await Promise.all(
        allPalettesPdas.map(async (palette) => {
                const allPixelIndexArray = await PixelIndex.getAllPixelIndexPda(
                    programs.craft,
                    palette
                );
                console.log(allPixelIndexArray);
                const allPixelMintAddresses = allPixelIndexArray.map(pixelIndex =>
                    pixelIndex.pixel
                );
                const allPixelArray = await Pixel.getManyPixelPda(
                    provider,
                    programs,
                    allPixelMintAddresses
                );
                console.log(allPixelArray);
                return {
                    depth: palette.seeds.depth,
                    pixels: allPixelArray
                }
            }
        )
    );
}
