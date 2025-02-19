
interface BlogResponse {
    statusCode: number;
    message: string;
    data: Blogs;
};

interface CouponResponse {
    statusCode: number;
    message: string;
    data: [
        {
          _id: string;
          title: string,
          discount: number,
          minimumSpend: number,
          minimumSpendCurrency: string,
          endDate: string,
          color: string,
          textColor: string,
          esims: number,
          type: number,
          minimumSpendCurrencySymbol: number,
        }
      ]
};

interface Blogs {
    blogs: [
        {
            _id: string,
            title: string,
            topic: string,
            status: number,
            type: number,
            rating: number,
            createdAt: string,
            userFullName: string,
            userId: string,
            image: string
        }
    ],
    count: 1
}


interface BundlesResponse {
    statusCode: number;
    message: string;
    data: {
        bundles: Bundle[];
        count: number;
    }
};
interface Bundle {
    bundleType: number;
    dataAmount: number;
    duration: number;
    name: string;
    price: number;
    priceCurrency: string;
    priceSymbol: string;
    speed: string[];
    speed1: string[];
    _id: string;
    documentsRequired: boolean;
};

export type { BlogResponse, BundlesResponse,CouponResponse };