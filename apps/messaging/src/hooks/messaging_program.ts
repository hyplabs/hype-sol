import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { Messaging } from "../../../../programs/messaging/target/types/messaging";
import idl from "../../../../programs/messaging/target/idl/messaging.json";
import * as anchor from "@project-serum/anchor";
import { useMemo } from "react";
import { PublicKey } from "@solana/web3.js";

interface MessagingProgram {
  program?: anchor.Program<Messaging>;
}

const useMessagingProgram = (): MessagingProgram => {
  const anchorWallet = useAnchorWallet();
  const connection = useConnection();

  return useMemo(() => {
    if (anchorWallet) {
      const provider = new anchor.AnchorProvider(
        connection.connection,
        anchorWallet,
        { preflightCommitment: "confirmed" }
      );
      const program = new anchor.Program(
        idl as anchor.Idl,
        new PublicKey(idl.metadata.address),
        provider
      ) as unknown as anchor.Program<Messaging>;

      return { program };
    }

    return {};
  }, [anchorWallet]);
};

export { useMessagingProgram };
