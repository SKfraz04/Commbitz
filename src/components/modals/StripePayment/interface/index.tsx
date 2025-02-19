interface PaymentIntentPayload {
  paymentId: string,
  cardLast4Digit?: string;
  cardId?: string;
}


interface PaymentIntentResponse {
    statusCode: number,
    message: string,
    data: {
      stripeCustomerId: string,
      ephemeralKey: string,
      setupIntent: string,
      publishableKey: string,
      paymentIntent: string,
      amount: number,
      currency: string,
      paymentIntentSecretKey: string,
      paymentId: string
    }
}

export type {
    PaymentIntentPayload,
    PaymentIntentResponse
   
};