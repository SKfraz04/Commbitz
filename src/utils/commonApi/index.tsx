import { API_URL } from "../../config";
import { axios } from "../../lib/axios";
import {MailPayload, MailResponse } from "./interface";

const sendAppLinkMail = async (values: MailPayload): Promise<MailResponse> => {
  return axios.post(`${API_URL}/appLink`, values);
};


export { sendAppLinkMail };
