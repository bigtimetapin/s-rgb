import { PublicKey } from "@solana/web3.js";
import { Program } from "@project-serum/anchor";
import { SRgbCraft } from "../idl/craft";

export interface PixelPda {
  address: PublicKey,
  bump: number
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

export async function getPixelPda(
  program: Program<SRgbCraft>,
  pda: PublicKey
): Promise<Pixel> {
  return await program.account.pixel.fetch(
    pda
  ) as Pixel
}

export function derivePixelPda(program: Program<SRgbCraft>, seeds: Seeds): PixelPda {
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
