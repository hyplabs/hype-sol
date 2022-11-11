import { web3 } from "@project-serum/anchor";
import { useWallet } from "@solana/wallet-adapter-react";
import { Keypair } from "@solana/web3.js";
import { useEffect, useState } from "react";

import { useNotesProgram, Note } from "../hooks/use_notes_program";

const NotePad = () => {
  const [wipNote, setWIPNote] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const { publicKey } = useWallet();
  const { program } = useNotesProgram();
  const getNotes = async () => {
    if (publicKey && program) {
      setNotes(
        // note.all() retrieves all notes, and accepts a filtering parameter.
        // memcmp stands for memory compare - the way the filters work is literally comparing
        // byte-for-byte equality.

        // so in this example, offset: 8 tells it to get the byte-array located at position 8 (i.e bytes 0-7 are the discriminator).
        // Our data structure has the discriminator (represents the account type) which is 8 bytes,
        // and then the author is stored next - so we are comparing the author byte-array with the
        // base58 encoding of the connected wallet's public key

        // so effectively, this retrieves all the notes associated with our Notepad program,
        // and then filters out all notes except notes whose author is the connected wallet
        await program.account.note.all([
          {
            memcmp: {
              offset: 8, // Discriminator length is 8 bytes, author is next
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

  // TODO: we can also give notes topics, it's essentially
  // the same as the content but lower character limit
  const writeNote = async (content: string) => {
    // don't post empty notes
    if (!content) return;

    if (publicKey && program) {
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
      <button
        onClick={() => {
          writeNote(wipNote);
          setWIPNote("");
        }}
      >
        Post note
      </button>
    </div>
  );
};

export default NotePad;
