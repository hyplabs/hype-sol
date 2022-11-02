# The Treasury

Do you want to get rich quick?

Step right up, `POST`, and obtain your very own `Paul Coin`, its *really*, ***really***, valuable.

The treasury issues Solana cryptocurrency in response to secure, off-chain, HTTP requests.

## Getting Started

First we will make sure anchor is chooching, then we will create and mint some `paul coins` on dev-net, finally we will configure and try out the treasury.

### Anchor hello world:


Follow below to configure, build, and deploy and run this on localhost:

1. Install [Rust](https://www.rust-lang.org/tools/install)
1. Install [Solana CLI](https://docs.solana.com/cli/install-solana-cli-tools)
1. Configure Solana to use localhost `solana config set --url localhost`
1. Build the program `anchor build`
1. We need to bootstrap the dynamically-generated `program ID` (like an address) to proceed any further:

    1. Get this by doing: `solana address -k target/deploy/treasury-keypair.json`
        ```
        paulmcinnis:treasury$ solana address -k target/deploy/treasury-keypair.json
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
        treasury = "BUhUbDumryZpuG2XKv8N1saRDXL9pMAKsJz6vGPd9ejA"
        ```

1. Run the `treasury` local validator and test the initialisation via the command `anchor test`. You should see `1 passing (xxxms)`


### Create Paul-Coin:

1. make certain we are on testnet `solana config set --url https://api.devnet.solana.com`
1. get some gas `solana airdrop 1`
1. install SPL (Solana Program Library) CLI via rust package manager `cargo install spl-token-cli`
1. create a token contract `spl-token create-token`
1. save the token contract `address` (i.e. `7eAd29T6m3mzUp7XRksCEbJ6uT3vnbDXGw3HtjbAZMiZ`)
1. create a account to store the token, a.k.a a `token-account` via `spl-token create-account <token-address>`
1. save the token account `address`
1. mint 1,000,000 tokens `spl-token mint <token-address> 1000000`. *You can always call `mint` again if you need more*
1. verify 1,000,000 tokens were minted to the token account address `spl-token balance <token-address>`
1. make it impossible to mint more tokens *because that's just how paulcoins work bro*. `spl-token authorize <token-address> mint --disable`

Other stuff you could do with paul coin token account and the `spl`cli:
* burn supply `spl-token burn <token-account-addresss> <amount>`
* send yourself some tokens via CLI `spl-token-transfer --fund-recipient <token-account-address> <amount> <you-wallet-address>`
* make a PR into `solana.tokenlist.json` on [mainnet](https://github.com/solana-labs/token-list/blob/main/src/tokens/solana.tokenlist.json) so that `paul coin` is even more *legit*
* check out the token account balance on the solana devnet explorer, i.e. https://explorer.solana.com/address/CuG7444rkeq7iDnn9nPQJ9PqLXfHcrwsschz9gDpPNRs?cluster=devnet

#### Governance

In [other](https://github.com/paritytech/substrate/blob/7e7192c0f48e7ca97bc54327df55a72ccd2d479c/srml/treasury/src/lib.rs) [examples](https://wiki.polkadot.network/docs/learn-treasury) of [treasuries](https://docs.rs/pallet-treasury/latest/pallet_treasury/) it seems that there is a notion of governance, i.e. payouts are determined by stakeholders in response to on-chain events like transactions or operations work.


#### Running on other networks
Seems like you probably want to start the test validator independantly?

1. in a new window: run `solana-test-validator --reset` *... recommend reset so that your disk is respected a tiny bit.*
2. deploy your contracts locally `anchor deploy --provider.cluster localnet`
3. ...?


RE: `WTF is the solana-test-validator doing?` - There is the temporal record (block) as the validator progresses through time, whether there was something done or not.


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

## Resources

- [tutorial on spl](https://blog.logrocket.com/building-token-solana/#understanding-some-important-concepts)
