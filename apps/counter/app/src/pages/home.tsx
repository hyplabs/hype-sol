import { useCountProgram } from "../hooks/use_count_program";
import { web3 } from "@project-serum/anchor";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";

const HomePage = () => {
  const { program } = useCountProgram(); // FIXME: fails to initialize
  const anchorWallet = useAnchorWallet();
  const [curValue, setCurValue] = useState("n/a");

  const accountKeyPair = web3.Keypair.generate();

  // Init a counter.
  useEffect(() => {
    if (!program || !anchorWallet) return;

    const initCounter = async () => {
      await program.methods
        .create()
        .accounts({
          baseAccount: accountKeyPair.publicKey,
          user: anchorWallet.publicKey,
        })
        .signers([accountKeyPair])
        .rpc();
    };
    initCounter();
  }, [program, anchorWallet]);

  if (program) {
    return <div> hi</div>;
  }

  return <div className="text-black bg-purple-500">{curValue}</div>;
};

export default HomePage;
