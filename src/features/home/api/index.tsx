import { API_URL } from "../../../config";
import { axios } from "../../../lib/axios";
import {BlogResponse, BundlesResponse, CouponResponse} from '../interface'

const getBlogs = async (): Promise<BlogResponse> => {
    return await axios.get(`https://commbitz.com/blog/wp-json/custom/v1/posts`);
}

const bundleSearch = async (searchValue:any): Promise<BundlesResponse> => {
    return await axios.get(`${API_URL}/bundle?page=1&limit=1000&search=${searchValue}`);
}
const getCoupons=async ():Promise<CouponResponse>=>{
    return await axios.get(`${API_URL}/coupons`);
}

const getbundles = async (params:any): Promise<BundlesResponse> => {
    return await axios.get(`${API_URL}/bundle`, {params});
}

const getCountries = async (params:any): Promise<BundlesResponse> => {
    return await axios.get(`${API_URL}/regions/countries`, {params});
}

const getRegions = async (params:any): Promise<BundlesResponse> => {
    return await axios.get(`${API_URL}/regions`, {params});
}
const getBundleDetails = async (bundleId:any): Promise<BundlesResponse> => {
    return await axios.get(`${API_URL}/bundle/details/${bundleId}`);
}
const featureNewsList = async (params:any): Promise<any> => {
    return await axios.get(`${API_URL}/feature-listing`, {params});
}



export {
    getBlogs,
    bundleSearch,
    getCoupons,
    getbundles,
    getCountries,
    getRegions,
    getBundleDetails,
    featureNewsList
};