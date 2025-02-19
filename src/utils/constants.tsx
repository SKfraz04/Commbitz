const DATE_FORMAT = "MMM DD, YYYY";

const DEVICE_TYPE = {
    ANDROID: 1,
    IOS: 2,
    WEB: 3,
};
const PAYMENT_METHOD = {
    STRIPEPAY : 1,
    RAZORPAY : 2,
    APPLEPAY : 3
}

const LOGIN = {
    OTPPASS : 1,
    NORMALPASS : 2
}

const BUNDLE_TYPE = {
    LOCAL: 1,
    MULTIVERSE: 2,
    POPULAR:3
};

const THEME = {
    DARK: 'DARK',
    LIGHT: 'LIGHT',
};

const DATAAMOUNT = [500, 1000, 2000, 3000, 4000, 5000, 10000, 20000, -1]
const PLANDAYS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 60, 90]

export {
    DATE_FORMAT,
    DEVICE_TYPE,
    BUNDLE_TYPE,
    THEME,
    LOGIN,
    PAYMENT_METHOD,
    DATAAMOUNT,
    PLANDAYS
};