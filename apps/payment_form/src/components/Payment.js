import React from 'react';
import {useState, useEffect} from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from './CheckoutForm.js';



// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
//const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC);
 
function Payment() {
    
    const [clientSecret, setClientSecret] = useState("");
    
    function process_secret(data)
    {
        console.log("Got Response");
        console.log(data);
        setClientSecret(data.client_secret);

    }

    useEffect( () => {
        console.log("Searching");
        fetch(process.env.REACT_APP_SECRET_SERVER_URL+'/?'  + new URLSearchParams({
            amount: 1006}))
          .then((res) => res.json())
          .then((data) => process_secret(data) );
    }, []);
        
        
    const options = {
        clientSecret: clientSecret,
        appearance: {theme: 'stripe',},
    };
    
    //console.log(options);
    
    return(
        <div className="App">
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
             <CheckoutForm />
          </Elements>
        )}
        </div> 
    );
}

export default Payment;