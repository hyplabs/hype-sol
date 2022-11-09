import * as anchor from "@project-serum/anchor";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { useMemo } from "react";

interface Program<T extends anchor.Idl> {
  program?: anchor.Program<T>;
}

const opts: anchor.web3.ConfirmOptions = {
  preflightCommitment: "processed",
};

const useProgram = <T extends anchor.Idl>(
  idl: anchor.Idl,
  programId: anchor.Address
): Program<T> => {
  const anchorWallet = useAnchorWallet();
  const { connection } = useConnection();

  return useMemo(() => {
    if (anchorWallet) {
      const provider = new anchor.AnchorProvider(
        connection,
        anchorWallet,
        opts
      );
      const program = new anchor.Program(
        idl,
        programId,
        provider
      ) as anchor.Program<T>;

      return { program };
    }

    return {};
  }, [anchorWallet]);
};

export { useProgram };
