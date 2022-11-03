import * as anchor from "@project-serum/anchor";
import { useWallet } from "@solana/wallet-adapter-react";
import { Keypair, PublicKey } from "@solana/web3.js";
import { Button } from "flowbite-react";
import { useEffect, useState } from "react";

import Inbox from "../components/messaging/inbox";
import Register from "../components/messaging/register";
import {
  Message,
  User,
  useMessagingProgram,
} from "../hooks/use_messaging_program";

const HomePage = () => {
  const wallet = useWallet();
  const messagingProgram = useMessagingProgram();

  const getPDA = async (
    seed: string,
    publicKey: PublicKey,
    programId: PublicKey
  ) => {
    const [pda] = await PublicKey.findProgramAddress(
      [anchor.utils.bytes.utf8.encode(seed), publicKey.toBuffer()],
      programId
    );

    return pda;
  };

  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const getUser = async () => {
    if (wallet.publicKey && messagingProgram.program) {
      messagingProgram.program.provider.publicKey;
      const userPublicKey = await getPDA(
        "user",
        wallet.publicKey,
        messagingProgram.program.programId
      );

      try {
        setUser(
          await messagingProgram.program.account.user.fetch(userPublicKey)
        );
      } catch (error) {
        setUser(null);
      }
    }
  };

  const registerUser = async () => {
    if (wallet.publicKey && messagingProgram.program) {
      const userPublicKey = await getPDA(
        "user",
        wallet.publicKey,
        messagingProgram.program.programId
      );

      await messagingProgram.program.methods
        .registerUser()
        .accounts({ user: userPublicKey, owner: wallet.publicKey })
        .rpc();

      await getUser();
    }
  };

  const deleteUser = async () => {
    if (wallet.publicKey && messagingProgram.program) {
      const userPublicKey = await getPDA(
        "user",
        wallet.publicKey,
        messagingProgram.program.programId
      );

      await messagingProgram.program.methods
        .deleteUser()
        .accounts({ user: userPublicKey, owner: wallet.publicKey })
        .rpc();

      await getUser();
    }
  };

  const getMessages = async () => {
    if (wallet.publicKey && messagingProgram.program) {
      try {
        // const fromMeToYou =
        //   wallet.publicKey.toBase58() + wallet.publicKey.toBase58();
        // const myMessages = await messagingProgram.program.account.message.all([
        //   { memcmp: { offset: 8, bytes: fromMeToYou } },
        // ]);
        // const fromYouToMe =
        //   wallet.publicKey.toBase58() + wallet.publicKey.toBase58();
        // const yourMessages = await messagingProgram.program.account.message.all(
        //   [{ memcmp: { offset: 8, bytes: fromYouToMe } }]
        // );

        // setMessages(myMessages.concat(yourMessages));
        setMessages(
          await messagingProgram.program.account.message.all([
            {
              memcmp: {
                offset: 8,
                bytes: wallet.publicKey.toBase58(),
              },
            },
            {
              memcmp: {
                offset: 40,
                bytes: wallet.publicKey.toBase58(),
              },
            },
          ])
        );
      } catch (error) {
        setMessages([]);
      }
    }
  };

  const sendMessage = async (message: string) => {
    if (wallet.publicKey && messagingProgram.program) {
      const messageKeypair = Keypair.generate();

      await messagingProgram.program.methods
        .sendMessage(wallet.publicKey, message)
        .accounts({
          message: messageKeypair.publicKey,
          owner: wallet.publicKey,
        })
        .signers([messageKeypair])
        .rpc();

      await getMessages();
    }
  };

  useEffect(() => {
    getUser();
    getMessages();
  }, [wallet.publicKey, messagingProgram.program]);

  return (
    <div className="container mx-auto">
      <div className="flex justify-center mt-16">
        {wallet.connected ? (
          user ? (
            <>
              <Inbox
                messages={messages.sort(
                  (a, b) => a.account.createdAt - b.account.createdAt
                )}
                sendMessage={sendMessage}
              />
              <Button onClick={deleteUser}>Delete User</Button>
            </>
          ) : (
            <Register registerUser={registerUser} />
          )
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default HomePage;
