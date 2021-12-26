import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51Jw2byBqVzzz64BlCZzYZ8HXFBqE7Hmj4CxvSDtuKeTncwolp3eVFp2JaXPnUXqSdcZMd7wAOVdBPrKVRzE35TgM00EfbTYyUQ');

const Payment = () => {
   return (
      <>
         <Elements stripe={stripePromise}>
            <CheckoutForm />
         </Elements>
      </>
   );
};

export default Payment;