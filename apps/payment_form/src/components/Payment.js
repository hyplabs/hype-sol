import React from 'react';
import {useState, useEffect} from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from './CheckoutForm.js';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC);
 
function Payment() {
    const [clientSecret, setClientSecret] = useState("");
    function process_secret(data)
    {
        setClientSecret(data.client_secret);
    }

    useEffect( () => {
        // TODO: When you use this -- price your product / purchase
        // You may also want to pass product codes or other info to the server
        let example_purchase_amount = 1050; // 10.50 CAD
        fetch(process.env.REACT_APP_SECRET_SERVER_URL+'/?'  + new URLSearchParams({
            amount: example_purchase_amount}))
          .then((res) => res.json())
          .then((data) => process_secret(data) );
    }, []);
        
    const options = {
        clientSecret: clientSecret,
        appearance: {theme: 'stripe',},
    };
    
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
