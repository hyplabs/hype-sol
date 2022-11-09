import { useCountProgram } from "../hooks/use_count_program";
import { web3 } from "@project-serum/anchor";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { Button } from "flowbite-react";
import { useEffect, useState } from "react";

const HomePage = () => {
  const { program } = useCountProgram();
  const anchorWallet = useAnchorWallet();
  const [curValue, setCurValue] = useState("n/a");
  const accountKeyPair = web3.Keypair.generate();

  const executeInit = async () => {
    if (!program || !anchorWallet) return;
    await program.methods
      .create()
      .accounts({
        baseAccount: accountKeyPair.publicKey,
        user: anchorWallet.publicKey,
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
        <Button className="w-32" onClick={getValue} disabled={!anchorWallet}>
          Get Value
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
