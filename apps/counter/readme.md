# Counter dApp

This is a basic example of an on-chain solana program which increments a counter and a web frontend which we test out using a local, `solana-test-validator` node instead of on devnet or mainnet.

## Running

Follow below to configure, build, and deploy and run this on localhost:

1. Install [Rust](https://www.rust-lang.org/tools/install)
1. Install [Solana CLI](https://docs.solana.com/cli/install-solana-cli-tools)
1. Configure Solana to use localhost
   ```
   solana config set --url localhost
   ```
1. Build the program
   ```
   anchor build
   ```
1. We need to bootstrap the dynamically-generated `program ID` (like an address) to proceed any further:

   1. Get this by doing: `solana address -k target/deploy/counter-keypair.json`
      ```
      paulmcinnis:counter$ solana address -k target/deploy/counter-keypair.json
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
      counter = "BUhUbDumryZpuG2XKv8N1saRDXL9pMAKsJz6vGPd9ejA"
      ```
   1. if you did make any changes to the program: copy the generated idl.json from `target/idl/counter.json` into `app/src/idl.json`

1. Install the needed unit-testing libraries
   ```
   yarn
   ```
1. Test the solana `counter` program on a localnet validator. You should see `1 passing (xxxms)`
   ```
   anchor test
   ```
1. Configure the phantom wallet in your browser:

   1. Install [phantom wallet](https://phantom.app/download) in your web browser
   1. Create a new wallet if you don't already have one configured.
   1. Open the phantom wallet, click the wallet icon in the top left, then click `Developer Settings`, and `Change Network`, to `Localhost`.

1. Start a test-validator on your machine by opening a terminal in the background and running:
   ```
   solana-test-validator
   ```
   You will want to shut this down when you are done playing with this since it is taxing on your CPU and storage.
1. Lets airdrop some localnet SOL to your phantom wallet

   1. Open a new terminal window, and double-check you are on localnet
      ```
      solana config set --url localhost
      ```
   1. Copy the wallet address from phantom by clicking the top `Wallet 1` dropdown and hitting `copy`.
   1. In the new terminal give yourself 10 localnet SOL:
      ```
      solana airdrop 10 <address>
      ```
   1. Start our react web-app
      ```
      cd app
      yarn start
      ```
   1. In the opened browser window you should be able to connect your wallet, create a counter, and increment it. _NOTE we are generating a base account when the program loads so there is no persistance between page refreshes_

   **FIXME THIS DOES NOT WORK ... STUCK IN DEPENDENCY HELL**

## Further Reading

- gist showing how [account persistance could be done via keypair storage](https://gist.github.com/dabit3/7cbd18b8bc4b495c4831f8674902eb42)
- This is the source [tutorial article](https://dev.to/edge-and-node/the-complete-guide-to-full-stack-solana-development-with-react-anchor-rust-and-phantom-3291) for most of this.
  - a [follow up to above tutorial](https://www.8teapi.com/anchor-tutorial-2-2/) with some additions and clarifications
- creating a [token on solana tutorial (mainnet tho)](https://www.brianfriel.xyz/how-to-create-a-token-on-solana/)
- [rust docs](https://docs.rs/solana-program/latest/solana_program/) that are [sorta-maybe](https://docs.solana.com/developing/clients/rust-api) helpful
- [spl-token-docs](https://spl.solana.com/token)
- https://github.com/solana-labs/wallet-adapter

