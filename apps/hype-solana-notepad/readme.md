## Getting started

1. First, make sure you have rust, the solana cli and solana-test-validator script installed
   - https://docs.solana.com/cli/install-solana-cli-tools
   - Can use several different methods; I used brew
   - make sure you have both solana and solana-test-validator installed

Test that the install worked by running the following:

```
solana --version
solana-test-validator --version
```

2. If you haven't previously setup solana, you will need a local key pair

- check if you already have a local key pair

```
solana address
```

- if you get an error, then you probably don't have a pair and need to generate a new one

```
solana-keygen new
```

3. Use solana locally

```
solana config set --url localhost
```

4. Install Anchor

```
cargo install --git https://github.com/project-serum/anchor anchor-cli --locked
```

5. install yarn

```
brew install yarn
or
npm install -g yarn
```

This should tell solana to use localhost:8899

6. Build the contract

   ```
   anchor build
   ```

7. Start the local validator

```
solana-test-validator
```

8. Deploy the contract

```
anchor deploy
```

9. Install phantom wallet in chrome

https://chrome.google.com/webstore/detail/phantom/bfnaelmomeimhlpmgjnjophhpkkoljpa?hl=en

10. Send yourself SOL in order to execute transactions

```
solana transfer --allow-unfunded-recipient <your_phantom_public_key> 1000
```

11. Run the web app frontend

```
cd notes-frontend
npm install
npm run dev
```

12. connect your phantom wallet to localhost

## Testing

```
anchor test
```

note that this runs the validator, builds, deploys and runs the test a
