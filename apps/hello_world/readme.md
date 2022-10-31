# Hello World

This is a basic example of an anchor application which implements a basic contract and tests it on a short-lived, local, `solana-test-validator` node.

*It is recommended to build dApps with anchor in a test-driven way.*


## Running

***FIXME: need to extend the usage steps so that it's clone and use, this means deploying and updating configs.***

1. install [Rust](https://www.rust-lang.org/tools/install)
2. install [Solana CLI](https://docs.solana.com/cli/install-solana-cli-tools)
    verify that you have keypair data inside `~/.config/solana/id.json`
3. Run the `hello world` deployment and test via the command `anchor test`. You should see `1 passing (419ms)`


## Reuse

Pretty simple, via this command:

  `anchor init <project-name> --no-git`

... you can create this same basic project anywhere with any name.


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
