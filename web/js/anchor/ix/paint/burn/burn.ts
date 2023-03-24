import {AnchorProvider, Program, SplToken} from "@project-serum/anchor";
import {SRgbStake} from "../../../idl/stake";
import {SRgbCraft} from "../../../idl/craft";
import {SRgbPaint} from "../../../idl/paint";
import {PublicKey} from "@solana/web3.js";
import * as Proof from "../../../pda/paint/proof-pda";
import * as BurnOne from "./one";
import * as BurnTwo from "./two";
import * as BurnThree from "./three";
import * as BurnFour from "./four";
import * as BurnFive from "./five";
import * as BurnSix from "./six";
import * as BurnSeven from "./seven";

export async function burn(
    provider: AnchorProvider,
    programs: {
        stake: Program<SRgbStake>;
        craft: Program<SRgbCraft>;
        paint: Program<SRgbPaint>;
        token: Program<SplToken>
    },
    proof: {
        pda: PublicKey,
        proof: Proof.Proof
    }
): Promise<void> {
    if (proof.proof.arity == 1) {
        await BurnOne.ix(
            provider,
            programs,
            proof
        );
    } else if (proof.proof.arity == 2) {
        await BurnTwo.ix(
            provider,
            programs,
            proof
        );
    } else if (proof.proof.arity == 3) {
        await BurnThree.ix(
            provider,
            programs,
            proof
        );
    } else if (proof.proof.arity == 4) {
        await BurnFour.ix(
            provider,
            programs,
            proof
        );
    } else if (proof.proof.arity == 5) {
        await BurnFive.ix(
            provider,
            programs,
            proof
        );
    } else if (proof.proof.arity == 6) {
        await BurnSix.ix(
            provider,
            programs,
            proof
        );
    } else if (proof.proof.arity == 7) {
        await BurnSeven.ix(
            provider,
            programs,
            proof
        );
    }
}
