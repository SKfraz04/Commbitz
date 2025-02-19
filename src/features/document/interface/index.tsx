interface BundleDetailsResponse {
    statusCode: number;
    message: string;
    data: BundleDetails;
};

interface BundleDetails {
    _id: string,
    dataAmount: number,
    duration: number,
    roamingEnabled: [
        {
            name: string,
            region: string,
            iso: string,
            _id: string
        },
    ],
    speed: [],
    bundleType: number,
    name: string,
    price: number,
    priceCurrency: string
}

interface BundleDetailsPayload {
    id: "string",
}

interface AddOrderPayload {
    bundleId: string;
    documents: {
        passportFront: string;
        passportBack: string;
        visa: string;
    }
}

interface PaymentIntentPayload {
    orderId: string
}
interface UpdateOrderPayload {
    quantity: number;
    orderId: string;
}

interface AddOrderResponse {
    statusCode: number;
    message: string;
    data: {
        orderId: string
    }
}

interface BundleDetails {
    _id: string,
    dataAmount: number,
    duration: number,
    roamingEnabled: [
        {
            name: string,
            region: string,
            iso: string,
            _id: string
        },
    ],
    speed: [],
    bundleType: number,
    name: string,
    price: number,
    priceCurrency: string
}

interface GetOrderDetailsResponse {
    statusCode: number;
    message: string;
    data: {
        _id: string,
        bundleId: string,
        planPrice: number,
        discountPrice: number,
        finalPrice: number,
        quantity: number,
        priceCurrency: string,
        paymentStatus: number,
        orderStatus: number,
        createdAt: string,
        country: string,
        dataAmount: number,
        duration: number,
        roamingEnabled: [
            {
                name: string,
                region: string,
                iso: string,
                _id: string
            }
        ],
        speed: any,
        bundleType: number,
        name: string,
        promoApplied: boolean,
        couponApplied: boolean,
        esimTopup: boolean
    }
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




// interface ContactValues {
//   firstName: string;
//   lastName: string;
//   phoneNumber: string;
//   email: string;
//   // flexRadioDefault: string;
//   message: string;
//   countryCode: string;
//   subject: string;
// }


export type {

    GetOrderDetailsResponse,
    BundleDetailsPayload,
    AddOrderResponse,
    AddOrderPayload,
    UpdateOrderPayload,
    PaymentIntentPayload,
    PaymentIntentResponse

};