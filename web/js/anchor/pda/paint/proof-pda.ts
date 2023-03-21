import {Pda} from "../pda";
import {Program} from "@project-serum/anchor";
import {PublicKey} from "@solana/web3.js";
import {SRgbPaint} from "../../idl/paint";

export interface ProofPda extends Pda {
}

export interface Proof {
    arity: number
    nft: {
        mint: PublicKey
        url: PublicKey
    }
    burned: {
        burned: boolean
        plan: Plan
    }
}

export interface Plan {
    one: PlanMember | null
    two: PlanMember | null
    three: PlanMember | null
    four: PlanMember | null
    five: PlanMember | null
    six: PlanMember | null
    seven: PlanMember | null
}

export interface PlanMember {
    pda: PublicKey
    amount: number // decoded as bn
}

export async function getMany(program: Program<SRgbPaint>, pdaArray: PublicKey[]): Promise<Proof[]> {
    const fetched = (await program.account.proof.fetchMultiple(
        pdaArray
    )).filter(Boolean) as any[];
    return fetched.map(obj =>
        fromObj(obj)
    )
}

export async function get(program: Program<SRgbPaint>, pda: PublicKey): Promise<Proof> {
    console.log(pda.toString());
    const fetched = await program.account.proof.fetch(
        pda
    );
    console.log(fetched);
    return fromObj(
        fetched
    )
}

export function derive(program: Program<SRgbPaint>, mint: PublicKey): ProofPda {
    let pda, bump;
    [pda, bump] = PublicKey.findProgramAddressSync(
        [
            Buffer.from(SEED),
            mint.toBuffer()
        ],
        program.programId
    );
    return {
        address: pda,
        bump
    }
}

function fromObj(obj: any): Proof {
    return {
        arity: obj.arity,
        nft: {
            mint: obj.nft.mint,
            url: obj.nft.url
        },
        burned: {
            burned: obj.burned.burned,
            plan: {
                one: planMemberFromObj(obj.burned.plan.one),
                two: planMemberFromObj(obj.burned.plan.two),
                three: planMemberFromObj(obj.burned.plan.three),
                four: planMemberFromObj(obj.burned.plan.four),
                five: planMemberFromObj(obj.burned.plan.five),
                six: planMemberFromObj(obj.burned.plan.six),
                seven: planMemberFromObj(obj.burned.plan.seven),
            }
        }
    } as Proof
}

function planMemberFromObj(obj: any): PlanMember | null {
    let planMember: PlanMember | null;
    if (obj) {
        planMember = {
            pda: obj.pda,
            amount: obj.amount.toNumber()
        }
    }
    return planMember
}

const SEED = "proof";
