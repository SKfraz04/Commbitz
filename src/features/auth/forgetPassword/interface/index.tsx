import { User } from "../../login/interface";

interface ForgetPasswordPayload {
    email?: string;
    countryCode?: string;
    phoneNumber?: string;
    type: number;
};

interface ForgetPasswordResponse {
    statusCode: number;
    message: string;
    data: {
        otpId: string;
    }
};

interface VerifyOTPPayload {
    otpId: string;
    otp: string;
    type: number;
};

interface ResetPasswordPayload {
    password: string;
    otpId: string;
};

interface VerifyPasswordResponse {
    statusCode: number;
    message: string;
    data: User;
};

interface ResetPasswordResponse {
    statusCode: number;
    message: string;
}

export type {
    ForgetPasswordPayload,
    ForgetPasswordResponse,
    VerifyOTPPayload,
    ResetPasswordPayload,
    VerifyPasswordResponse,
    ResetPasswordResponse
};