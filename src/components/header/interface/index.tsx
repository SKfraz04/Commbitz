interface CurrencyResponse {
  statusCode: number,
  message: string,
  data: [
    {
      _id: string,
      code: string,
      imageUrl: string,
      symbol: string
    }
  ]
}



export type {
    CurrencyResponse,

};