import { Connection, PublicKey } from "@solana/web3.js";
import { ShadowFile, ShdwDrive } from "@shadow-drive/sdk";
import { version } from "./config";
import { RPC_URL } from "../config/rpc";

export async function buildClient(wallet: any): Promise<ShdwDrive> {
  console.log("build shdw client with finalized commitment");
  // build connection with finalized commitment for initial account creation
  const finalizedConnection = new Connection(
    RPC_URL,
    "finalized"
  );
  return await new ShdwDrive(
    finalizedConnection,
    wallet
  ).init();
}

export async function provision(
  wallet: any,
  bytes: number
): Promise<{ drive: ShdwDrive, account: PublicKey }> {
  // build drive client
  const drive = await buildClient(
    wallet
  );
  // create storage account
  console.log("create shdw storage account");
  const size = (((bytes / 1000000) + 2).toString()).split(".")[0] + "MB";
  console.log(size);
  const createStorageResponse = await drive.createStorageAccount(
    "s-rgb",
    size,
    version
  );
  const account = new PublicKey(
    createStorageResponse.shdw_bucket
  );
  return { drive, account }
}

export async function uploadMultipleFiles(files: ShadowFile[], drive: ShdwDrive, account: PublicKey): Promise<void> {
  console.log("uploading multiple files to shdw drive");
  await drive.uploadMultipleFiles(account, files as any)
}

export function buildUrl(account: PublicKey): string {
  const base = "https://shdw-drive.genesysgo.net/";
  return base + account.toString() + "/"
}
