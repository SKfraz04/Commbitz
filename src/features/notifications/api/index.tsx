import { API_URL } from "../../../config";
import { axios } from "../../../lib/axios";
import { GetOrderDetailsResponse } from "../interface";

const geNotificationsApi = async (values:any): Promise<GetOrderDetailsResponse> => {
  return await axios.get(`${API_URL}/notifications?page=${values?.pageNo}&limit=${values?.limit}`);
};

export {
  geNotificationsApi
};
