import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import PhoneInput, { isPossiblePhoneNumber, isValidPhoneNumber, parsePhoneNumber } from 'react-phone-number-input';
import eye from "../../../../assets/images/eye.png";
import closeye from "../../../../assets/images/closeye.png"
import styles from '../styles/style.module.css';
import { GetGeoLocations } from '../../../../utils/GetGeoLocation';
import useAuth from '../../../../lib/hooks/useAuth';
import LoginLeft from '../../login/routes/LoginLeft';
import { signup, sendOtp, verifyOtp, uploadImage } from '../api';
import { Location } from '../interface';
import { Signupschema } from '../validations';
import VerifyOtpModal from '../../../../components/modals/Verifition.tsx';
import { DEVICE_TYPE } from '../../../../utils/constants';
import { AddIcon, Logo } from '../../../../assets/images';
import MainLoader from '../../../../components/mainLoader';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../../../redux/slices/userDetailSlice';
import { Spinner } from 'react-bootstrap';
import rightLogo from "../../../../assets/images/logo.png"
import placeholdimage from "../../../../assets/images/placeholdimage.jpeg"

const Signup: React.FC = () => {
    const userDetail = useSelector((state: any) => state.getUserDetail?.user);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>();
    const [geoLocations, setGeoLocations] = useState<Location | null>(null);
    const { isAuthenticated, loginUser } = useAuth();
    const [previewImage, setImagePreview] = useState("");
    const [otpId, setOTPID] = useState('');
    const [show, setShow] = useState("")
    const [timer, setTimer] = useState(0);
    const [isPhoneNoVerified, setPhoneNoVerified] = useState(false)
    const [isEmailVerified, setIsEmailVerified] = useState(false)
    const [phoneVerified, setPhoneVerified] = useState(true)
    const [emailVerified, setEmailVerified] = useState(true)
    const [fieldForVerify, setFieldForVerify] = useState('')
    const [loader, setLoader] = useState<boolean>(false);
    const [newPasswordShown, setNewPasswordShown] = useState<boolean>(false);
    const [confirmPasswordShown, setConfirmPasswordShown] = useState<boolean>(false);
    const current_url: any = window.localStorage.getItem("current_url");

    useEffect(() => {
        window.scrollTo(0, 0);
        GetGeoLocations()
            .then((data: any) => {
                setGeoLocations(data)
            })
            .catch((error) => {
                console.error('Error getting location:', error);
                setLoader(false)
            })

        return () => {
            dispatch(setUser({}))
        }

    }, []);

    const ClosedModal = (newValue: any) => {
        setShow(newValue);
    };
    const toggleNewPasswordVisibility = () => {
        setNewPasswordShown(newPasswordShown ? false : true)
    }

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordShown(confirmPasswordShown ? false : true)
    }

    //Phone send otp handle function
    const handlePhoneVerify = () => {
        const phoneNumber: any = formik.values.phoneNumber;

        if (isPossiblePhoneNumber(phoneNumber)) {
            const parsedNumber = parsePhoneNumber(phoneNumber);

            if (parsedNumber?.nationalNumber && parsedNumber?.countryCallingCode) {
                const otpPayload = {
                    phoneNumber: parsedNumber.nationalNumber as string,
                    countryCode: `+${parsedNumber.countryCallingCode as string}`,
                    type: 1
                }
                setLoader(true)
                toast.promise(
                    sendOtp(otpPayload),
                    {
                        pending: {
                            render() {
                                return 'Trying to send otp';
                            }
                        },
                        success: {
                            render({ data }) {
                                setOTPID(data.data.otpId);
                                setShow("show");

                                setTimer(Date.now() + 30000);
                                setFieldForVerify("phone")
                                setLoader(false)
                                return 'OTP sent successfully';
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
        }
    };

    //Email send otp handle function
    const handleEmailVerify = () => {
        const email: any = formik.values.email;

        if (formik.errors.email != undefined || email == "") {
            return false
        }

        const OtpPayload: any = {
            email: email,
            type: 1
        }
        setLoader(true)
        toast.promise(
            sendOtp(OtpPayload),
            {
                pending: {
                    render() {
                        return 'Trying to sent otp';
                    }
                },
                success: {
                    render({ data }) {
                        setOTPID(data.data.otpId);
                        setShow("show")
                        setTimer(Date.now() + 30000);
                        setFieldForVerify("email")
                        setLoader(false)
                        return 'OTP sent successfully';
                    }
                },
                error: {
                    render({ data }: any) {
                        setLoader(false)
                        return data.data.message;
                    }
                }
            });

    };

    // Email and phone no otp verification function 
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
                    render({ data }) {
                        if (data.data?.isPhoneNoVerified) {
                            setPhoneNoVerified(data.data?.isPhoneNoVerified)
                            setPhoneVerified(false)
                        } else if (data.data?.isEmailVerified) {
                            setIsEmailVerified(data.data?.isEmailVerified)
                            setEmailVerified(false)
                        }

                        setShow("")
                        setLoader(false)
                        return 'OTP verified successfully';
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

    const formik: any = useFormik({
        initialValues: {
            fullName: userDetail?.name || '',
            userImage: '',
            avatar: '',
            email: userDetail?.email || '',
            phoneNumber: '',
            password: '',
            confpassword: '',
            latitude: 0,
            longitude: 0,
            deviceType: DEVICE_TYPE.WEB,
            countryIsoCode: 'IN',
            countryCode: "+91",
            deviceToken: "string",
            isEmailVerified,
            isPhoneNoVerified,
            term_and_conditions: false
        },

        validationSchema: Signupschema,

        onSubmit: async (values, { setFieldError }) => {
            if (!isPossiblePhoneNumber(values.phoneNumber) || !isValidPhoneNumber(values.phoneNumber)) {
                setFieldError('phoneNumber', 'Invalid phone number');
                return;
            }

            const parsedNumber = parsePhoneNumber(values.phoneNumber);

            let signupPayload: any = {
                fullName: values.fullName,
                userImage: previewImage,
                email: values.email,
                countryCode: `+${parsedNumber?.countryCallingCode as string}`,
                phoneNumber: parsedNumber?.nationalNumber as string,
                password: values.password,
                deviceType: DEVICE_TYPE.WEB,
                latitude: geoLocations?.latitude as number,
                longitude: geoLocations?.longitude as number,
                isEmailVerified,
                isPhoneNoVerified,
                countryIsoCode: 'IN',
                term_and_conditions: values?.term_and_conditions
            };

            if (userDetail?.sub) {
                signupPayload.socialId = userDetail?.sub;
            }

            const formData = new FormData();
            formData.append('file', signupPayload.userImage);

            if (!signupPayload.isPhoneNoVerified) {
                formik.errors.phoneNumber = "Phone is not verified!"
                return null
            }

            if (!signupPayload.isEmailVerified) {
                formik.errors.email = "Email is not verified!"
                return null
            }

            const imageData: any = values.userImage;

            if (imageData?.data?.statusCode === 400) {
                formik.errors.userImage = "Something wents wrong!"
                return false

            } else if (imageData?.statusCode === 200) {
                signupPayload.avatar = imageData?.data.fileName;

                if (signupPayload.avatar === '') {
                    formik.errors.userImage = "Something wents wrong!"
                    return false
                }
            }
            setLoader(true)
            toast.promise(
                signup(signupPayload),
                {
                    pending: {
                        render() {
                            return 'Trying to create user';
                        }
                    },
                    success: {
                        render({ data }) {
                            if (current_url) navigate(current_url)
                            loginUser(data.data.accessToken);
                            setLoader(false)
                            return 'Sign Up Successful';
                        }
                    },
                    error: {
                        render({ data }: any) {
                            setLoader(false)
                            return data.data.message;
                        }
                    }
                });
        },
    });

    const handleResendOTP = () => {
        setShow("")
        if (fieldForVerify === "phone") {
            handlePhoneVerify()
            setShow("show")
        } else if (fieldForVerify === "email") {
            handleEmailVerify()
            setShow("show")
        }
    }

    if (isAuthenticated) {
        return <Navigate to="/" />;
    }


    const handleImageChange = async (event: any) => {
        formik.setFieldValue('userImage', event.currentTarget.files[0]);
        setLoading(true)
        const formData = new FormData();
        formData.append('file', event.currentTarget.files[0]);
        const imageData: any = await uploadImage(formData)
        setImagePreview(imageData.data.url);
        setLoading(false);
    };

    return (
        <div className={styles.loginPage}>
            {loader && <MainLoader />}
            <div className="row m-0">
                <LoginLeft />
                <div className="col-md-6 p-0">
                    <div className={styles.loginrelate}>
                        <div className={styles.topLogin}>
                            <div className='row'>
                                <div className='col-md-6'>
                                    {/* <p>Already have an account? <Link to="/login"> Signin</Link></p> */}
                                </div>
                                <div className='col-md-6'>
                                    <span><Link to="/contact">Need Help?</Link></span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.loginRight}>
                            <h4> Signup to
                                <Link to="/"><img src={rightLogo} alt="logo" /></Link>
                            </h4>
                            <form onSubmit={formik.handleSubmit} >
                                <div className={styles["form-group"]}>
                                    <div className={styles.PhotoUload}>
                                        <div className='d-flex flex-column align-items-center justify-content-center'>
                                            <input type='file' name="userImage"
                                             accept=".png, .jpg, .jpeg" 
                                                onChange={handleImageChange}
                                                onBlur={formik.handleBlur}

                                            />
                                            {loading && (
                                                <div className={styles.Lodaer}>
                                                    <Spinner
                                                        as='span'
                                                        animation='border'
                                                        size='sm'
                                                        role='status'
                                                        aria-hidden='true'
                                                    />
                                                </div>
                                            )}
                                            <div className={styles.uploadPhoto}>
                                                <img className={styles.PrfileIamge} src={previewImage ? previewImage : placeholdimage} alt="add" />
                                            </div>
                                            <h6>Upload Image</h6>
                                            {
                                                formik.touched.userImage && formik.errors.userImage && (
                                                    <div className={styles.error}>{formik.errors.userImage}</div>
                                                )
                                            }
                                        </div>

                                    </div>
                                </div>
                                <div className={styles["form-group"]}>
                                    <label className="d-flex align-items-center">
                                        Name</label>
                                    <input type='text'
                                        name="fullName"
                                        placeholder='Enter name'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.fullName}
                                    />
                                    {formik.touched.fullName && formik.errors.fullName && (
                                        <div className={styles.error}>{formik.errors.fullName}</div>
                                    )}
                                </div>
                                <div className={styles["form-group"]}>

                                    <div className='d-flex justify-content-between'>
                                        <label>Phone Number</label>
                                        <p
                                            className='mb-0 text-end'
                                            onClick={phoneVerified ? () => handlePhoneVerify() : () => ""}
                                        >
                                            {phoneVerified ? "Verify" : "Verified"}
                                        </p>
                                    </div>
                                    <div className='phoneIc'>
                                        <PhoneInput
                                            placeholder="input your Number here"
                                            onChange={(value) => formik.setFieldValue('phoneNumber', value)}
                                            value={formik.values.phoneNumber}
                                            className={styles.phoneNumber}
                                        // disabled={!phoneVerified}
                                        />
                                        {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                                            <div className={styles.error}>{formik.errors.phoneNumber}</div>
                                        )}
                                    </div>

                                </div>
                                <div className={styles["form-group"]}>
                                    <div className='d-flex justify-content-center'>
                                        <label>Email</label>
                                        <p onClick={emailVerified ? () => handleEmailVerify() : () => ""} className='mb-0'>{emailVerified ? "Verify" : "Verified"}</p>
                                    </div>
                                    <input type='text'
                                        name="email"
                                        placeholder='input your email here '
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email}
                                        readOnly={!emailVerified}
                                    />

                                    {formik.touched.email && formik.errors.email && (
                                        <div className={styles.error}>{formik.errors.email}</div>
                                    )}

                                </div>
                                <div className={styles["form-group"]}>
                                    <label className="d-flex align-items-center">
                                        Password </label>
                                    <input type={newPasswordShown ? "text" : "password"}
                                        name="password"
                                        placeholder='************* '
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                    />
                                    <span onClick={toggleNewPasswordVisibility}>
                                        {newPasswordShown ? <img src={eye} alt="" /> : <img src={closeye} alt="" />}</span>
                                    {formik.touched.password && formik.errors.password && (
                                        <div className={styles.error}>{formik.errors.password}</div>
                                    )}
                                </div>
                                <div className={styles["form-group"]}>
                                    <label className="d-flex align-items-center">
                                        Confirm Password  </label>
                                    <input type={confirmPasswordShown ? "text" : "password"}
                                        name="confpassword"
                                        placeholder='************* '
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.confpassword}
                                    />
                                    <span onClick={toggleConfirmPasswordVisibility}>
                                        {confirmPasswordShown ? <img src={eye} alt="" /> : <img src={closeye} alt="" />}</span>
                                    {formik.touched.confpassword && formik.errors.confpassword && (
                                        <div className={styles.error}>{formik.errors.confpassword}</div>
                                    )}
                                </div>


                                <div className={styles["form-group"]}>
                                    <div className={styles["chkconditon"]}>
                                        <input type="checkbox"
                                            name="term_and_conditions"
                                            onChange={(e) => {
                                                formik.setFieldValue("term_and_conditions", e.target.checked)
                                            }}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.term_and_conditions}
                                        />
                                        <label className="d-flex align-items-center">
                                        Agree&nbsp; <Link to={'/termsConditions'}>terms and conditions</Link> </label>
                                        {formik.touched.term_and_conditions && formik.errors.term_and_conditions && (
                                            <div className={styles.error}>{formik.errors.term_and_conditions}</div>
                                        )}
                                    </div>
                                </div>


                                <div className={styles["form-group"]}>
                                    <input type="submit" value="Create" />
                                    {loader && (
                                        <Spinner
                                            as='span'
                                            animation='border'
                                            size='sm'
                                            role='status'
                                            aria-hidden='true'
                                        />
                                    )}
                                </div>
                            </form>
                            <div className={styles.ExtraSign}>
                                <p>Already have an account? <Link to="/login"> Signin</Link></p>
                            </div>
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

export default Signup;
