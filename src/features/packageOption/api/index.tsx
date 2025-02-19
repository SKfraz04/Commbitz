import { API_URL } from "../../../config";
import { axios } from "../../../lib/axios";

export const getCompatibleDevice = async (params:any): Promise<any> => {
    return await axios.get(`${API_URL}/esim/check-device`, {params});
}