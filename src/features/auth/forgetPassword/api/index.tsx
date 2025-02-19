import { API_URL } from '../../../../config';
import { axios } from '../../../../lib/axios';
import { ForgetPasswordPayload, ForgetPasswordResponse, ResetPasswordPayload, ResetPasswordResponse, VerifyOTPPayload, VerifyPasswordResponse } from '../interface';

const forgetPassword = async (values: ForgetPasswordPayload): Promise<ForgetPasswordResponse> => {
    return axios.post(`${API_URL}/otp/send `, values);
}

const verifyOTP = async (values: VerifyOTPPayload): Promise<VerifyPasswordResponse> => {
    return axios.post(`${API_URL}/otp/verify `, values);
}

const resetPassword = async (values: ResetPasswordPayload): Promise<ResetPasswordResponse> => {
    return axios.post(`${API_URL}/user/resetPassword`, values);
}

export {
    forgetPassword,
    verifyOTP,
    resetPassword
};