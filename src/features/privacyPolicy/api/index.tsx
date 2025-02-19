import axios from "axios";
import { API_URL } from "../../../config";

const getPages = async (params:any): Promise<any> => {
  return await axios.get(
    `${API_URL}/cms`,
    { params},
  );
};

export {
  getPages,
};