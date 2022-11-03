// Tests that interact with the program on-chain to verify it is functional.
import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Counter } from "../target/types/counter";

const assert = require("assert");
const { SystemProgram } = anchor.web3;
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const initCounter = async () => {
  // Initialize an account containing the count value and program, then return it's location
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.Counter as Program<Counter>;
  const accountKeyPair = anchor.web3.Keypair.generate();

  // Call the create function via RPC
  await program.rpc.create({
    accounts: {
      baseAccount: accountKeyPair.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId,
    },
    signers: [accountKeyPair],
  });

  // FIXME: should be using: await program.methods.create(...);
  // await program
  // .methods.create()
  // .accounts({
  //   baseAccount: accountKeyPair.publicKey,
  //   user: provider.wallet.publicKey,
  // })
  // .signers([accountKeyPair])

  return accountKeyPair;
};

const verifyAccountCounterIsN = async (
  program: anchor.Program<Counter>,
  accountKeyPair: anchor.web3.Keypair,
  expValue: Number
) => {
  // Fetch the account from it's publicKey and check the value of count
  const account = await program.account.baseAccount.fetch(
    accountKeyPair.publicKey
  );
  console.log("Count: ", account.count.toString());
  assert.ok(account.count.toNumber() === expValue);
};

describe("counter", () => {
  // Test suite

  // Init our interfaces
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.Counter as Program<Counter>;

  it("Create a counter)", async () => {
    // Call the create function and verify 0
    const accountKeyPair = await initCounter();
    await verifyAccountCounterIsN(program, accountKeyPair, 0);
  });

  it("Increment a counter)", async () => {
    // Call the create function, verify 0
    const accountKeyPair = await initCounter();
    await verifyAccountCounterIsN(program, accountKeyPair, 0);

    // Increment once, verify 1
    await program.rpc.increment({
      accounts: {
        baseAccount: accountKeyPair.publicKey,
      },
    });
    await verifyAccountCounterIsN(program, accountKeyPair, 1);

    // Increment once more, verify 2
    await delay(1000); // we have to wait otherwise we do what is essentialy a double spend attack.
    await program.rpc.increment({
      accounts: {
        baseAccount: accountKeyPair.publicKey,
      },
    });
    await verifyAccountCounterIsN(program, accountKeyPair, 2);
  });
});
