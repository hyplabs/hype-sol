import counterIdl from "../../../target/idl/counter.json";
import { IDL, Counter } from "../../../target/types/counter";
import { useProgram } from "./use_program";
import { PublicKey } from "@solana/web3.js";

const programID = new PublicKey(counterIdl.metadata.address);
console.log('interacting with localnet program @:', counterIdl.metadata.address)

const useCountProgram = () => {
  return useProgram<Counter>(IDL, programID);
};

export { useCountProgram };
