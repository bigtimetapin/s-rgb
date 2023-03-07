import {AnchorProvider, Program, SplToken} from "@project-serum/anchor";
import {Amount, Pool, getPools} from "./get-pools";
import * as Palette from "./craft/palette-pda";
import * as Pixel from "./craft/pixel-pda";
import * as PixelIndex from "./craft/pixel-index-pda";
import * as Proof from "./paint/proof-pda";
import * as ProofIndex from "./paint/proof-index-pda";
import * as ProofIndexer from "./paint/proof-indexer-pda";
import {SRgbStake} from "../idl/stake";
import {SRgbCraft} from "../idl/craft";
import {SRgbPaint} from "../idl/paint";
import {buildUrl} from "../../shdw";
import {PublicKey} from "@solana/web3.js";

export interface User {
    wallet: string // pubkey
    tvl: Amount
    pools: {
        red: Pool,
        green: Pool,
        blue: Pool
    }
    palette: Palette_
    nfts: Nfts
}

type Palette_ = {
    depth: number;
    pixels: Pixel.Pixel[]
}[]

type Nfts = {
    nft: {
        url: string
        mint: PublicKey
    }
    burned: {
        burned: boolean
        plan: Proof.Plan
    }
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
    const nfts = await getNFts(
        provider,
        programs.paint
    );
    const user = {
        wallet: provider.wallet.publicKey.toString(),
        tvl: pools.tvl,
        pools: pools.pools,
        palette: palette,
        nfts: nfts
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

export async function getNFts(
    provider: AnchorProvider,
    program: Program<SRgbPaint>
): Promise<Nfts> {
    const proofIndexerPda = ProofIndexer.derive(
        provider,
        program
    );
    let nfts: Nfts;
    try {
        const proofIndexer = await ProofIndexer.get(
            program,
            proofIndexerPda
        );
        const indexes = await ProofIndex.getAll(
            provider,
            program,
            proofIndexer
        );
        const proofs = await Proof.getMany(
            program,
            indexes.map(i => i.proof)
        );
        console.log(proofs);
        nfts = proofs.map(p => {
                const url = buildUrl(p.nft.url) + "s-rgb.jpeg";
                console.log(url);
                return {
                    nft: {
                        url: url,
                        mint: p.nft.mint
                    },
                    burned: p.burned
                }
            }
        )
    } catch (error) {
        console.log(error);
        nfts = []
    }
    return nfts
}
