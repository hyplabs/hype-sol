import * as anchor from "@project-serum/anchor";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { useMemo } from "react";

interface Program<T extends anchor.Idl> {
  program?: anchor.Program<T>;
}

const opts: anchor.web3.ConfirmOptions = {
  preflightCommitment: "confirmed",
};

const useProgram = <T extends anchor.Idl>(
  idl: anchor.Idl,
  programId: anchor.Address
): Program<T> => {
  const anchorWallet = useAnchorWallet();
  const { connection } = useConnection();
  return useMemo(() => {
    if (anchorWallet) {
      // same as an Eth Provider like Infura etc.
      const provider = new anchor.AnchorProvider(
        connection,
        anchorWallet,
        opts
      );
      // analog of Contract(abi,address,provider)
      const program = new anchor.Program(
        idl,
        programId,
        provider
      ) as anchor.Program<T>;
      return { program };
    }
    // without a wallet we can't get the Program from the
    // blockchain
    return {};
  }, [anchorWallet]);
};

export { useProgram };
