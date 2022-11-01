import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { Messaging } from "../target/types/messaging";
import fs from "fs";

describe("messaging", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Messaging as Program<Messaging>;

  const getPDA = async (seed: string, publicKey: PublicKey) => {
    const [userPDA, _] = await PublicKey.findProgramAddress(
      [anchor.utils.bytes.utf8.encode(seed), publicKey.toBuffer()],
      program.programId
    );

    return userPDA;
  };

  const keypairFromFile = async (path: string) => {
    const secretKeyString = fs.readFileSync(path, "utf8");
    const secretKey = Uint8Array.from(JSON.parse(secretKeyString));

    return anchor.web3.Keypair.fromSecretKey(secretKey);
  };

  const aidrop = async (
    publicKey: PublicKey,
    lamports: number = LAMPORTS_PER_SOL
  ) => {
    const connection = program.provider.connection;
    const signature = await program.provider.connection.requestAirdrop(
      publicKey,
      lamports
    );
    const latestBlockHash = await connection.getLatestBlockhash();
    await program.provider.connection.confirmTransaction({
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature: signature,
    });
  };

  it("register user", async () => {
    const userKeypair = Keypair.generate();
    const userPDA = await getPDA("user", userKeypair.publicKey);

    await aidrop(userKeypair.publicKey, 5 * LAMPORTS_PER_SOL);

    await program.methods
      .registerUser()
      .accounts({ user: userPDA, owner: userKeypair.publicKey })
      .signers([userKeypair])
      .rpc();

    console.log(await program.account.user.fetch(userPDA));
  });

  it("send message", async () => {
    const user1Keypair = Keypair.generate();
    const user2Keypair = Keypair.generate();

    await aidrop(user1Keypair.publicKey, 5 * LAMPORTS_PER_SOL);

    const messageKeypair = Keypair.generate();

    await program.methods
      .sendMessage(user2Keypair.publicKey, "this is a message sent with solana")
      .accounts({
        message: messageKeypair.publicKey,
        owner: user1Keypair.publicKey,
      })
      .signers([user1Keypair, messageKeypair])
      .rpc();

    console.log(await program.account.message.all());
  });
});
