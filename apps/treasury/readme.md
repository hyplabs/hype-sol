# The Treasury

***FYI this commit is currently JUST a hello world, work in-progress...***

Do you want to get rich quick?

Step right up, `POST`, and obtain your very own `Paul Coin`, its *really*, ***really***, valuable.

## What do?

The treasury issues Solana cryptocurrency in response to secure, off-chain, HTTP requests.

This project is implemented via test-driven development (TDD), so it is designed to use `anchor test` to both start the `solana-test-validator`, `deploy` the contract (on localnet), and to interact with it via the test cases in `tests/`

## Getting this to *Chooch*



1. install [Rust](https://www.rust-lang.org/tools/install)
2. install [Solana CLI](https://docs.solana.com/cli/install-solana-cli-tools)
    verify that you have keypair data inside `~/.config/solana/id.json`
3. hello world: `anchor test`

## Directories

*I Used [Anchor](https://book.anchor-lang.com/) to bootstrap this.*

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


## TBD: Running on other networks

Seems like you probably want to start the test validator independantly?

1. in a new window: run `solana-test-validator --reset` *... recommend reset so that your disk is respected a tiny bit.*
2. deploy your contracts locally `anchor deploy --provider.cluster localnet`
3. ...?


RE: `WTF is the solana-test-validator doing?` - There is the temporal record (block) as the validator progresses through time, whether there was something done or not.
