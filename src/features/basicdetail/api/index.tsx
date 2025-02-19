import { API_URL } from '../../../config';
import { axios } from '../../../lib/axios';

const addEventDetails = async (values: any): Promise<any> => {
    return axios.post(`${API_URL}/event/user`, values);
}

const getCountries = async (): Promise<any> => {
    return await axios.get(`${API_URL}/regions/countries?limit=300`);
}

export {
    addEventDetails,
    getCountries
};