import { API_URL } from "../../../../config";
import { axios } from "../../../../lib/axios";
import { LoginPayload, LoginResponse, SocialLoginResponse } from "../interface";

const login = async (values: LoginPayload): Promise<LoginResponse> => {
  return axios.post(`${API_URL}/auth/login`, values);
};
const generateToken = async (values: any): Promise<any> => {
  return axios.post(`${API_URL}/auth/generateToken`, values);
};

const socialLogin = async (values : any): Promise<any> => {
  return axios.post(`${API_URL}/auth/socialLogin`, values);
};

const fetchGoogleUserInfo = async (token: string) => {
  const response = await fetch(   
    `https://www.googleapis.com/oauth2/v3/userinfo`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.json();
};

export { login, socialLogin, fetchGoogleUserInfo, generateToken };
