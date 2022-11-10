import idl from "../../../target/idl/counter.json";
import { IDL, Counter } from "../../../target/types/counter";
import { web3, Program, AnchorProvider } from "@project-serum/anchor";
import { useWallet } from "@solana/wallet-adapter-react";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { PublicKey, ConfirmOptions, Keypair } from "@solana/web3.js";
import { Button } from "flowbite-react";
import { useMemo, useState } from "react";

type Nullable<T> = T | null;

const HomePage = () => {
  // Inits
  const anchorWallet = useAnchorWallet();
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [curValue, setCurValue] = useState("n/a");
  const [program, setProgram] = useState<Nullable<Program<Counter>>>(null);
  const [accountKeyPair, setAccountKeyPair] = useState<Nullable<Keypair>>(null);

  // Load the program ID from the IDL file.
  const programID = new PublicKey(idl.metadata.address);

  // Create a program interface ASAP
  useMemo(() => {
    if (!anchorWallet) return;
    const opts = { preflightCommitment: "confirmed" } as ConfirmOptions;
    const provider = new AnchorProvider(connection, anchorWallet, opts);
    setProgram(new Program(IDL, programID, provider));
  }, [anchorWallet]);

  // Init
  const executeInit = async () => {
    if (!program || !publicKey) return;
    const _accountKeyPair = web3.Keypair.generate();
    setAccountKeyPair(_accountKeyPair);
    await program.methods
      .create()
      .accounts({
        baseAccount: _accountKeyPair.publicKey,
        user: publicKey,
      })
      .signers([_accountKeyPair])
      .rpc();
  };

  // Increment
  const executeIncrement = async () => {
    if (!program || !accountKeyPair) return;
    await program.methods
      .increment()
      .accounts({
        baseAccount: accountKeyPair.publicKey,
      })
      .rpc();
    getCount();
  };

  // Get Value
  const getCount = async () => {
    if (!program || !accountKeyPair) return;
    const curAccount = await program.account.baseAccount.fetch(
      accountKeyPair.publicKey
    );
    setCurValue(curAccount.count.toString());
  };

  // Simple FE
  return (
    <div className="max-w-xl mx-auto space-y-8 bg-gray-100 p-8 rounded-lg">
      <div className="font-extrabold">The Counting Machine</div>
      <div className="flex space-x-4 p-4 justify-center bg-green-200 text-green-800 rounded-lg">
        <div className="font-bold italic">cur value:</div>
        <div className=" font-mono">
          {anchorWallet ? curValue : "Please connect wallet ^"}
        </div>
      </div>
      <div className="flex space-x-8 justify-center">
        <Button className="w-32" onClick={executeInit} disabled={!anchorWallet}>
          Init
        </Button>
        <Button
          className="w-32"
          onClick={executeIncrement}
          disabled={!anchorWallet}
        >
          Increment
        </Button>
        <Button className="w-32" onClick={getCount} disabled={!anchorWallet}>
          Get Count
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
