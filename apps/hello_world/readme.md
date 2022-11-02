# Hello World

This is a basic example of an anchor application which implements a basic contract and tests it on a short-lived, local, `solana-test-validator` node.

*It is recommended to build dApps with anchor in a test-driven way.*


## Running

Follow below to configure, build, and deploy and run this on localhost:

1. Install [Rust](https://www.rust-lang.org/tools/install)
1. Install [Solana CLI](https://docs.solana.com/cli/install-solana-cli-tools)
1. Configure Solana to use localhost `solana config set --url localhost`

    ...You should see output like this:
    ```
    paulmcinnis:hello_world$ solana config set --url localhost
    Config File: /Users/paulmcinnis/.config/solana/cli/config.yml
    RPC URL: http://localhost:8899
    WebSocket URL: ws://localhost:8900/ (computed)
    Keypair Path: /Users/paulmcinnis/.config/solana/id.json
    Commitment: confirmed
    ```
1. Build the program `anchor build`

    ...this will generate the `target` subdirectory containing an `IDL` (like an ABI) in `target/idl/hello_world.json`
    ```
    paulmcinnis:hello_world$ cat target/idl/hello_world.json
    {
      "version": "0.1.0",
      "name": "hello_world",
      "instructions": [
        {
          "name": "initialize",
          "accounts": [],
          "args": []
        }
      ],
      "metadata": {
        "address": "Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLn1"
      }
    ```


1. We need to bootstrap the dynamically-generated `program ID` (like an address) to proceed any further:

    1. Get this by doing: `solana address -k target/deploy/hello_world-keypair.json`
        ```
        paulmcinnis:hello_world$ solana address -k target/deploy/hello_world-keypair.json
        BUhUbDumryZpuG2XKv8N1saRDXL9pMAKsJz6vGPd9ejA
        ```
    1. copy the address into `lib.rs` as `declare_id` like so:
        ```
        // helloworld/src/lib.rs
        declare_id!("BUhUbDumryZpuG2XKv8N1saRDXL9pMAKsJz6vGPd9ejA");
        ```
    1. copy the address into `Anchor.toml` under `[programs.localnet]` like so:
        ```
        # Anchor.toml
        [programs.localnet]
        hello_world = "BUhUbDumryZpuG2XKv8N1saRDXL9pMAKsJz6vGPd9ejA"
        ```

1. Run the `hello world` local validator and test the initialisation via the command `anchor test`. You should see `1 passing (xxxms)`


## Using anchor in your own project

Pretty simple, initialise via this command:

  `anchor init <project-name> --no-git`

... you can create this same basic project anywhere with any name, just be mindful of the bootstrap for getting started.


## What's Inside

- The `.anchor` folder: It includes the most recent program logs and a local ledger that is used for testing
- The `app` folder: An empty folder that you can use to hold your frontend if you use a monorepo
- The `programs` folder: This folder contains your programs. It can contain multiple but initially only contains a program with the same name as `<new-workspace-name>`. This program already contains a lib.rs file with some sample code.
- The tests folder: The folder that contains your E2E tests. It will already include a file that tests the sample code in the `programs/<new-workspace-name>`.
- The `migrations` folder: In this folder you can save your deploy and migration scripts for your programs.
- The `Anchor.toml` file: This file configures workspace wide settings for your programs. Initially, it configures
- The `addresses` of your programs on localnet (`[programs.localnet]`)
- A `registry` your program can be pushed to (`[registry]`)
- A `provider` which can be used in your tests (`[provider]`)
- Scripts that Anchor executes for you (`[scripts]`). The test script is run when running anchor test. You can run your own scripts with anchor run `<script_name>`.

## Further Reading

* To get the low-down on rust x anchor I recommend reading through [this medium article](https://dev.to/edge-and-node/the-complete-guide-to-full-stack-solana-development-with-react-anchor-rust-and-phantom-3291).
