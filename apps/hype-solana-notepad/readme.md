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

2. Use solana locally

```
solana config set --url localhost
```

3. Install Anchor

```
cargo install --git https://github.com/project-serum/anchor anchor-cli --locked
```

4. install yarn

```
brew install yarn
or
npm install -g yarn
```

This should tell solana to use localhost:8899

5. Build the contract

   ```
   anchor build
   ```

6. Start the local validator

```
solana-test-validator
```

7. Deploy the contract

```
anchor deploy
```

8. Run the we bapp frontend

```
cd notes-frontend
npm start
```

## Testing

```
anchor test
```

note that this runs the validator, builds, deploys and runs the test a
