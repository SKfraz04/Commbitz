import Axios, { InternalAxiosRequestConfig } from "axios";

import { API_URL } from "../config";
import storage from "../utils/storage";

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
	const niyoToken = window.localStorage.getItem('niyoToken');

	const token = niyoToken ? niyoToken : storage.getToken();

	config.headers = config.headers || {};

	if (token) {
		config.headers.authorization = `Bearer ${token}`;
	}
	config.headers.Accept = "application/json";
	return config;
}

export const axios = Axios.create({
	baseURL: API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
	(response) => {
	  return response.data;
	},
	(error) => {
		if (error.response && error.response.status === 401 && storage.getToken()) {
			localStorage.clear();
			window.location.href = '/login';
		}
		return Promise.reject(error.response);
	}
  );
