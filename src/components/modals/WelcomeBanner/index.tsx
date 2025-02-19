import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import barcodenew from "../../../assets/images/barcodenew.jpeg";
import app from "../../../assets/images/app.png";
import paly from "../../../assets/images/paly.png";
import search from "../../../assets/images/search.png";
import sc from "../../../assets/images/sc.png";
import styles from "./style.module.css";
import AppDownloadQRCode from "./AppDownloadQRCode";
import { sendAppLinkMail } from "../../../utils/commonApi";
import { toast } from "react-toastify";
import MainLoader from "../../mainLoader";

interface WelcomeBannerProps {
  show: any;
  handleCloseModal: any;
}
const WelcomeBanner: React.FC<WelcomeBannerProps> = ({
  show,
  handleCloseModal,
}) => {
  const [emailSendError, setEmailSendError] = useState("");
  const [emailSendSuccess, setEmailSendSuccess] = useState("");
  const [loader, setloader] = useState(false);
  const formRef = useRef<any>(null);

  const handleSendMailSubmit = (event: any) => {
    event.preventDefault(); // Prevent the default form submission behavior
    setEmailSendError("");
    setEmailSendSuccess("");
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;

    if (!email) {
      setEmailSendError("Email is required!");
      return null;
    }
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      setEmailSendError("Invalid email!");
      return null;
    }
    sendAppLinkMail({ email })
      .then((res) => {
        if (res?.statusCode === 200) {
          setEmailSendSuccess("Email successfully sent!");
          formRef.current.reset();
          handleCloseModal("")
        }
        setTimeout(() => {
          setEmailSendSuccess("");
        }, 5000);
      })
      .catch((error) => {
        setEmailSendSuccess("");
        setEmailSendError("Something went wrong!!");
        setTimeout(() => {
          setEmailSendError("");
        }, 5000);
      });
  };

  return (
    <div
      className={`modal fade ${show}`}
      id="welcomemodal"
      style={{ display: show ? "block" : "none" }}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-head welHead">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={(event) => handleCloseModal("")}
            ></button>
          </div>
          <div className="modal-body p-0">
            <div className={styles.welcomeModal}>
              <div className={styles.PhoneApp}>
                <img src={sc} alt="" />
              </div>
              <div className={styles.modcontent}>
                <h3>
                  Get <span>10%</span> off <br /> on your first app booking
                </h3>
                <h5>Booking's better on the app. </h5>
              </div>
              <div className="row margin-left-auto">
                <div className="col-md-6">
                  <div className={styles.welcmodalleft}>
                    <p>Receive a magic link directly to your inbox.</p>
                    <div className={styles.formGrouo}>
                      <form onSubmit={handleSendMailSubmit} ref={formRef}>
                        <input type="text" name="email" placeholder="Email" />
                        <button type="submit">Send</button>
                        <span>
                          <img src={search} alt="" />
                        </span>
                      </form>
                    </div>
                    {emailSendError && (
                      <span className="error">{emailSendError}</span>
                    )}
                    {emailSendSuccess && <span>{emailSendSuccess}</span>}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className={styles.welcmodalright}>
                    <p>Scan the magic code to download Commbitz app</p>
                    <div className={styles.scncode}>
                      {/* <AppDownloadQRCode/> */}
                      <img src={barcodenew} alt="" />
                      <span>OR</span>
                      <div className={styles.plystore}>
                        <Link
                          to="https://play.google.com/store/apps/details?id=com.commbitz"
                          target="_blank"
                        >
                          {" "}
                          <img src={paly} alt="" />
                        </Link>
                        <Link
                          to="https://apps.apple.com/in/app/commbitz-e-sim/id6572300745"
                          target="_blank"
                        >
                          {" "}
                          <img src={app} alt="" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {loader && <MainLoader />}
    </div>
  );
};

export default WelcomeBanner;
