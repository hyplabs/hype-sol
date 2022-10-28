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

This repository contains many stand alone react-js / solidity projects. Each full project broken into independent front-end and contract portions, as sometimes contracts may be used by several front end apps. If you are a user of this repository, you may fit into a few categories: 

1. If you are a app user, you will be looking to deploy an application example. See User Getting Started below
2. If you are a developer, you will be looking to add or modify a contract/app pair. See Developer Getting Started below.

## Developer Getting Started

First, you will need to create your project directories. Every app is broken into a contract and app portion. The app portion goes into the apps folder. The contract is places into the apps folder. In general, it is expected that contracts may be used by one or more apps, so we have structured the repository with this in mind.

1. Project Structure 

When you develop your app, you should make efforts to also add in code to deploy any required contracts, within your app directory. The following is an example taxonomy for a solana application.

```
├── contracts/greeter/[greeter contract files]
├── apps/greeter/[hello world example files, requires contracts/greeter/*]
├── apps/echo_server/[echo server example, requires contracts/greeter/*]
```
2. Projects Backlog
We are currently working on bitesize projects which can help people get started on Solana. Here are the current bite sized projects!
### Treasury {Paul}
A token and treasury implementation. The contract can mint a currency, and then the treasury can issue, manage some portion of the currency. This kind of Treasury could be used by a payment processor to allow users to purchase currency.
- predecessor: nil
- project: /projects/SOLANA_PROJECT_DIR

### Treasury {Paul}
A token and treasury implementation. The contract can mint a currency, and then the treasury can issue, manage some portion of the currency. This kind of Treasury could be used by a payment processor to allow users to purchase currency.
- predecessor: nil
- project: /projects/SOLANA_PROJECT_DIR

### Emailer {Benny} 
A simple emailer that demonstrates how to create a virtual communication inbox and message protocol.
- predecessor: nil
- app: /apps/APP_DIR 
- project: /projects/SOLANA_PROJECT_DIR

### Notepad {Drew} 
A simple notes app that demonstrates how to store on chain data on behalf of a user.
- predecessor: nil
- app: /apps/APP_DIR 
- project: /projects/SOLANA_PROJECT_DIR

### Payment Form {Justin} 
A web 2.0 payment form with a node.js back end for processing payment requests.
- predecessor: nil
- app: /apps/APP_DIR 

### Secret Manager {TBA} : {Notepad, Emailer}  
A simple notes app that demonstrates how to store encrypted messages on behalf of a user.
- predecessor: Notepad, or Emailer
- app: /apps/APP_DIR 
- project: /projects/SOLANA_PROJECT_DIR

### User Manager {TBA} : {Secret Manager} 
Generates a public and private key for a user, and encrypts the private key a password, before storing on chain. This allows a user to generate a solana user easily, and to use this solana user as a destination for NFTs and currency. 
- predecessor: Secret Manager
- app: /apps/APP_DIR 
- project: /projects/SOLANA_PROJECT_DIR

### Solana FIAT Gateway {TBA}: {Treasury, Payment Form} 
Allow a solana user the ability to puchase some currency, or other artifact, with real money. 
- predecessor: Treasury, Payment Form
- app: /apps/APP_DIR 
- project: /projects/SOLANA_PROJECT_DIR

### General FIAT Gateway {TBA}: {User Manager, FIAT Gateway} 
Allow a non-expert user the ability to puchase some currency, or other artifact, with real money. They should be able to complete a transaction with just a username and password login, and still have data stored on chain. At the time of their choice, they are able to liquidate their custodial wallet, and remove any assets within. 
- predecessor: User Manager, FIAT Gateway
- app: /apps/APP_DIR 
- project: /projects/SOLANA_PROJECT_DIR

3. Do support easy deploy commands

In general, within each apps/*/package.json, we will want to supply some standard commands. Right now these commands facilitate local deployment on localhost, and deployment on the testnet. Please see an example project to understand how to set these commands up.

```
npm run deploy-local
npm run deploy-test
```

4. Do use a .env file

We should all assume a .env file is present in the repository root directory. If you want to provide some environment variables, please do update the .env.example in the root directory
