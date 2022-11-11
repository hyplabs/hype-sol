## Getting started
![image](https://user-images.githubusercontent.com/53666764/201426481-eabaf1a1-4c30-45f3-ad27-92dca9bd1aea.png)

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
This should tell solana to use localhost:8899

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

9. Update the program ID
   This step I don't really understand as much - it's unclear to me when and why the programId for a given
   program might change. As such, these are the steps to completely update the program id - when in doubt,
   just redo these I guess until we understand programIds better

- When you deploy locally with anchor deploy, the command line output should contain the programId
- alternatively, from the project directory (i.e. hype-solana-notepad) run

```
solana address -k  target/deploy/hype-solana-notepad.json
```

This command should print out the programId

- Update the Anchor.toml file:

```
hype_solana_notepad = "<programId here>"
```

- go to lib.rs and modify the following line:

```
declare_id!("<programId here>");
```

- go to use_notes_program.ts and edit the following line:
  ```
  new PublicKey("<ProgramId here>")
  ```

10. Install phantom wallet in chrome

https://chrome.google.com/webstore/detail/phantom/bfnaelmomeimhlpmgjnjophhpkkoljpa?hl=en

11. Send yourself SOL in order to execute transactions

```
solana transfer --allow-unfunded-recipient <your_phantom_public_key> 1000
```

12. Run the web app frontend

```
cd notes-frontend
npm install
npm run dev
```

13. connect your phantom wallet to localhost

Now if you go to localhost:3000, you should now be able to write and post notes and see the notes you've written!

## Testing

```
anchor test
```

note that this runs the validator, builds, deploys and runs the test a
