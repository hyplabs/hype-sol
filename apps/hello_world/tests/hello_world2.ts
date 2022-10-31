import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { HelloWorld2 } from "../target/types/hello_world2";

describe("hello_world2", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.HelloWorld2 as Program<HelloWorld2>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
