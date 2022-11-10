import React from 'react';
import {useState, useEffect} from 'react';
import {PaymentElement,useStripe,useElements} from '@stripe/react-stripe-js';

const CheckoutForm = () => {
   
    const [message, setMessage] = useState(null);
    const stripe = useStripe();
    const elements = useElements();  
    
    const clientSecretFromURL = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!stripe) {
      return;
    }
    
    if( clientSecretFromURL ) {
        stripe
            .retrievePaymentIntent(clientSecretFromURL)
            .then(({paymentIntent}) => {
                // Inspect the PaymentIntent `status` to indicate the status of the payment
                // to your customer.
                //
                // Some payment methods will [immediately succeed or fail][0] upon
                // confirmation, while others will first enter a `processing` state.
                //
                // [0]: https://stripe.com/docs/payments/payment-methods#payment-notification
                switch (paymentIntent.status) {
                  case 'succeeded':
                    setMessage('Success! Payment received.');
                    break;

                  case 'processing':
                    setMessage("Payment processing. We'll update you when payment is received.");
                    break;

                  case 'requires_payment_method':
                    // Redirect your user back to your payment page to attempt collecting
                    // payment again
                    setMessage('Payment failed. Please try another payment method.');
                    break;

                  default:
                    setMessage('Something went wrong.');
                    break;
                }
            });
    }
    const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    
    const {error} = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: process.env.REACT_APP_RETURN_URL,   
      },
    });
      
    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      alert(error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
            
  }  
    
  return (
    <>
       { !clientSecretFromURL &&  
     <>   
        <p>Please fill in payment information. Press Submit to complete the purchase.</p>  
        <form onSubmit={handleSubmit}>
          <PaymentElement />
          <button disabled={clientSecretFromURL||!stripe||!elements}>Submit</button>  
        </form>
     </>
       } 
    <p>{message}</p>
    </>
  );
};

export default CheckoutForm;