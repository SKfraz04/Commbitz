import { API_URL } from '../../../config';
import { axios } from '../../../lib/axios';
import { RegionsResponse, CountriesResponse, BundlesResponse } from '../interface';

const getBundles = async (params: any) : Promise<BundlesResponse>=> {
    return await axios.get(`${API_URL}/bundle`, { params });
}
const getCoupons = async (params: any) : Promise<BundlesResponse>=> {
    return await axios.get(`${API_URL}/coupons`, { params: params });
}
const getBundleFilterData = async (params: any) : Promise<BundlesResponse>=> {
    return await axios.get(`${API_URL}/bundle/filter`, { params });
}

export {
    getBundles,
    getBundleFilterData
};