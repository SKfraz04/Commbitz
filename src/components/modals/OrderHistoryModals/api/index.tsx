import { API_URL } from "../../../../config";
import { axios } from "../../../../lib/axios";
import {GetOrderDetailsResponse} from "../interface";


const getOrderDetails = async (id: string): Promise<GetOrderDetailsResponse> => {
    return axios.get(`${API_URL}/order/details/${id}`);
};

export {
    getOrderDetails
};
