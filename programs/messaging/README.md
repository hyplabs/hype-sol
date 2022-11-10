# Messaging Application Backend

## Deploy on Localnet

1. Generate a wallet if you haven't already and airdrop yourself some **SOL**

   ```bash
   solana-keygen new
       --force                 # Replaces existing wallet
       --outfile <wallet-path> # Defaults to ~/config/solana/id.json
   solana airdrop 2
   ```

1. Configure wallet to use localnet

   ```bash
   solana config set --url localhost
   ```

1. Start Solana test validator

   ```bash
   solana-test-validator
   ```

1. Build the program

   ```bash
   anchor build
   ```

1. Get `<program-id>`

   ```bash
   solana-keygen pubkey ./target/deploy/messaging-keypair.json
   ```

1. Set **cluster** to `localnet` and **wallet** to `<wallet-path>` under providers in [Anchor.toml](./Anchor.toml).

   ```toml
   [provider]
   cluster = "localnet"
   wallet = <wallet-path>
   ```

1. Set **messaging** to `<program-id>` under programs.localnet in [Anchor.toml](./Anchor.toml).

   ```toml
   [programs.localnet]
   messaging = <program-id>
   ```

1. Deploy the program

   ```bash
   anchor deploy
   ```

## Deploy on Devnet

1. Generate a wallet if you haven't already and airdrop yourself some **SOL**

   ```bash
   solana-keygen new
       --force                 # Replaces existing wallet
       --outfile <wallet-path> # Defaults to ~/config/solana/id.json
   solana airdrop 2
   ```

1. Configure wallet to use localnet

   ```bash
   solana config set --url devnet
   ```

1. Start Solana test validator

   ```bash
   solana-test-validator
   ```

1. Build the program

   ```bash
   anchor build
   ```

1. Get `<program-id>`

   ```bash
   solana-keygen pubkey ./target/deploy/messaging-keypair.json
   ```

1. Set **cluster** to `devnet` and **wallet** to `<wallet-path>` under providers in [Anchor.toml](./Anchor.toml).

   ```toml
   [provider]
   cluster = "devnet"
   wallet = <wallet-path>
   ```

1. Set **messaging** to `<program-id>` under programs.localnet in [Anchor.toml](./Anchor.toml).

   ```toml
   [programs.devnet]
   messaging = <program-id>
   ```

1. Deploy the program

   ```bash
   anchor deploy
   ```
