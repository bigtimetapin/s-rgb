import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
import { u8 } from "./config/keypair";
import { Connection, Keypair, PublicKey, SYSVAR_RENT_PUBKEY, SystemProgram } from "@solana/web3.js";
import { RPC_URL } from "./config/rpc";
import { AnchorProvider, Program } from "@project-serum/anchor";
import { IDL, SRgbCraft } from "./idl/craft";
import { Seeds, derivePixelPda, getPixelPda } from "./pda/pixel";

export async function run() {
  const keypair = Keypair.fromSecretKey(
    u8
  );
  const wallet = new NodeWallet(
    keypair
  );
  const connection = new Connection(
    RPC_URL,
    "processed"
  );
  const provider = new AnchorProvider(
    connection,
    wallet,
    AnchorProvider.defaultOptions()
  );
  const program = new Program<SRgbCraft>(
    IDL,
    CRAFTING_PROGRAM_ID,
    provider
  );
  const red = new PublicKey(
    "Bqy9tEH2TjeyGejp47hPf1oDyvF72BAnWwtFn6uB8heR"
  );
  await ix(
    red,
    {
      r: 1,
      g: 0,
      b: 0,
      depth: 1
    },
    program,
    provider
  );
}

async function ix(url: PublicKey, seeds: Seeds, program: Program<SRgbCraft>, provider: AnchorProvider): Promise<void> {
  const pixelPda = derivePixelPda(
    program,
    seeds
  );
  const pixel = await getPixelPda(
    program,
    pixelPda.address
  );
  let metadataPda, _;
  [metadataPda, _] = PublicKey.findProgramAddressSync(
    [
      Buffer.from(MPL_PREFIX),
      MPL_TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      pixel.mint.toBuffer()
    ],
    MPL_TOKEN_METADATA_PROGRAM_ID
  );
  await program
    .methods
    .addMetadata(
      url
    ).accounts(
      {
        pixel: pixelPda.address,
        pixelMint: pixel.mint,
        metadata: metadataPda,
        payer: provider.wallet.publicKey,
        metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
        rent: SYSVAR_RENT_PUBKEY
      }
    ).rpc()
}

// pda seeds
const MPL_PREFIX = "metadata";
// rgb program addresses
const CRAFTING_PROGRAM_ID = new PublicKey("G4Wm9es5xZoZLpyzoFHrtgM4Vmo84CenCSrCK6ZxDSmf");
// cpi program addresses
const MPL_TOKEN_METADATA_PROGRAM_ID = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");
