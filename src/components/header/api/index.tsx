import { API_URL } from '../../../config';
import { axios } from '../../../lib/axios';
import { CurrencyResponse } from '../interface';

const getCurrency = async (): Promise<CurrencyResponse> => {
    return axios.get(`${API_URL}/currency`);
}
const currencyUpdate = async (value:any): Promise<any> => {
    return axios.put(`${API_URL}/auth/profile`, value);
}

const getLanguage = async (): Promise<any> => {
    return axios.get(`${API_URL}/language`);
}

export { getCurrency, currencyUpdate, getLanguage };