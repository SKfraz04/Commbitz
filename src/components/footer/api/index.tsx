import { API_URL } from '../../../config';
import { CountriesResponse } from '../../../features/esim/interface';
import { axios } from '../../../lib/axios';

const getCountries = async (): Promise<CountriesResponse> => {
    return await axios.get(`${API_URL}/regions/countries`);
}


export {
    getCountries
};