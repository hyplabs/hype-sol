import Inbox from "../components/messaging/inbox";
import Nav from "../components/nav/nav";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";
import { useMessagingProgram } from "../hooks/messaging_program";
import * as anchor from "@project-serum/anchor";
import Register from "../components/messaging/register";
import { Button } from "flowbite-react";

const Home = () => {
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

  const [user, setUser] = useState<any>(); // TODO: define proper type
  const [messages, setMessages] = useState<any>(); // TODO: define proper type

  const getUser = async () => {
    if (wallet.publicKey && messagingProgram.program) {
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

      try {
        setUser(
          await messagingProgram.program.account.user.fetch(userPublicKey)
        );
      } catch (error) {
        setUser(null);
      }
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

      setUser(null);
    }
  };

  const getMessages = async () => {};

  const sendMessage = async () => {};

  useEffect(() => {
    getUser();
    getMessages();
  }, [wallet.publicKey, messagingProgram.program]);

  return (
    <>
      <div className="container mx-auto h-screen">
        <Nav />
        <div className="flex items-center justify-center">
          {wallet.connected ? (
            user ? (
              <Inbox />
            ) : (
              <Register registerUser={registerUser} />
            )
          ) : (
            <></>
          )}
        </div>
        <Button onClick={deleteUser}>Delete User</Button>
      </div>
    </>
  );
};

export default Home;
