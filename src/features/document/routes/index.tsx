import React, { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";

import styles from "../styles/style.module.css";
import { Layout } from "../../../components";
import { addOrder, uploadImage } from "../api";
import { UploadDocumentSchema } from "../validations";
import MainLoader from "../../../components/mainLoader";
// import { messaging } from "../../../utils/firebaseConfig";
import Resizer from "react-image-file-resizer";
import { CRIPTO_SECRETKEY, NIYO_URL } from "../../../config";
import { decodeBase64 } from "../../../utils/secureToken";
import { updateOrder } from "../../checkout/api";

function Document() {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const urlToken: any = queryParams.get("token");
  const urlUserPartnerInfo: any = queryParams.get("userPartnerInfo");
  let coupon: any = queryParams.get("coupon");
  coupon = decodeBase64(coupon);
  const paymentGateway = queryParams.get("paymentGateway");
  let topup: any = queryParams.get("topup");
  topup = decodeBase64(topup);
  const iccId = topup && !topup?.error ? topup : "";

  const documentStatus: any = window.localStorage.getItem("showDocuments");

  const [disable, setDisable] = useState(false);
  const [deviceToken, setDeviceToken] = useState("");
  const [loader, setLoader] = useState<boolean>(false);
  const [images, setImages] = useState({
    passportFront: "",
    passportBack: "",
    visa: "",
  });
  const formData = new FormData();

  // const getFireBaseToken = async () => {
  //   const token =
  //     await messaging?.firebaseDependencies?.installations?.getToken();
  //   setDeviceToken(token);
  // };
  const secureToken: any = decodeBase64(urlToken);
  const secureUserPartnerInfoId: any = decodeBase64(urlUserPartnerInfo);

  useEffect(() => {
    if (coupon && coupon?.error) {
      toast.error("Coupon not exist, something went wrong!");
      setTimeout(() => {
        navigate(-2);
      }, 5000);
    }
    if (topup && topup?.error) {
      toast.error("Topup not exist, something went wrong!");
      setTimeout(() => {
        navigate(-2);
      }, 5000);
    }
    if (
      (urlToken && secureToken?.error) ||
      (urlUserPartnerInfo && secureUserPartnerInfoId?.error)
    ) {
      window.localStorage.removeItem("niyoToken");
      if (secureToken?.error || secureUserPartnerInfoId?.error)
        toast.error("Token not exist");

      setTimeout(() => {
        window.location.href = NIYO_URL;
      }, 5000);
    }
    if (
      urlToken &&
      !secureToken?.error &&
      urlUserPartnerInfo &&
      !secureUserPartnerInfoId?.error
    )
      window.localStorage.setItem("niyoToken", secureToken);
    window.scrollTo(0, 0);
    // getFireBaseToken();
  }, []);

  const uploadFile = (formData: FormData, key: string) => {
    setLoader(true);
    toast.promise(uploadImage(formData), {
      pending: {
        render() {
          return "Uploading File";
        },
      },
      success: {
        render({ data }) {
          documentFormik.setFieldValue(key, data?.data?.fileName);
          setLoader(false);
          setImages({ ...images, [key]: data.data.url });
          return "File uploaded successfully";
        },
      },
      error: {
        render({ data }: any) {
          setLoader(false);
          return "Failed to upload File";
        },
      },
    });
  };

  const handlePassportFrontChange = async (event: any) => {
    if (event.currentTarget.files) {
      const file = event.currentTarget.files[0];

      // Mark the phone number field as touched to display validation errors
      documentFormik.setTouched({ passportFront: true });

      // Trigger validation for the entire form
      const errors = await documentFormik.validateForm();

      // Check if phoneNumber has validation errors

      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

      if (!allowedTypes.includes(file.type)) {
        documentFormik.setFieldError(
          "passportFront",
          "Invalid file type. Please upload a JPEG or PNG image."
        );
        return;
      }

      documentFormik.setTouched({ passportFront: false });

      Resizer.imageFileResizer(
        file,
        300, // max width
        300, // max height
        "JPEG", // format
        100, // quality
        0, // rotation
        (uri: any) => {
          const resizedFile = new File([uri], file.name, { type: file.type });
          const formData = new FormData();
          formData.append("file", resizedFile);
          setDisable(true);
          uploadFile(formData, "passportFront");
        },
        "blob" // output type
      );
      setDisable(true);
    }
  };

  const handlePassportBackChange = async (event: any) => {
    if (event.currentTarget.files) {
      const file = event.currentTarget.files[0];
      // Mark the phone number field as touched to display validation errors
      documentFormik.setTouched({ passportBack: true });

      // Trigger validation for the entire form
      const errors = await documentFormik.validateForm();

      // Check if phoneNumber has validation errors

      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

      if (!allowedTypes.includes(file.type)) {
        documentFormik.setFieldError(
          "passportBack",
          "Invalid file type. Please upload a JPEG or PNG image."
        );
        return;
      }
      documentFormik.setTouched({ passportBack: false });
      Resizer.imageFileResizer(
        file,
        300, // max width
        300, // max height
        "JPEG", // format
        100, // quality
        0, // rotation
        (uri: any) => {
          const resizedFile = new File([uri], file.name, { type: file.type });
          const formData = new FormData();
          formData.append("file", resizedFile);
          setDisable(true);
          uploadFile(formData, "passportBack");
        },
        "blob" // output type
      );
      setDisable(true);
    }
  };

  const handleVisaChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.currentTarget.files) {
      const file = event.currentTarget.files[0];

      // Mark the phone number field as touched to display validation errors
      documentFormik.setTouched({ visa: true });

      // Trigger validation for the entire form
      const errors = await documentFormik.validateForm();

      // Check if phoneNumber has validation errors

      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

      if (!allowedTypes.includes(file.type)) {
        documentFormik.setFieldError(
          "visa",
          "Invalid file type. Please upload a JPEG or PNG image."
        );
        return;
      }
      documentFormik.setTouched({ visa: false });
      Resizer.imageFileResizer(
        file,
        300, // max width
        300, // max height
        "JPEG", // format
        100, // quality
        0, // rotation
        (uri: any) => {
          const resizedFile = new File([uri], file.name, { type: file.type });
          const formData = new FormData();
          formData.append("file", resizedFile);
          setDisable(true);
          uploadFile(formData, "visa");
        },
        "blob" // output type
      );
      setDisable(true);
    }
  };

  const documentFormik = useFormik({
    initialValues: {
      passportFront: "",
      passportBack: "",
      visa: "",
    },
    validationSchema: UploadDocumentSchema,
    onSubmit: async (values) => {
      setLoader(true);
      let orderPayload: any = {
        documents: {
          passportFront: values.passportFront,
          passportBack: values.passportBack,
          visa: values.visa,
        },
        deviceToken: deviceToken,
        userPartnerInfoId: secureUserPartnerInfoId,
      };

      documentStatus === "true"
        ? (orderPayload.orderId = params.id)
        : (orderPayload.bundleId = params.id);

      if (iccId) orderPayload.iccid = iccId;
      if (coupon) orderPayload.couponId = coupon;

      documentStatus === "true"
        ? toast.promise(updateOrder(orderPayload), {
          pending: {
            render() {
              return "Trying to uploads documents";
            },
          },
          success: {
            render({ data }) {
              setLoader(false);
              window.localStorage.removeItem("showDocuments");
              window.localStorage.setItem("documentsUploaded", "true");
              navigate(`/checkout/${params.id}/?paymentGateway=${paymentGateway}`, {
                state: { redirected: true },
              });

              return "Documents uploaded successfully";
            },
          },
          error: {
            render({ data }: any) {
              setLoader(false);
              return data.data.message;
            },
          },
        })
        : toast.promise(addOrder(orderPayload), {
          pending: {
            render() {
              return "Trying to uploads documents";
            },
          },
          success: {
            render({ data }) {
              setLoader(false);
              if (urlToken) {
                navigate(
                  `/checkout/${data?.data?.orderId}?token=${urlToken}&paymentGateway=${paymentGateway}`,{
                    state: { redirected: true },
                  }
                );
              } else {
                navigate(
                  `/checkout/${data?.data?.orderId}/?paymentGateway=${paymentGateway}`,{
                    state: { redirected: true },
                  }
                );
              }
              // navigate(`/checkout/${data?.data?.orderId}/?paymentGateway=${paymentGateway}`)

              return "Documents uploaded successfully";
            },
          },
          error: {
            render({ data }: any) {
              setLoader(false);
              return data.data.message;
            },
          },
        });
    },
  });

  return (
    <Layout>
      {loader && <MainLoader />}
      <div className={styles.uploadDoc}>
        <div className="container">
          <h3>Upload Documents</h3>
          <div className={styles.outerUpoad}>
            <form onSubmit={documentFormik.handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className={styles.innerUpload}>
                    <h5>Passport</h5>
                    <h6>Upload Passport Images </h6>
                    <p>Upload a clear picture of your Passport</p>
                    <div className="row">
                      <div className="col-md-6">
                        <div className={styles.uploadFrame}>
                          {images.passportFront.length ? (
                            <img
                              src={images.passportFront}
                              alt="passport_front"
                            />
                          ) : (
                            <Fragment>
                              <input
                                type="file"
                                name="passportFront"
                                onChange={handlePassportFrontChange}
                                // onBlur={documentFormik.handleBlur}
                                readOnly={disable}
                              />
                              <span>
                                <i className="fas fa-plus-circle"></i>
                              </span>
                            </Fragment>
                          )}
                        </div>
                        <span className={styles.tagName}>Front</span>
                        {documentFormik.touched.passportFront &&
                          documentFormik.errors.passportFront && (
                            <div className={styles.error}>
                              {documentFormik.errors.passportFront}
                            </div>
                          )}
                      </div>
                      <div className="col-md-6">
                        <div className={styles.uploadFrame}>
                          {images.passportBack.length ? (
                            <img
                              src={images.passportBack}
                              alt="passport_back"
                            />
                          ) : (
                            <Fragment>
                              <input
                                type="file"
                                readOnly={disable}
                                name="passportBack"
                                onChange={handlePassportBackChange}
                              // onBlur={documentFormik.handleBlur}
                              />
                              <span>
                                <i className="fas fa-plus-circle"></i>
                              </span>
                            </Fragment>
                          )}
                        </div>
                        <span className={styles.tagName}>Back</span>
                        {documentFormik.touched.passportBack &&
                          documentFormik.errors.passportBack && (
                            <div className={styles.error}>
                              {documentFormik.errors.passportBack}
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className={styles.innerUpload}>
                    <h5>Visa/Ticket</h5>
                    <h6>Upload VISA/TICKET Images </h6>
                    <p>Upload a clear picture of VISA/TICKET</p>
                    <div className="row">
                      <div className="col-md-6">
                        <div className={styles.uploadFrame}>
                          {images.visa.length ? (
                            <img src={images.visa} alt="visa" />
                          ) : (
                            <Fragment>
                              <input
                                type="file"
                                readOnly={disable}
                                name="visa"
                                onChange={handleVisaChange}
                              // onBlur={documentFormik.handleBlur}
                              />
                              <span>
                                <i className="fas fa-plus-circle"></i>
                              </span>
                            </Fragment>
                          )}

                          {/* <img src={blogone} alt=""/> */}
                        </div>
                        <span className={styles.tagName}>Front</span>
                        {documentFormik.touched.visa &&
                          documentFormik.errors.visa && (
                            <div className={styles.error}>
                              {documentFormik.errors.visa}
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <button
                  className={styles.submit}
                  type="submit"
                  disabled={
                    (urlToken && secureToken?.error) || (topup && topup?.error)
                      ? true
                      : false
                  }
                >
                  submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Document;
