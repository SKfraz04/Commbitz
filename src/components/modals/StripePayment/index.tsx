import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripeForm from './StripeForm';
import StripeGoogleForm from './StripeGoogleForm';
import { STRIPE_PUBLIC_KEY } from '../../../config';
import StripeApplePay from './StripeApplePay';

interface Props {
  show: boolean;
  clientSecret: string;
  paymentId: string;
  setupIntent: string;
  paymentMethod: number;
  currency : string;
  label : string;
  amount : number;
  closeModal: () => void;
  siteDomain:string;
  orderId?:string;
}

//const stripePromise = loadStripe('pk_test_51MbzR5L8FaMTewFCEZX3m5T5alL1HNq5u2nmZi3XrwEqFeqcYYKMkePhwY1wjpEsCzrOWpaSozP1nlet7LAzKnGM00tKkapCIM');
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

const StripePaymentModal = ({ show, clientSecret, paymentId, setupIntent, currency, label, amount, closeModal, paymentMethod, siteDomain, orderId}: Props) => {
  const options = {
    clientSecret
  };
  return (
    <div className={`modal fade ${show ? 'show d-block' : 'd-none'}`} id="exampleModal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="d-flex justify-content-between align-items-center px-4 pt-4">
            <p className='mb-0 text-white'>Card Details</p>
            <i className='fa fa-times text-white cursor-pointer' onClick={closeModal} />
          </div>
          <div className="modal-body">
            <Elements stripe={stripePromise} options={options}>
              {paymentMethod === 3 && <StripeGoogleForm  paymentId={paymentId} setupIntent={setupIntent} />}
              {paymentMethod === 1 && <StripeForm orderId={orderId} paymentId={paymentId} setupIntent={setupIntent} clientSecret={clientSecret}  siteDomain={siteDomain} />}
              {paymentMethod === 4 && <StripeApplePay paymentId={paymentId} setupIntent={setupIntent} clientSecret={clientSecret} currency={currency} label={label} amount={amount} siteDomain={siteDomain} />}
              
            </Elements>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StripePaymentModal