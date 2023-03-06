import {Connection, PublicKey} from "@solana/web3.js";
import {ShdwDrive} from "@shadow-drive/sdk";
import {version} from "./config";

export async function buildClient(connection: any, uploader: any): Promise<ShdwDrive> {
    console.log("build shdw client with finalized commitment");
    // build connection with finalized commitment for initial account creation
    const finalizedConnection = new Connection(
        connection.rpcEndpoint,
        "finalized"
    );
    return await new ShdwDrive(
        finalizedConnection,
        uploader
    ).init();
}

export async function provision(
    connection: any,
    uploader: any,
    fileSize: number
): Promise<{ drive: ShdwDrive, account: PublicKey }> {
    // build drive client
    const drive = await buildClient(
        connection,
        uploader
    );
    // create storage account
    console.log("create shdw storage account");
    const size = (((fileSize / 1000000) + 2).toString()).split(".")[0] + "MB";
    console.log(size);
    const createStorageResponse = await drive.createStorageAccount(
        "s-rgb",
        size,
        version
    );
    const account = new PublicKey(
        createStorageResponse.shdw_bucket
    );
    return {drive, account}
}

export async function markAsImmutable(drive: ShdwDrive, account: PublicKey): Promise<void> {
    console.log("mark account as immutable");
    // time out for 1 second to give RPC time to resolve account
    await new Promise(r => setTimeout(r, 1000));
    await drive.makeStorageImmutable(account, version);
}

export async function uploadMultipleFiles(files: File[], drive: ShdwDrive, account: PublicKey): Promise<void> {
    console.log("uploading multiple files to shdw drive");
    await drive.uploadMultipleFiles(account, files as any)
}

export async function uploadFile(file: File, drive: ShdwDrive, account: PublicKey): Promise<void> {
    console.log("upload file to shdw drive");
    await drive.uploadFile(account, file);
}

export function buildUrl(account: PublicKey): string {
    const base = "https://shdw-drive.genesysgo.net/";
    return base + account.toString() + "/"
}