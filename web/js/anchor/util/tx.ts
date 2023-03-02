import {Signer, Transaction, TransactionInstruction} from "@solana/web3.js";
import {AnchorProvider} from "@project-serum/anchor";

export async function buildTxForMany(
    provider: AnchorProvider,
    ix: TransactionInstruction,
    signers: Signer[]
): Promise<{
    signers: Signer[];
    tx: Transaction
}> {
    const latest = await provider.connection.getLatestBlockhash(
    );
    const tx = new Transaction(
        {
            recentBlockhash: latest.blockhash,
            feePayer: provider.wallet.publicKey
        }
    );
    tx.add(
        ix
    );
    return {
        tx: tx,
        signers
    };
}
