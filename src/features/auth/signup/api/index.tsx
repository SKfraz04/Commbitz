import { API_URL } from '../../../../config';
import { axios } from '../../../../lib/axios';
import { SignupPayload, SignupResponse, SendOtpResponse, sendOtpPayload, VeryOtpResponse, verifyOtpPayload } from '../interface';

const signup = async (values: SignupPayload): Promise<SignupResponse> => {
    return axios.post(`${API_URL}/auth/signup`, values);
}

const sendOtp = async (values: sendOtpPayload): Promise<SendOtpResponse> => {
    return axios.post(`${API_URL}/otp/send`, values);
}

const verifyOtp = async (values: verifyOtpPayload): Promise<VeryOtpResponse> => {
    return axios.post(`${API_URL}/otp/verify`, values);
}

const uploadImage = async (values:any) => {
    const headers:any = {
        'Content-Type': 'multipart/form-data',
      };
    return axios.post(`${API_URL}/common/upload`, values, headers);
}


export {
    signup,
    sendOtp,
    verifyOtp,
    uploadImage
};