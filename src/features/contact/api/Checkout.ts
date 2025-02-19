import axios from "axios";
import { ContactValues } from "../types/Contact";
import { API_URL } from "../../../config";


const ContactValuesData = async (values: ContactValues): Promise<any> => {
  return await axios.post(
    `${API_URL}/cms/contactUs`,
    values
  );
};

const ContactUsType = async (): Promise<any> => {
  return await axios.get(
    `${API_URL}/cms/contactUs/type`
  );
};

const ContactInfo = async (): Promise<any> => {
  return await axios.get(`${API_URL}/cms?type=3`)
}

export {
  ContactValuesData,
  ContactUsType,
  ContactInfo
}
