# A Stripe Payment Form

This example shows you how to use a Stripe payment form, which allows a user to transfer money to you.

## Prerequisites

You will need to have `node.js` and `npm` installed. If you want to use your own stripe account, you will need to set up a stripe account and generate a public and private key.

## Installation

Copy the repository. Run `npm install`. 

## Environment variables

An example environment file, `.env.example`, is provided. You will need to make two environment variable files: `.env.local` for local deployment, and `.env.production` for deployment.  `.env.local` should simply be a copy of `.env.example`. There are two environment variables in the file: `REACT_APP_SECRET_SERVER_URL`, which is the URL of the endpoint that serves client secrets, and `REACT_APP_RETURN_URL`, which should be the URL of the payment form webpage. 

## Local deployment 

To deploy locally, run `npm run deploy-local` from the `payment_form` directory.  You must have created a `.env.local` file to deploy locally.  The webpage should be accessible at `http://localhost:5000`. The client secret server should be accessible at `http://localhost:3000/secret/?amount=100`; if you go there you should see a client secret printed out.

## Usage

This is a basic form that can be dropped into any application. You will need to fill out the test via to get this running:
- 4242 4242 4242 4242
- 11/33
- Canada
- M8M 8M8


## Deployment

The back end of the app (i.e. the client secret server) must be hosted elsewhere.  The client secret server is found in `payment_form/api`.  The front end (i.e. the static web site containing the payment form) can be found in the build directory after running npm build.