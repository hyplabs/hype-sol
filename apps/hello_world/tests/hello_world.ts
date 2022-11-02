// Tests that interact with the program on-chain to verify it is functional.
import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { HelloWorld } from "../target/types/hello_world";

describe("hello_world", () => {
  // Create the provider based on the configured environment (in a web-client this would be the user's solana wallet).
  anchor.setProvider(anchor.AnchorProvider.env());

  // The program is an abstraction that combines the Provider, idl, and the programID
  const program = anchor.workspace.HelloWorld as Program<HelloWorld>;

  it("Is initialized!", async () => {

    // Execute the initialize() program on-chain
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
