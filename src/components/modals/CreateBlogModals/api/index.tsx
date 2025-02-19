import { API_URL } from '../../../../config';
import { axios } from '../../../../lib/axios';
import { CreateBlogPayload, CreateBlogResponse } from '../interface';


const createBlogApi = async (values: CreateBlogPayload): Promise<CreateBlogResponse> => {
    return axios.post(`${API_URL}/blogs`, values);
}

const uploadImage = async (values:any) => {
    const headers:any = {
        'Content-Type': 'multipart/form-data',
      };
    return axios.post(`${API_URL}/common/upload`, values, headers);
}


export {
    createBlogApi,
    uploadImage
};