interface Location {
    latitude: number;
    longitude: number;
}

interface LoginResponse {
    statusCode: number;
    message: string;
    data: User;
};

interface SocialLoginResponse {
    statusCode: number;
    message: string;
    data: User;
};

interface LoginPayload {
    countryCode: string;
    countryIsoCode: string;
    deviceToken: string;
    deviceType: number;
    loginIdentifier: string;
    password: string;
    loginVia: number,
}

interface User {
    accessToken: string;
    avatar: string;
    countryCode: string;
    countryIsoCode: string;
    createdAt: string;
    currencyData: {
        _id: string;
        code: string;
        isDeleted: boolean;
        createdAt: string;
        updatedAt: string;
        // Include other properties as needed
    };
    deviceId: number;
    deviceToken: string;
    deviceType: number;
    email: string;
    fullName: string;
    isAccountVerified: boolean;
    isBlocked: boolean;
    isDeleted: boolean;
    isEmailVerified: boolean;
    isPhoneNoVerified: boolean;
    language: string;
    latitude: number;
    loginType: number;
    longitude: number;
    phoneNumber: string;
    role: number;
    socialId: string;
    stripeCustomerId: string;
    updatedAt: string;
    _id: string;
    otpId:string
}

export type {
    Location,
    LoginResponse,
    SocialLoginResponse,
    LoginPayload,
    User
};