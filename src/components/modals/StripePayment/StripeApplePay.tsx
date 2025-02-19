import React, { useState, useEffect } from 'react';
import { useStripe, PaymentRequestButtonElement } from '@stripe/react-stripe-js';
import { StripePaymentRequestButtonElementOptions, PaymentRequest as StripePaymentRequest } from '@stripe/stripe-js';

interface Props {
    paymentId: string;
    setupIntent: string;
    clientSecret: string;
    siteDomain: string;
    currency: string;
    label: string;
    amount: number;
}

const StripeApplePay = ({ clientSecret, paymentId, setupIntent, siteDomain, currency, label, amount }: Props) => {
    const stripe = useStripe();
    const [paymentRequest, setPaymentRequest] = useState<StripePaymentRequest | null>(null);

    useEffect(() => {
        if (stripe) {
            const pr = stripe.paymentRequest({
                country: 'US',
                currency,
                total: {
                    label,
                    amount, // Amount in cents or paise
                },
                requestPayerName: true,
                requestPayerEmail: true,
                requestPayerPhone: true,
                disableWallets: ["link"]
            });

            pr.canMakePayment().then((result) => {
                if (result && (result.googlePay || result.applePay)) { // Check specifically for Google Pay or Apple Pay support
                    setPaymentRequest(pr);
                } else {
                    console.log("Google Pay or Apple Pay is not available on this device");
                }
            }).catch(err => {
                console.error("Error checking payment availability", err);
            });

            pr.on('paymentmethod', async (ev) => {
                try {
                    const { setupIntent, error } = await stripe.confirmCardSetup(
                        clientSecret,
                        { payment_method: ev.paymentMethod.id },
                        { handleActions: false }
                    );

                    if (error) {
                        ev.complete('fail');
                        console.error("Payment failed", error);
                    } else {
                        ev.complete('success');
                        if (setupIntent && setupIntent.status === 'requires_action') {
                            await stripe.confirmCardSetup(clientSecret);
                        }
                    }
                } catch (err) {
                    console.error("Error during payment", err);
                    ev.complete('fail');
                }
            });
        }
    }, [stripe, clientSecret, currency, label, amount]);

    if (!paymentRequest) {
        return <div>Payment methods are not available on this device</div>;
    }

    const options: StripePaymentRequestButtonElementOptions = {
        paymentRequest: paymentRequest,
        style: {
            paymentRequestButton: {
                type: 'buy',
                theme: 'dark',
                height: '64px',
            },
        },
    };

    return (
        <PaymentRequestButtonElement
            options={options}
            onClick={() => console.log("Payment button clicked")}
        />
    );
};

export default StripeApplePay;
