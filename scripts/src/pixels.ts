import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
import { ShadowFile } from "@shadow-drive/sdk";
import * as fs from "fs/promises";
import * as path from "path";
import { u8 } from "./config/keypair";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import * as ShadowDrive from "./shdw";

export async function run() {
  const red = await read(
    "red.jpeg"
  );
  const keypair = Keypair.fromSecretKey(
    u8
  );
  const wallet = new NodeWallet(
    keypair
  );
  const drive = await ShadowDrive.provision(
    wallet,
    red.file.byteLength
  );
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
  await delay(5000);
  await ShadowDrive.uploadMultipleFiles(
    [red],
    drive.drive,
    drive.account
  );
  const url = ShadowDrive.buildUrl(
    drive.account
  );
  console.log(drive);
  console.log(url);
}

async function read(name: string): Promise<ShadowFile> {
  const buffer = await fs.readFile(rel(name));
  return {
    name,
    file: buffer
  }
}

function rel(name: string): string {
  return path.join(__dirname, "..", "images", name)
}
