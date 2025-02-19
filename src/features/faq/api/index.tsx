import { API_URL } from "../../../config";
import { axios } from "../../../lib/axios";
import { FAQListResponse } from "../interfaces";

const getFAQS = async (params : any): Promise<FAQListResponse> => {
    return await axios.get(`${API_URL}/faq`,{params} );
}

export {
    getFAQS,
};