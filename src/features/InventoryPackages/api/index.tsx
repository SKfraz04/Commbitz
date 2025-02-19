import { API_URL } from "../../../config";
import { axios } from "../../../lib/axios";
import {  GetInventoryResponse } from "../interface";

const getOrderReferenc = async (id:string): Promise<GetInventoryResponse> => {
  return await axios.get(`${API_URL}/inventory/details/${id}`);
};

const addToEsim = async (values:any): Promise<GetInventoryResponse> => {
  return await axios.post(`${API_URL}/esim`, values);
};


export {
  getOrderReferenc,
  addToEsim

};
