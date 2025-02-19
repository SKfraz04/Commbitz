interface Location {
    latitude: number;
    longitude: number;
}

interface SignupResponse {
    statusCode: number;
    message: string;
    data: User;
};


interface SignupPayload {
    fullName : string;
    email:string;
    avatar: string;
    isEmailVerified : boolean;
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
}



interface SendOtpResponse {
    statusCode: number;
    message: string;
    data: SendOtpId;
};

interface VeryOtpResponse {
    statusCode: number;
    message: string;
    data: VerifyOtpId;
};

interface SendOtpId{
    otpId: string
  }

interface VerifyOtpId{
    isPhoneNoVerified: boolean,
    isEmailVerified: boolean,
  }

interface sendOtpPayload {
    userId: "string",
    email: "string",
    phoneNumber: "string",
    countryCode: "string",
    type: Number
    }

interface verifyOtpPayload {
        otpId: "string",
        otp: "string",
        type: number
      }


export type {
    Location,
    SignupResponse,
    SignupPayload,
    SendOtpResponse,
    sendOtpPayload,
    verifyOtpPayload,
    VeryOtpResponse
};