import { API_URL } from "../../../config";
import { axios } from "../../../lib/axios";
import {  GetInventoryResponse } from "../interface";

const getInventory = async (values : any): Promise<GetInventoryResponse> => {
  return await axios.get(`${API_URL}/inventory/?page=${values?.pageNo}&limit=${values?.limit}`);
};



export {
  getInventory

};
