import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { HypeSolanaNotepad } from "../target/types/hype_solana_notepad";
import * as assert from "assert";
import * as bs58 from "bs58";

describe("hype-solana-notepad", () => {
  // Configure the client to use the local cluster.
  // provider here is pretty much the same as an Eth provider I believe
  anchor.setProvider(anchor.AnchorProvider.env()); // settings in Anchor.toml, defaults to localnet

  const program = anchor.workspace
    .HypeSolanaNotepad as Program<HypeSolanaNotepad>;

  it("can post a note", async () => {
    // if you look at WriteNote<'info> in lib.rs,
    // it requires 3 accounts - note, author and system_program
    const note = anchor.web3.Keypair.generate();
    const txn = await program.methods
      .writeNote("Reminders", "Go to store later")
      .accounts({
        note: note.publicKey,
        author: program.provider.publicKey, // the public key of the provider wallet
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([note]) // anchor auto adds wallet as signer to each txn so no need to add here
      .rpc();

    const noteAccount = await program.account.note.fetch(note.publicKey);
    // publicKey is an object so we can't do shallow equals - do a deep compare by serializing
    // and asserting that the resulting that the strings are equal
    assert.equal(
      noteAccount.author.toBase58(),
      program.provider.publicKey.toBase58()
    );
    assert.equal(noteAccount.topic, "Reminders");
    assert.equal(noteAccount.content, "Go to store later");
    assert.ok(noteAccount.timestamp);
  });

  it("can post a note with no topic", async () => {
    const note = anchor.web3.Keypair.generate();
    await program.methods
      .writeNote("", "hello")
      .accounts({
        note: note.publicKey,
        author: program.provider.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([note])
      .rpc();

    const noteAccount = await program.account.note.fetch(note.publicKey);
    assert.equal(
      noteAccount.author.toBase58(),
      program.provider.publicKey.toBase58()
    );
    assert.equal(noteAccount.topic, "");
    assert.equal(noteAccount.content, "hello");
    assert.ok(noteAccount.timestamp);
  });

  it("can post a note from a different author", async () => {
    // gonna write a note from a generated keypair instead of the provider wallet
    const otherUser = anchor.web3.Keypair.generate();
    // need to send SOL to the new user so it can pay rent for the note it's gonna post
    const signature = await program.provider.connection.requestAirdrop(
      otherUser.publicKey,
      1000000000
    );
    // wait for the txn to be confirmed on the chain
    await program.provider.connection.confirmTransaction(signature); // apparently confirmTransaction is deprecated but it works for now

    // call writeNote on behalf of the other user
    const note = anchor.web3.Keypair.generate();

    await program.methods
      .writeNote("Reminders", "world")
      .accounts({
        note: note.publicKey,
        author: otherUser.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      // now that it's an account other than the provider wallet we have to add it
      .signers([otherUser, note])
      .rpc();

    const noteAccount = await program.account.note.fetch(note.publicKey);

    // check data
    assert.equal(noteAccount.author.toBase58(), otherUser.publicKey.toBase58());
    assert.equal(noteAccount.topic, "Reminders");
    assert.equal(noteAccount.content, "world");
    assert.ok(noteAccount.timestamp);
  });

  it("cannot provide a topic with more than 50 characters", async () => {
    try {
      const note = anchor.web3.Keypair.generate();
      const topicWith51Chars = "x".repeat(51);
      await program.methods
        .writeNote(topicWith51Chars, "world")
        .accounts({
          note: note.publicKey,
          author: program.provider.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .signers([note])
        .rpc();
    } catch (error) {
      assert.equal(
        error.error.errorMessage,
        "The provided topic should be 50 characters long maximum."
      );
      return;
    }
    assert.fail(
      "The instructions should have failed with a 51-character topic"
    );
  });

  it("cannot provide a content with more than 280 characters", async () => {
    try {
      const note = anchor.web3.Keypair.generate();
      const contentWith281Chars = "x".repeat(281);
      await program.methods
        .writeNote("hello", contentWith281Chars)
        .accounts({
          note: note.publicKey,
          author: program.provider.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .signers([note])
        .rpc();
    } catch (error) {
      assert.equal(
        error.error.errorMessage,
        "The provided content should be 280 characters long maximum."
      );
      return;
    }
    assert.fail(
      "The instruction should have failed with a 281 character content"
    );
  });

  it("can fetch all notes", async () => {
    const noteAccounts = await program.account.note.all();
    assert.equal(noteAccounts.length, 3);
  });

  it("can filter notes by author", async () => {
    const authorPublicKey = program.provider.publicKey;
    const noteAccounts = await program.account.note.all([
      {
        // compares "bytes" to the byte-array found at offset 8 in the note account
        memcmp: {
          offset: 8, // Discriminator length is 8 bytes
          bytes: authorPublicKey.toBase58(),
        },
      },
    ]);
    // the above memcmp should have found all notes whose byte array at position 8
    // (i.e. the author pkey) matches the provider wallet
    assert.equal(noteAccounts.length, 2);

    // make sure that all the tweets we found actually have our wallet pkey
    assert.ok(
      noteAccounts.every((noteAccount) => {
        return (
          // note the different .account.author syntax - .all() returns a
          // different type of object than .fetch()
          noteAccount.account.author.toBase58() === authorPublicKey.toBase58()
        );
      })
    );
  });

  it("can filter notes by topic", async () => {
    const noteAccounts = await program.account.note.all([
      {
        memcmp: {
          offset:
            8 + // Discriminator
            32 + // Author public key
            8 + // Timestamp
            4, // Topic string prefix

          // want to filter by topic so we convert string
          // to Buffer and then buffer to base 58
          bytes: bs58.encode(Buffer.from("Reminders")),
        },
      },
    ]);

    assert.equal(noteAccounts.length, 2);
    assert.ok(
      noteAccounts.every((noteAccount) => {
        return noteAccount.account.topic === "Reminders";
      })
    );
  });
});
