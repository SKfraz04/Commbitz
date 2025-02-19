import GooglePayButton from '@google-pay/button-react';
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { updateStripePayment } from './api';
import MainLoader from '../../mainLoader';
import { STRIPE_PUBLIC_KEY } from '../../../config';

interface Props {
  paymentId: string;
  setupIntent: string;
}

const StripeGoogleForm: React.FC<Props> = ({ paymentId, setupIntent }) => {
  const navigate = useNavigate()
  const [loader, setLoader] = useState<boolean>(false);

  const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

  return (
    <>
      {loader && <MainLoader />}
      <GooglePayButton
        environment="PRODUCTION"
        paymentRequest={{
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [
            {
              type: 'CARD',
              parameters: {
                allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                allowedCardNetworks: ["AMEX", "DISCOVER", "INTERAC", "JCB", "MASTERCARD", "VISA"]
              },
              tokenizationSpecification: {
                type: 'PAYMENT_GATEWAY',
                parameters: {
                  "gateway": "stripe",
                  "stripe:version": "2024-04-10",
                  "stripe:publishableKey": STRIPE_PUBLIC_KEY // your stripe publishable key
                },
              }
            },
          ],
          merchantInfo: {
            merchantId: 'BCR2DN4TWWMNVOZJ',
            merchantName: 'Commbitz',
          },
          transactionInfo: {
            totalPriceStatus: 'FINAL',
            totalPrice: '0.00',
            currencyCode: 'USD',
          }
        }}
        onLoadPaymentData={async (paymentRequest: any) => {
          setLoader(true)
          const token = JSON.parse(paymentRequest?.paymentMethodData?.tokenizationData?.token)
          try {
            const stripe = await stripePromise;

            if (!stripe) {
              throw new Error('Stripe is not initialized');
            }

            const rs = await stripe.confirmCardSetup(setupIntent, {
              payment_method: {
                card: {
                  token: token?.id
                }
              }
            });
            toast.promise(
              updateStripePayment({ paymentId, cardId: rs?.setupIntent?.payment_method as string }),
              {
                pending: {
                  render() {
                    return 'Trying to process payment...';
                  }
                },
                success: {
                  render() {
                    navigate("/payment")
                    return 'Payment Successful';
                  }
                },
                error: {
                  render({ data }: any) {
                    setLoader(false)
                    return data.data.message || 'An error occurred while processing your payment.';
                  }
                }
              });
          } catch (error) {
            console.log(error)
          }
        }}
      />
    </>
  );
};

export default StripeGoogleForm;

