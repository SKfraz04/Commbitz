interface RegionsResponse {
    statusCode: number;
    message: string;
    data: Regions;
};

interface Regions {
    regions: [
        {
            _id: string,
            name: string,
            flagImageUrl: string,
            historicImageUrl: string
        }
    ]
}

interface CountriesResponse {
    statusCode: number;
    message: string;
    data: Countries;
};


interface Countries {
    countries: [
        {
            _id: string,
            name: string,
            flagImageUrl: string,
            historicImageUrl: string
        }
    ]
}

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
    showDocuments: boolean;
};
interface Coupon {
    color: string;
    discount: number;
    endDate: string;
    esims: number;
    minimumSpend: number;
    minimumSpendCurrency: string;
    minimumSpendCurrencySymbol: string;
    textColor: string;
    title: string;
    _id: string;
    type: number;
    
};

interface BundlesResponse {
    statusCode: number;
    message: string;
    data: {
        bundles: Bundle[];
        count: number;
    }
};
 interface CouponResponse {
    statusCode: number;
    message: string;
    data: {
        data: Coupon[];
    }
 }

export type {
    RegionsResponse,
    CountriesResponse,
    BundlesResponse,
    Bundle,
    Coupon,
    CouponResponse
};