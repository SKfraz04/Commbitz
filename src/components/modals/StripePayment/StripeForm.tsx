import React, { useState } from "react";
import {
  useStripe,
  useElements,
  CardExpiryElement,
  CardNumberElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import styles from "./style/style.module.css";
import { updateStripePayment } from "./api";
import useStripeOptions from "../../../lib/hooks/useStripeOptions";
import { StripeCardNumberElement, StripeError } from "@stripe/stripe-js";
import { NIYO_URL } from "../../../config";

import strip from "../../../assets/images/strip.svg";
import stripone from "../../../assets/images/stripone.svg";
import striptwo from "../../../assets/images/striptwo.svg";
import stripthree from "../../../assets/images/stripthree.svg";
import stripfour from "../../../assets/images/stripfour.svg";
import stripfive from "../../../assets/images/stripfive.svg";

interface Props {
  paymentId: string;
  setupIntent: string;
  clientSecret: string;
  siteDomain: string;
  orderId?: string;
}

const StripeForm: React.FC<Props> = ({
  paymentId,
  setupIntent,
  clientSecret,
  siteDomain,
  orderId,
}) => {
  const stripe = useStripe();
  const navigate = useNavigate();
  const stripeElements = useElements();
  const stripeOptions = useStripeOptions();

  const [error, setError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const [cardholderName, setCardholderName] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !stripeElements) {
      return;
    }

    const cardElement = stripeElements.getElement(CardNumberElement);
    if (!cardElement) {
      return;
    }

    try {
      // Assuming `stripe` and `cardElement` are already initialized and available in your context
      const promise: any = stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement as StripeCardNumberElement,
            billing_details: {
              name: cardholderName,
            },
          },
        },
        {
          handleActions: true, // Disable the default next action handling.
        }
      );
      const loadingToastId = toast.loading("Processing your payment...");

      promise
        .then((result: any) => {
          if (result.error) {
            toast.update(loadingToastId, {
              render: result.error.message || "An error occurred.",
              type: "error",
              isLoading: false,
              autoClose: 5000,
            });
          } else {
            toast.update(loadingToastId, {
              render: "Payment successful!",
              type: "success",
              isLoading: false,
              autoClose: 5000,
            });
            if (siteDomain) {
              window.location.href = `${NIYO_URL}?status=true`;
            } else {
              setPaymentSuccess(true);
            }
          }
        })
        .catch((err: any) => {
          setError(err.message || "An unexpected error occurred.");
          toast.update(loadingToastId, {
            render: err.message || "An unexpected error occurred.",
            type: "error",
            isLoading: false,
            autoClose: 5000,
          });
        });
    } catch (err) {
      setError(
        (err as StripeError)?.message ?? "An unexpected error occurred."
      );
      toast.error(`${err} test`);
    }
  };

  if (paymentSuccess) {
    if (window.localStorage.getItem("niyoToken")) {
      window.localStorage.removeItem("niyoToken");
      window.location.href = "http://localhost:3001";
    } else if (window.localStorage.getItem("showDocuments") === "true") {
      navigate(`/document/${orderId}/?document=${true}`);
    } else {
      return <Navigate to="/payment" />;
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <span className="error">{error}</span>}
      <div className="formgroup">
        <div className="formgroup mb-0">
          <input
            type="text"
            className={styles.cardInput}
            style={{width:"100%", color:"#000"}}
            placeholder="Enter Cardholder name"
            onChange={(e) => setCardholderName(e.target.value)}
          />
        </div>
      </div>
      <div className="cardholder">
        <div className="cardlogo">
          <img src={stripone} alt="" />
          <img src={striptwo} alt="" />
          <img src={stripthree} alt="" />
          <img src={stripfour} alt="" />
          <img src={stripfive} alt="" />
        </div>
      </div>
      <div className="mb-3">
        {/* <label className={styles.label}>Card number</label> */}
        <CardNumberElement
          options={stripeOptions}
          className={styles.cardInput}
        />
      </div>
      <div className="row">
        <div className="col-md-6">
        <div className="mb-3">
        {/* <label className={styles.label}>Expiration date</label> */}
        <CardExpiryElement
          options={stripeOptions}
          className={styles.cardInput}
        />
      </div>
        </div>
        <div className="col-md-6">
        <div className="mb-3">
        {/* <label className={styles.label}>CVC</label> */}
        <CardCvcElement options={stripeOptions} className={styles.cardInput} />
      </div>
          </div>
      </div>
     
   
      <div className="privacyetxt">
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckChecked"
            checked
          />
          <label className="form-check-label" style={{color:"#fff"}}>
            Checked switch checkbox input
          </label>
        </div>
      </div>
      <h6>Learn More About Security</h6>
      <p className="strip-desc" style={{color:"#fff"}}>
        Stripe has been audited by a PCI-certified auditor and is certified to
        PCI Service Provider Level 1. This is the most stringent level of
        certification available in the payments industry.
        <a href="#">Learn More</a>
      </p>
      <div className="striplogo">
        <img src={strip} alt="" />
      </div>

      <button className={styles.pay} type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

export default StripeForm;
