interface GetOrderDetailsResponse {
  statusCode: number;
  message: string;
  data: {
    orders :[{
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
    esimTopup:boolean
  },],
  count : number
  }
}



export type {
  GetOrderDetailsResponse   
};