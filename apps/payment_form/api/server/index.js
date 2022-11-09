const express = require("express");
require('dotenv').config()
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys

//const stripe = require('stripe')(process.env.SERVER_STRIPE_PRIVATE || "sk_test_Hrs6SAopgFPF0bZXSN3f6ELN");
//const PORT = process.env.SERVER_PORT || 3000;
const stripe = require('stripe')(process.env.SERVER_STRIPE_PRIVATE);
const PORT = process.env.SERVER_PORT;
const app = express();

async function createPaymentIntent(amount_in,currency_in) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount_in,
      currency: currency_in,
      automatic_payment_methods: {enabled: true},
    });
    return(paymentIntent);
}

app.get('/secret', async (req, res) => {
  if(!req.query)
    return res.json({"error": "no params found."});
  if(!req.query["amount"])
    return res.json({"error": "no amount param"});
  let param = req.query;
  let intent = await createPaymentIntent(req.query["amount"],'usd');
  return res.json({client_secret: intent.client_secret});
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});