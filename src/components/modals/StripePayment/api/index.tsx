import { API_URL } from '../../../../config';
import { axios } from '../../../../lib/axios';
import { PaymentIntentPayload, PaymentIntentResponse} from '../interface';

const updateStripePayment = async (values : PaymentIntentPayload) : Promise<PaymentIntentResponse> => {
    return axios.put(`${API_URL}/stripe/paymentStatus`, values);
}



export { updateStripePayment };