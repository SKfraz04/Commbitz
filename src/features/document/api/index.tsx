import { API_URL } from "../../../config";
import { axios } from "../../../lib/axios";
import {
    GetOrderDetailsResponse,
    AddOrderResponse,
    AddOrderPayload,

} from "../interface";

const addOrder = async (values: AddOrderPayload): Promise<AddOrderResponse> => {
    return axios.post(`${API_URL}/order`, values);
};

const getOrderDetails = async (id: string): Promise<GetOrderDetailsResponse> => {
    return axios.get(`${API_URL}/order/details/${id}`);
};

const uploadImage = async (values:any) => {
    const headers:any = {
        'Content-Type': 'multipart/form-data',
      };
    return axios.post(`${API_URL}/common/upload`, values, headers);
}

export {
    getOrderDetails,
    addOrder,
    uploadImage,
};
