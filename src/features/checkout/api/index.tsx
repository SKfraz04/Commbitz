import { API_URL } from "../../../config";
import { axios } from "../../../lib/axios";
import {
    GetOrderDetailsResponse,
    AddOrderResponse,
    AddOrderPayload,
    UpdateOrderPayload,
    PaymentIntentPayload,
    PaymentIntentResponse,
    PromosResponse,
    WalletResponse

} from "../interface";

const addOrder = async (values: AddOrderPayload): Promise<AddOrderResponse> => {
    return axios.post(`${API_URL}/order`, values);
};

const getDocumentStatus = async (values: any): Promise<any> => {
    return axios.get(`${API_URL}/bundle/showDocuments?latitude=${values?.latitude}&longitude=${values?.longitude}`);
};

const getOrderDetails = async (id: string): Promise<GetOrderDetailsResponse> => {
    return axios.get(`${API_URL}/order/details/${id}`);
};

const updateOrder = async (
    values: UpdateOrderPayload
): Promise<GetOrderDetailsResponse> => {
    return axios.put(`${API_URL}/order`, values);
};

const stripePaymentIntent = async (
    values: PaymentIntentPayload
): Promise<PaymentIntentResponse> => {
    return await axios.post(`${API_URL}/stripe/paymentIntent`, values);
};

const getPromos = async (): Promise<PromosResponse> => {
    return axios.get(`${API_URL}/promos`);
};

const walletAmtUpdate = async (values:any): Promise<WalletResponse> => {
    return axios.get(`${API_URL}/order/walletAmount`, values);
};

const razorpayAddOrder = async (values: any): Promise<any> => {
    return axios.post(`${API_URL}/razorpay/order`, values);
};
const purchaseOrder = async (values: any): Promise<any> => {
    return axios.post(`${API_URL}/order/purchaseZeroPriceOrder`, values);
};

const getOfferForYou = async (params:any): Promise<any> => {
    return axios.get(`${API_URL}/getOfferForYou`, {params});
};
const gapplyOfferForYou = async (params:any): Promise<any> => {
    return axios.post(`${API_URL}/applyOffer`, params);
};

const getDevicesName = async (params:any): Promise<any> => {
    return axios.get(`${API_URL}/esim/deviceList`, {params});
};

const getFilterData = async (params: any) : Promise<any>=> {
    return await axios.get(`${API_URL}/bundle/filter2`, { params });
}

export {
    getDevicesName,
    getOrderDetails,
    addOrder,
    updateOrder,
    stripePaymentIntent,
    getPromos,
    walletAmtUpdate,
    getDocumentStatus,
    razorpayAddOrder,
    purchaseOrder,
    getOfferForYou,
    gapplyOfferForYou,
    getFilterData
};
