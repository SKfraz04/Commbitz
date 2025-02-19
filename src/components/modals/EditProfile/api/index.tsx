import { API_URL } from '../../../../config';
import { axios } from '../../../../lib/axios';
import { SignupPayload, SignupResponse, SendOtpResponse, sendOtpPayload, VeryOtpResponse, verifyOtpPayload } from '../interface';

const updateProfile = async (values: SignupPayload): Promise<SignupResponse> => {
    return axios.put(`${API_URL}/auth/profile`, values);
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
    updateProfile,
    sendOtp,
    verifyOtp,
    uploadImage
};