# Messaging Application Backend

## Prerequisites

1. Generate a wallet

   ```bash
   solana-keygen new
   ```

1. Build the program

   ```bash
   anchor build
   ```

## Deploy on Localnet

1. Configure RPC URL to localnet

   ```bash
   solana config set --url localhost
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

1. Start Solana test validator

   ```bash
   solana-test-validator
   ```

1. Deploy the program

   ```bash
   anchor deploy
   ```

## Deploy on Devnet

1. Configure RPC URL to use localnet

   ```bash
   solana config set --url devnet
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

## FAQ

### How do I get the wallet path?

```bash
> solana config get
Config File: /Users/admin/.config/solana/cli/config.yml
RPC URL: http://localhost:8899
WebSocket URL: ws://localhost:8900/ (computed)
Keypair Path: /Users/admin/.config/solana/id.json # wallet path
Commitment: confirmed
```

### How do I get the program ID?

```bash
> solana-keygen pubkey ./target/deploy/messaging-keypair.json
3QUUddnWRXhghTBsn6r6Q4DMN4t4y9QrNgVna2Q5BgHb
```

### How do I get some solana? (localnet, devnet, and testnet only)

```bash

> solana airdrop 2
Requesting airdrop of 2 SOL

Signature: 4esXDbo8UF3LYWgDLwxVfDtvU2LHWFWFrZ8Npuw4gaQzsg6ekeU7g8SMMvEfaf11odMk1CZa5uFRFozaRRRVFkTg

500000000.854694784 SOL
```

### How do I know that my program is deployed on the blockchain?

```bash
> solana program show <program-id>

Program Id: 3QUUddnWRXhghTBsn6r6Q4DMN4t4y9QrNgVna2Q5BgHb
Owner: BPFLoaderUpgradeab1e11111111111111111111111
ProgramData Address: FU591uHYPUUb4diBV9VxkiQ55gKKXjFGhpUHBMzGC9s1
Authority: 9REG6zXgGQ63soT4RuNvHzu79dK8qkLV7tchH4SnJ6cC
Last Deployed In Slot: 680
Data Length: 505984 (0x7b880) bytes
Balance: 3.52285272 SOL
```

### How do I remove my program from the blockchain?

```bash
> solana program close <program-id>

Closed Program Id 3QUUddnWRXhghTBsn6r6Q4DMN4t4y9QrNgVna2Q5BgHb, 3.52285272 SOL reclaimed
```
