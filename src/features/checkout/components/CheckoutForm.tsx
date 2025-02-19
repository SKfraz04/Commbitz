import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Use elements.getElement to get a reference to the mounted CardElement.
    const cardElement = elements.getElement(CardElement);
    const carddata : any = {
      type: 'card',
      card: cardElement,
    };
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" 
      disabled={!stripe}
      >
        Pay
      </button>
    </form>
  );
}

export default CheckoutForm;
