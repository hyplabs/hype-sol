import { Idl, ProgramAccount } from "@project-serum/anchor";
import { TypeDef } from "@project-serum/anchor/dist/cjs/program/namespace/types";
import { PublicKey } from "@solana/web3.js";

import idl from "../../../../programs/messaging/target/idl/messaging.json";
import {
  IDL,
  Messaging,
} from "../../../../programs/messaging/target/types/messaging";
import { useProgram } from "./use_program";

type Message = ProgramAccount<TypeDef<typeof IDL.accounts[0], Idl>>;
type User = TypeDef<typeof IDL.accounts[1], Idl>;

const useMessagingProgram = () => {
  return useProgram<Messaging>(
    IDL,
    new PublicKey(import.meta.env.VITE_PROGRAM_ID)
  );
};

export type { Message, User };
export { useMessagingProgram };
