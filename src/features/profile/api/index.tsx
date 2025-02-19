import { API_URL } from "../../../config";
import { axios } from "../../../lib/axios";

const getProfile = async (): Promise<any> => {
    return axios.get(`${API_URL}/auth/profile`);
}

export {
    getProfile,
};