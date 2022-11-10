import { AnchorProvider, web3 } from "@project-serum/anchor";
import { useWallet } from "@solana/wallet-adapter-react";
import { Keypair, PublicKey } from "@solana/web3.js";
import { useEffect, useRef, useState } from "react";

import { useNotesProgram, Note } from "../hooks/use_notes_program";

const NotePad = () => {
  const [wipNote, setWIPNote] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const { publicKey } = useWallet();
  const { program } = useNotesProgram();
  console.log(program);
  const getNotes = async () => {
    if (publicKey && program) {
      setNotes(
        await program.account.note.all([
          {
            memcmp: {
              offset: 8, // Discriminator length is 8 bytes
              bytes: publicKey.toBase58(),
            },
          },
        ])
      );
    }
  };

  useEffect(() => {
    getNotes();
  }, [publicKey, program]);

  const writeNote = async (content: string) => {
    console.log({ program });
    if (publicKey && program) {
      console.log("is this running???");
      const note = Keypair.generate();
      await program.methods
        .writeNote("Reminders", content)
        .accounts({
          note: note.publicKey,
          author: publicKey,
          systemProgram: web3.SystemProgram.programId,
        })
        .signers([note])
        .rpc();
      await getNotes();
    }
  };
  return (
    <div>
      <div>
        {notes.map((n) => {
          return <div key={n.publicKey.toString()}>{n.account.content}</div>;
        })}
      </div>
      <input
        value={wipNote}
        onChange={(e) => {
          setWIPNote(e.target.value);
        }}
      />
      <button onClick={() => writeNote(wipNote)}>Post note</button>
    </div>
  );
};

export default NotePad;
