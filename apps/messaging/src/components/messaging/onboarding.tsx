import { utils } from "@project-serum/anchor";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { Button, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { MdContentPaste } from "react-icons/md";
import { Link } from "react-router-dom";

import { useMessagingProgram } from "../../hooks/use_messaging_program";
import Information from "../information";

const Onboarding = () => {
  const [userExists, setUserExists] = useState(false);
  const [addressInput, setAddressInput] = useState("");
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const { program } = useMessagingProgram();

  const getUserPDA = async () => {
    if (publicKey && program) {
      const [userPDA] = await PublicKey.findProgramAddress(
        [utils.bytes.utf8.encode("user"), publicKey.toBuffer()],
        program.programId
      );

      return userPDA;
    }

    return null;
  };

  const checkUserExists = async () => {
    const userPDA = await getUserPDA();

    if (userPDA) {
      setUserExists((await connection.getAccountInfo(userPDA)) !== null);
    }
  };

  const createUser = async () => {
    if (publicKey && program) {
      const userPDA = await getUserPDA();

      if (userPDA) {
        await program.methods
          .createUser()
          .accounts({ user: userPDA, owner: publicKey })
          .rpc();
        await checkUserExists();
      }
    }
  };

  const deleteUser = async () => {
    if (publicKey && program) {
      const userPDA = await getUserPDA();

      if (userPDA) {
        await program.methods
          .deleteUser()
          .accounts({ user: userPDA, owner: publicKey })
          .rpc();
        await checkUserExists();
      }
    }
  };

  useEffect(() => {
    checkUserExists();
  }, [publicKey, program]);

  if (!publicKey) {
    return (
      <div className="m-4">
        <Information
          title="Wallet Connection"
          description="Connect your wallet to access the messaging application."
        />
      </div>
    );
  }

  if (userExists) {
    return (
      <div className="m-4">
        <Information title="" description="" />
        <section className="flex justify-center m-4">
          <Button onClick={deleteUser}>Delete Account</Button>
        </section>
        <section className="flex gap-4 items-end">
          <TextInput
            className="w-full"
            icon={MdContentPaste}
            onChange={(event) => {
              setAddressInput(event.target.value);
            }}
            placeholder="Enter address here"
            required
            value={addressInput}
          />
          <Link to={`/messaging/${addressInput}`}>
            <Button>Message</Button>
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="m-4">
      <Information
        title="Account Creation"
        description="Hey! It looks like you don't have an account. Let's make one right now!"
      />
      <section className="flex justify-center m-4">
        <Button onClick={createUser}>Create Account</Button>
      </section>
    </div>
  );
};

export default Onboarding;
