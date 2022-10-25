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

2. Do support easy deploy commands

In general, within each apps/*/package.json, we will want to supply some standard commands. Right now these commands facilitate local deployment on localhost, and deployment on the testnet. Please see an example project to understand how to set these commands up.

```
npm run deploy-local
npm run deploy-test
```

2. Do use a .env file

We should all assume a .env file is present in the repository root directory. If you want to provide some environment variables, please do update the .env.example in the root directory
