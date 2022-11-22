<br />
<br />



<h3 align="center">
  <b>
      Hype Solana - Complete Example Apps
  </b>
</h3>

<br />

<!-- DOCUMENTATION -->
## Documentation

This repository contains many stand alone react-js / solana projects. Each full project broken into independent front-end and contract portions, as sometimes contracts may be used by several front end apps. This repository targets two kinds of users.

1. If you are learning solana, you will be looking to deploy the self contained application examples in this repo.
2. If you are a builder, you can use these apps as starting points for larger applications.

## 1. Developer Getting Started

Most examples are broken into an app portion and programs portion. Apps are front-end interfaces, and contain readme.md instructions which lead you through the deployment process. Programs are resuable Solana smart contract deployment projects, which are back-ends for apps. An example taxonomy follows:

```
├── contracts/greeter/[greeter contract files]
├── apps/greeter/[hello world example files, requires contracts/greeter/*]
├── apps/echo_server/[echo server example, requires contracts/greeter/*]
```

# 2. Project List

The following projects are included.

### Treasury
A token and treasury implementation. The contract can mint a currency, and then the treasury can issue, manage some portion of the currency. This kind of Treasury could be used by a payment processor to allow users to purchase currency.

### Messaging  
A simple emailer that demonstrates how to create a virtual communication inbox and message protocol.

### Notepad
A simple notes app that demonstrates how to store on chain data on behalf of a user.

### Payment Form 
A web 2.0 payment form with a node.js back end for processing payment requests.

### User Registration 
A registration and sign in flow that can be plopped into any app. Demonstrates many foundational reactjs techniques.


## 3. Do support easy deploy commands

In general, within each apps/*/package.json, we will want to supply some standard commands. Right now these commands facilitate local deployment on localhost, and deployment on the testnet. Please see an example project to understand how to set these commands up.

```
npm run deploy-local
npm run deploy-test
```

# 4. Do use a .env file

We should all assume a .env file is present in the repository root directory. If you want to provide some environment variables, please do update the .env.example in the root directory
