import { API_URL } from "../../../config";
import { axios } from "../../../lib/axios";
import {  GetInventoryResponse } from "../interface";

const getEsimList = async (): Promise<GetInventoryResponse> => {
  return await axios.get(`${API_URL}/esim/list`);
};

export {
  getEsimList,

};
