import { useWallet } from "@solana/wallet-adapter-react";
import { Keypair, PublicKey } from "@solana/web3.js";
import { Button, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Message,
  useMessagingProgram,
} from "../../hooks/use_messaging_program";
import MessageBubble from "./message_bubble";

const Inbox = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messageView = useRef<HTMLDivElement | null>(null);
  const { publicKey, disconnecting } = useWallet();
  const { program } = useMessagingProgram();
  const location = useLocation();
  const navigate = useNavigate();

  const getMessages = async () => {
    const toAddress = location.pathname.split("/").pop();

    if (publicKey && program && toAddress) {
      setMessages(
        (
          await program.account.message.all([
            {
              memcmp: {
                offset: 8,
                bytes: publicKey.toBase58(),
              },
            },
            {
              memcmp: {
                offset: 40,
                bytes: new PublicKey(toAddress).toBase58(),
              },
            },
          ])
        ).concat(
          await program.account.message.all([
            {
              memcmp: {
                offset: 8,
                bytes: new PublicKey(toAddress).toBase58(),
              },
            },
            {
              memcmp: {
                offset: 40,
                bytes: publicKey.toBase58(),
              },
            },
          ])
        )
      );
    }
  };

  useEffect(() => {
    if (disconnecting) {
      navigate("/messaging");
    }
  }, [disconnecting]);

  useEffect(() => {
    getMessages();
  }, [publicKey, program]);

  useEffect(() => {
    if (messageView.current) {
      messageView.current.scrollTop = messageView.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (message: string) => {
    const toAddress = location.pathname.split("/").pop();

    if (publicKey && program && toAddress) {
      const messageKeypair = Keypair.generate();

      await program.methods
        .sendMessage(new PublicKey(toAddress), message)
        .accounts({
          message: messageKeypair.publicKey,
          owner: publicKey,
        })
        .signers([messageKeypair])
        .rpc();
      await getMessages();
    }
  };

  return (
    <div className="m-4 p-4 rounded-xl shadow-xl">
      <section className="overflow-auto mb-8 pt-1/2 relative" ref={messageView}>
        <article className="absolute top-0 w-full">
          {messages
            .sort((a, b) => a.account.createdAt - b.account.createdAt)
            .map((value, index) => (
              <MessageBubble
                key={index}
                message={value.account.message}
                side={
                  value.account.from.toBase58() === publicKey?.toBase58()
                    ? "right"
                    : "left"
                }
              />
            ))}
          <section></section>
        </article>
      </section>
      <section className="flex gap-4 items-end">
        <TextInput
          className="w-full"
          onChange={(event) => {
            setMessage(event.target.value);
          }}
          value={message}
        />
        <Button
          onClick={async () => {
            await sendMessage(message);
            setMessage("");
          }}
        >
          Send
        </Button>
      </section>
    </div>
  );
};

export default Inbox;
