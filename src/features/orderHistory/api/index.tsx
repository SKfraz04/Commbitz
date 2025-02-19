import { API_URL } from "../../../config";
import { axios } from "../../../lib/axios";
import { GetOrderDetailsResponse } from "../interface";

const getOrderHistories = async (values:any): Promise<GetOrderDetailsResponse> => {
  return await axios.get(`${API_URL}/order?page=${values?.pageNo}&limit=${values?.limit}&orderStatus=${values?.status}`);
};

export {
  getOrderHistories
};
