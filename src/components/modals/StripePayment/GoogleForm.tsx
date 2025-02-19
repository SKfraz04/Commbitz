import React, { useState } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';
import GooglePayButton from '@google-pay/button-react';
import { updateStripePayment } from './api';
import useStripeOptions from '../../../lib/hooks/useStripeOptions';

interface Props {
    paymentId: string;
}

const GoogleStripeForm = ({ paymentId }: Props) => {
    const stripe = useStripe();
    const stripeElements = useElements();
    const stripeOptions = useStripeOptions();

    const [error, setError] = useState<string | null>(null);
    const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);

    const handleGooglePayPayment = async () => {
        // Implement Google Pay payment logic here
        // This function will be called when a user clicks the Google Pay button
        // You need to handle payment processing using Google Pay API
    };

    const handleStripePayment = async () => {
        if (!stripe || !stripeElements) {
            return;
        }

        const { error, paymentMethod } : any = await stripe.createPaymentMethod({
            type: 'card',
            card: stripeElements.getElement('cardNumber') as any
        });

        if (error) {
            setError(error.message);
        } else {
            try {
                await updateStripePayment({ paymentId, cardId: paymentMethod.id });
                setPaymentSuccess(true);
            } catch (error) {
                setError('An error occurred while processing your payment.');
            }
        }
    };
    handleStripePayment()
    const handlePayment = async () => {
        if (window.PaymentRequest) {
            await handleGooglePayPayment();
        } else {
            await handleStripePayment();
        }
    };

    if (paymentSuccess) {
        return <Navigate to="/payment" />;
    }

    return (
        <GooglePayButton
            environment="TEST"
            paymentRequest={{
                apiVersion: 2,
                apiVersionMinor: 0,
                allowedPaymentMethods: [
                    {
                        type: 'CARD',
                        parameters: {
                            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                            allowedCardNetworks: ['MASTERCARD', 'VISA'],
                        },
                        tokenizationSpecification: {
                            type: 'PAYMENT_GATEWAY',
                            parameters: {
                                gateway: 'example',
                                gatewayMerchantId: 'exampleGatewayMerchantId',
                            },
                        },
                    },
                ],
                merchantInfo: {
                    merchantId: '12345678901234567890',
                    merchantName: 'Demo Merchant',
                },
                transactionInfo: {
                    totalPriceStatus: 'FINAL',
                    totalPriceLabel: 'Total',
                    totalPrice: '100.00',
                    currencyCode: 'USD',
                    countryCode: 'US',
                },
            }}
            onLoadPaymentData={(paymentRequest: any) => {
                console.log('load payment data', paymentRequest);
            }}
            onClick={handlePayment}
        />
    );
};

export default GoogleStripeForm;
