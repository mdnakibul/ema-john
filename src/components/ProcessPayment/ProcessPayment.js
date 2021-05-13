import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const ProcessPayment = (props) => {
    const stripePromise = loadStripe('pk_test_51IeJsdDokFTmd1K0tHb93mBXXWlPPHEURCta3qEwH7adZ7D7G5VQ7C8GNaDtmxc3rTAK8yKHqjnp3fLsAfolhLGb00v4CAlrOo');
    console.log(props.handlePayment);
    console.log(props);
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm handlePayment={props.handlePayment}/>
        </Elements>
    );
};

export default ProcessPayment;