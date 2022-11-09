import idl from "../../../target/idl/counter.json";
import { IDL, Counter } from "../../../target/types/counter";
import { web3, Program, AnchorProvider } from "@project-serum/anchor";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { PublicKey, ConfirmOptions } from "@solana/web3.js";
import { Button } from "flowbite-react";
import { useMemo, useState } from "react";

type Nullable<T> = T | null;

const HomePage = () => {
  // Inits
  const wallet = useAnchorWallet();
  const { connection } = useConnection();
  const [curValue, setCurValue] = useState("n/a");
  const [program, setProgram] = useState<Nullable<Program<Counter>>>(null);
  const accountKeyPair = web3.Keypair.generate();

  // Create an account
  const programID = new PublicKey(idl.metadata.address);

  // Create a program using the connection provider
  useMemo(() => {
    const getProvider = () => {
      if (!wallet || !connection) return;
      const opts = { preflightCommitment: "processed" } as ConfirmOptions;
      const provider = new AnchorProvider(connection, wallet, opts);
      return provider;
    };
    const provider = getProvider();
    if (!provider) return;
    setProgram(new Program(IDL, programID, provider));
  }, [wallet, connection]);

  const executeInit = async () => {
    if (!program || !wallet) return;
    // FIXME: "failed to send transaction: Transaction simulation failed: Attempt to load a program that does not exist"
    await program.methods
      .create()
      .accounts({
        baseAccount: accountKeyPair.publicKey,
        user: wallet.publicKey,
        systemProgram: web3.SystemProgram.programId,
      })
      .signers([accountKeyPair])
      .rpc();
  };

  // Increment
  const executeIncrement = async () => {
    if (!program) return;
    await program.methods
      .increment()
      .accounts({
        baseAccount: accountKeyPair.publicKey,
      })
      .signers([accountKeyPair])
      .rpc();
  };

  // Get Value
  const getValue = async () => {
    if (!program) return;
    const curAccount = await program.account.baseAccount.fetch(
      accountKeyPair.publicKey
    );
    setCurValue(curAccount.count.toString());
  };

  return (
    <div className="max-w-xl mx-auto space-y-8 bg-gray-100 p-8 rounded-lg">
      <div className="font-extrabold">The Counting Machine</div>
      <div className="flex space-x-4 p-4 justify-center bg-green-200 text-green-800 rounded-lg">
        <div className="font-bold italic">cur value:</div>
        <div className=" font-mono">
          {wallet ? curValue : "Please connect wallet ^"}
        </div>
      </div>
      <div className="flex space-x-8 justify-center">
        <Button className="w-32" onClick={executeInit} disabled={!wallet}>
          Init
        </Button>
        <Button className="w-32" onClick={executeIncrement} disabled={!wallet}>
          Increment
        </Button>
        <Button className="w-32" onClick={getValue} disabled={!wallet}>
          Get Value
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
