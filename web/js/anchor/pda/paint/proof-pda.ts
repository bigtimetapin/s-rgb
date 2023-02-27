import {Pda} from "../pda";
import {Program} from "@project-serum/anchor";
import {SRgb} from "../../idl/idl";

export interface ProofPda extends Pda {
}

export interface Proof {
    burned: {
        red: number // decoded as bn
        green: number // decoded as bn
        blue: number // decoded as bn
        yellow: number // decoded as bn
        magenta: number // decoded as bn
        cyan: number // decoded as bn
        white: number // decoded as bn
    }
}

export function derive(program: Program<SRgb>): ProofPda {

}

const SEED = "proof";
