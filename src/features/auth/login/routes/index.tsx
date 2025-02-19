import { useEffect, useState, useRef, useMemo } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import PhoneInput, {
  isPossiblePhoneNumber,
  parsePhoneNumber,
} from "react-phone-number-input";

import styles from "../styles/login.module.css";
import LoginLeft from "./LoginLeft";
import useAuth from "../../../../lib/hooks/useAuth";
import { GetGeoLocations } from "../../../../utils/GetGeoLocation";
import { fetchGoogleUserInfo, generateToken, login, socialLogin } from "../api";
import { AppleIcon, GoogleIcon, Logo } from "../../../../assets/images";
import { Location } from "../interface";
import { loginPasswordSchema, loginEmailSchema } from "../validations";
import { APP_ROUTES } from "../../../../utils/routes";
import MainLoader from "../../../../components/mainLoader";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { setUser } from "../../../../redux/slices/userDetailSlice";
import eye from "../../../../assets/images/eye.png";
import closeye from "../../../../assets/images/closeye.png"
import rightLogo from "../../../../assets/images/logo.png"
import { DEVICE_TYPE, LOGIN } from "../../../../utils/constants";
import VerifyOtpModal from "../../../../components/modals/Verifition.tsx";
import { verifyOtp } from "../../signup/api";



const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [passwordShow, setPasswordShow] = useState<boolean>(false);
  const [loginContinuous, setLoginContinuous] = useState<boolean>(false);
  const [loginIdentifier, setIoginIdentifier] = useState<any>("");
  const [otpId, setOtpId] = useState<any>("");
  const [show, setShow] = useState("")
  const [timer, setTimer] = useState(0);
  const current_url: any = window.localStorage.getItem("current_url");

  const handleSuccess = async (credentialResponse: any) => {
    try {
      setLoader(true);
      const userInfo: any = await fetchGoogleUserInfo(
        credentialResponse?.access_token
      );

      toast.promise(socialLogin({
        socialId: userInfo?.sub,
        email: userInfo?.email,
        deviceType: DEVICE_TYPE.WEB,
        loginType: 2
      }), {
        pending: {
          render() {
            return "Trying to login user";
          },
        },
        success: {
          render({ data }) {
            setLoader(false);
            if (current_url) navigate(current_url)
            loginUser(data.data.accessToken);
            return "Login Successful";
          },
        },
        error: {
          render({ data }: any) {
            setLoader(false);
            return data.data.message;
          },
        },
      });
    } catch (err) {
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      handleSuccess(tokenResponse);
    },
  });

  const { isAuthenticated, loginUser } = useAuth();
  const phoneNumberRef = useRef<any>(null);
  const [isPhoneNumber, setPhoneNumberInput] = useState<boolean>(false);
  const [geoLocations, setGeoLocations] = useState<Location | null>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const [submitButtonValue, setSubmitButtonValue] = useState<number>(2);
  const [fieldForVerify, setFieldForVerify] = useState('')

  useEffect(() => {
    if (
      isPhoneNumber &&
      phoneNumberRef &&
      phoneNumberRef.current &&
      phoneNumberRef.current.focus
    ) {
      phoneNumberRef.current.focus();
    }
  }, [isPhoneNumber]);

  const formik = useFormik({
    initialValues: {
      loginIdentifier: "",
      password: "",
      deviceType: DEVICE_TYPE.WEB,
      countryIsoCode: "IN",
      loginVia: 0,
      countryCode: "",
    },
    validationSchema: useMemo(() => {
      if (!loginContinuous) return loginEmailSchema;
      if(submitButtonValue == 2 ) return loginPasswordSchema;
    }, [loginContinuous, submitButtonValue]),

    onSubmit: async (values) => {
      const loginPayload: any = {
        deviceType: DEVICE_TYPE.WEB,
      };

      if (!loginContinuous) {
        if (!isPhoneNumber) {
          const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if (!emailRegex.test(values.loginIdentifier)) {
            formik.setFieldError("loginIdentifier", "Invalid Email");
            return;
          }
          setLoginContinuous(true)
          setIoginIdentifier(values.loginIdentifier)
        } else {
          if (values.loginIdentifier.length < 10 || values.loginIdentifier.length > 13) {
            formik.setFieldError("loginIdentifier", "Please enter valid phone number!");
            return;
          }
          setIoginIdentifier(values.loginIdentifier)
          setLoginContinuous(true)
        }
        return
      }

      if (isPossiblePhoneNumber(loginIdentifier)) {
        const parsedNumber = parsePhoneNumber(loginIdentifier);
        loginPayload.phoneNumber = parsedNumber?.nationalNumber as string;
        loginPayload.countryCode = ("+" + parsedNumber?.countryCallingCode) as string;
      } else {
        loginPayload.email = loginIdentifier
      }

      if (submitButtonValue == LOGIN.NORMALPASS) {
        setLoader(true);
        setOtpId("");
        loginPayload.loginVia = LOGIN.NORMALPASS;
        loginPayload.password = values.password;
        toast.promise(login(loginPayload), {
          pending: {
            render() {
              return "Trying to login user";
            },
          },
          success: {
            render({ data }) {
              setLoader(false);
              if (current_url) navigate(current_url)
              loginUser(data.data.accessToken);

              return "Login Successful";
            },
          },
          error: {
            render({ data }: any) {
              setLoader(false);
              return data.data.message;
            },
          },
        });
        return
      }

      loginPayload.loginVia = LOGIN.OTPPASS;
      toast.promise(login(loginPayload), {
        pending: {
          render() {
            return "Trying to login user";
          },
        },
        success: {
          render({ data }) {
            setLoader(false);
            setOtpId(data.data.otpId);
            setShow("show");
            setTimer(Date.now() + 30000);
            return "OTP sent Successful";
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

  useEffect(() => {
    if (!formik.values.loginIdentifier) {
      setPhoneNumberInput(false);
    }
  }, [formik.values.loginIdentifier]);

  if (isAuthenticated) {
    return <Navigate to={APP_ROUTES.HOME} />;
  }

  const toggleOldPasswordVisibility = () => {
    setPasswordShow(passwordShow ? false : true)
  }


  const otpVeriFy = (payload: any) => {
    setLoader(true)
    toast.promise(
      verifyOtp(payload),
      {
        pending: {
          render() {
            return 'Trying to sent otp';
          }
        },
        success: {
          render({ data }: any) {
            setLoader(false)
            generateToken({
              userId: data?.data?._id,
              deviceType: DEVICE_TYPE.WEB
            }).then((res) => {
              if (current_url) navigate(current_url)
              loginUser(res.data.accessToken);
              setShow("")
            }).catch((error) => {
              console.log(error)
              setShow("")
              setLoader(false)
            })
            return 'return "Login Successful';
          }
        },
        error: {
          render({ data }: any) {
            setLoader(false)
            return data.data.message;
          }
        }
      });
  }

  const handleResendOTP = () => {
    setShow("")
    formik.submitForm()
  }
  const ClosedModal = (newValue: any) => {
    setShow(newValue);
  };
  
  return (
    <div className={styles.loginPage}>
      {loader && <MainLoader />}
      <div className="row m-0">
        <LoginLeft />
        <div className="col-md-6 p-0">
          <div className={styles.loginrelate}>
            <div className={styles.loginRight}>
              <div className={styles.topLogin}>
                <div className='row'>
                  <div className='col-md-6'>
                    {/* <p>Already have an account? <Link to="/signup"> Signup</Link></p> */}
                  </div>
                  <div className='col-md-6'>
                    <span><Link to="/contact">Need Help?</Link></span>
                  </div>
                </div>
              </div>
              <h4>
                Signin to
                <Link to="/"><img src={rightLogo} alt="" /></Link>
              </h4>
              <form
                onSubmit={(e: any) => {
                  e.preventDefault();
                  setSubmitButtonValue(e.nativeEvent.submitter.value);

                  setTimeout(() => {
                    formik.handleSubmit(e);
                  }, 0);
                }}
              >
                {!loginContinuous ?
                  <>
                    <div className={styles["form-group"]}>
                      <label className="d-flex align-items-center">
                        Email or Phone Number
                      </label>
                      {isPhoneNumber ? (
                        <PhoneInput
                          placeholder="Enter phone number"
                          onChange={(value) =>
                            formik.setFieldValue("loginIdentifier", value)
                          }
                          value={formik.values.loginIdentifier}
                          ref={phoneNumberRef}
                          className={styles.phoneNumber}
                        />
                      ) : (
                        <input
                          type="text"
                          name="loginIdentifier"
                          placeholder="Please enter your Email or Mobile Number"
                          onChange={(event) => {
                            const {
                              target: { value },
                            } = event;
                            const numberRegex = /^[0-9]+$/;

                            if (numberRegex.test(value)) setPhoneNumberInput(true);
                            formik.setFieldValue("loginIdentifier", value);
                          }}
                          onBlur={formik.handleBlur}
                          value={formik.values.loginIdentifier}
                        />
                      )}

                      {formik.touched.loginIdentifier &&
                        formik.errors.loginIdentifier && (
                          <div className={styles.error}>
                            {formik.errors.loginIdentifier}
                          </div>
                        )}
                    </div>

                    <div className={styles["form-group"]}>
                      <button type="submit" value="2" className={styles['login-submit']}>Next</button>
                    </div>
                  </>
                  :
                  <>
                    <div className={styles["form-group"]}>
                      <label className="d-flex align-items-center">Password</label>
                      <input
                        type={passwordShow ? "text" : "password"}
                        name="password"
                        placeholder="input your password in here"
                        onChange={(e) => {
                          setSubmitButtonValue(2);
                          formik.setFieldValue("password", e.target.value)
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault(); // Prevent default form submission
                            setSubmitButtonValue(2);
                            setTimeout(() => {
                              formik.handleSubmit();
                            }, 0);
                          }
                        }}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                      />
                      <span onClick={toggleOldPasswordVisibility}>
                        {passwordShow ? <img src={eye} alt="" /> : <img src={closeye} alt="" />}</span>
                      {formik.touched.password && formik.errors.password && (
                        <div className={styles.error}>{formik.errors.password}</div>
                      )}
                    </div>
                    <div className={styles["form-group"]}>
                      <div className={styles.forgot}>
                        <a href={APP_ROUTES.FORGET_PASSWORD}>Forgot password?</a>
                        <button type="submit" value="1" className={styles.otp}>Login with OTP</button>
                      </div>
                    </div>

                    <div className={styles["form-group"]}>
                      <button type="submit" value="2" className={styles['login-submit']}>Login</button>
                    </div>
                  </>
                }
                <div className={styles.ExtraSign}>
                  <div className='col-md-12'>
                    <p>Don't have an account? <Link to="/signup"> Signup</Link></p>
                  </div>
                </div>
                <div className={styles.login}>
                  <span>Or continue with</span>
                  <hr />
                </div>
                <div className={styles.social}>
                  <ul>
                    <li onClick={() => googleLogin()}>
                      <a href="#">
                        <img src={GoogleIcon} alt="" />
                        Google
                      </a>
                    </li>
                    {/* <li>
                      <a href="#">
                        <img src={AppleIcon} alt="" />
                        Apple
                      </a>
                    </li> */}
                  </ul>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {show &&
        <VerifyOtpModal
          show={show}
          otpId={otpId}
          timer={timer}
          otpVeriFy={otpVeriFy}
          fieldForVerify={fieldForVerify}
          handleResendOTP={handleResendOTP}
          ClosedModal={ClosedModal}
        />
      }
    </div>
  );
};

export default Login;
