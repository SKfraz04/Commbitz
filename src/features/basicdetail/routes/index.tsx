import React, { useEffect, useState } from 'react';
import styles from '../styles/style.module.css';
import logo from '../../../assets/images/logo.png';
import frdoen from '../../../assets/images/frdoen.png';
import calndr from '../../../assets/images/calndr.png';
import { BasicDetailSchema } from '../validation';
import { useFormik } from 'formik';
import MainLoader from '../../../components/mainLoader';
import PhoneInput, { isPossiblePhoneNumber, isValidPhoneNumber, parsePhoneNumber } from 'react-phone-number-input';
import { toast } from 'react-toastify';
import { addEventDetails, getCountries } from '../api';
import { useNavigate } from 'react-router-dom';
import Congratulations from '../../../components/modals/Congratulation';
import DatePicker from "react-datepicker";
import { useParams } from 'react-router-dom';

import "react-datepicker/dist/react-datepicker.css";

const BasicDetails: React.FC = () => {
    const { simNumber } = useParams();
    const [countriesList, setCountriesList] = useState([])
    const [loader, setLoader] = useState(true)
    const [showModal, setShowModal] = useState<boolean>(false);
    const navigate = useNavigate()

    const [startDate, setStartDate] = useState(new Date());

    useEffect(() => {
        getCountries().then((res) => {
            setLoader(false)
            setCountriesList(res?.data?.countries)
        })
    }, [])

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            countryCode: "",
            phoneNumber: "",
            travellingCountry: "",
            travellingDate: "",
            returnDate: "",
            handsetModelNo: ""
        },
        validationSchema: BasicDetailSchema,
        onSubmit: async (values, { setFieldError }) => {

            if (!isPossiblePhoneNumber(values.phoneNumber) || !isValidPhoneNumber(values.phoneNumber)) {
                setFieldError('phoneNumber', 'Invalid phone number');
                return;
            }

            const parsedNumber = parsePhoneNumber(values.phoneNumber);
            let BasicPayload: any = {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                countryCode: `+${parsedNumber?.countryCallingCode as string}`,
                phoneNumber: parsedNumber?.nationalNumber as string,
                travellingCountry: values.travellingCountry,
                handsetModelNo: values.handsetModelNo,
                simNumber: simNumber || null,
            };
            if(BasicPayload.simNumber != null) {
                BasicPayload.isActivationRequest = true;
            }
            if (values.returnDate) BasicPayload.returnDate = values.returnDate
            if (values.travellingDate) BasicPayload.travellingDate = values.travellingDate

            toast.promise(
                addEventDetails(BasicPayload),
                {
                    pending: {
                        render() {
                            return 'Trying to save your informations...';
                        }
                    },
                    success: {
                        render({ data }: any) {
                            // setShowModal(true)
                            formik.resetForm()
                            navigate('/thank-you')
                            return "Your informations Successful saved";
                        }
                    },
                    error: {
                        render({ data }: any) {
                            //   setLoader(false)
                            return data.data.message;
                        }
                    }
                });
        },
    });


    return (
        <div className={styles.bassoDtailFoem}>
            {loader && <MainLoader />}
            <form onSubmit={formik.handleSubmit}>
                <div className={styles.gormLogo}>
                    <img src={logo} alt="Logo" />
                </div>
                <h4>Enter your details</h4>
                <p>Please fill in your details in the provided form and then click on the submit button.</p>
                <div className="row">
                    <div className="col-md-6">
                        <div className={styles.formGroup}>
                            <label>First Name*</label>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="Enter First Name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.firstName}
                            />
                            {formik.touched.firstName && formik.errors.firstName && (
                                <div className={styles.error}>{formik.errors.firstName}</div>
                            )}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className={styles.formGroup}>
                            <label>Last Name*</label>
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Enter Last Name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.lastName}
                            />
                            {formik.touched.lastName && formik.errors.lastName && (
                                <div className={styles.error}>{formik.errors.lastName}</div>
                            )}
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className={styles.formGroup}>
                            <label>Phone*</label>
                            <PhoneInput
                                className={styles.phoneNumber}
                                placeholder="Enter your phone number here"
                                onChange={(value) => {
                                    formik.setFieldValue('phoneNumber', value)
                                }}
                                value={formik.values.phoneNumber}

                            />
                            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                                <div className={styles.error}>{formik.errors.phoneNumber}</div>
                            )}
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className={styles.formGroup}>
                            <label>Email*</label>
                            <input
                                type="text"
                                name="email"
                                placeholder="Enter your email here"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <div className={styles.error}>{formik.errors.email}</div>
                            )}
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className={styles.formGroup}>
                            <label>Travelling Country*</label>
                            <select
                                name="travellingCountry"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.travellingCountry}
                            >
                                <option value="">Select Country</option>
                                {countriesList && countriesList.map((list: any) => (
                                    <option value={list?.name}>{list?.name}</option>
                                ))}

                            </select>
                            <span><img src={frdoen} alt="Dropdown Icon" /></span>
                            {formik.touched.travellingCountry && formik.errors.travellingCountry && (
                                <div className={styles.error}>{formik.errors.travellingCountry}</div>
                            )}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className={styles.formGroup}>
                            <label>Travelling Date</label>


                            <DatePicker
                                selected={formik.values.travellingDate ? new Date(formik.values.travellingDate) : null} // Ensure it's a Date object
                                onChange={(date) => formik.setFieldValue('travellingDate', date)} // Set the date
                                name="travellingDate"
                                placeholderText="Select Travelling Date"
                                onBlur={formik.handleBlur}
                                dateFormat="dd-M-yyyy" // Optional
                                value={formik.values.travellingDate}                            />


                            {/* <input
                                type="date"
                                name="travellingDate"
                                placeholder="Select Date"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.travellingDate}
                            /> */}
                            <span><img src={calndr} alt="Calendar Icon" /></span>
                            {formik.touched.travellingDate && formik.errors.travellingDate && (
                                <div className={styles.error}>{formik.errors.travellingDate}</div>
                            )}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className={styles.formGroup}>
                            <label>Return Date</label>

                            <DatePicker
                                selected={formik.values.returnDate ? new Date(formik.values.returnDate) : null} // Ensure it's a Date object
                                onChange={(date) => formik.setFieldValue('returnDate', date)} // Set the date
                                name="returnDate"
                                placeholderText="Select Return Date"
                                onBlur={formik.handleBlur}
                                dateFormat="dd-M-yyyy" // Optional
                                value={formik.values.returnDate}
                            />

                            {/* <input
                                type="date"
                                name="returnDate"
                                placeholder="Select Date"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.returnDate}
                            /> */}
                            <span><img src={calndr} alt="Calendar Icon" /></span>
                            {formik.touched.returnDate && formik.errors.returnDate && (
                                <div className={styles.error}>{formik.errors.returnDate}</div>
                            )}
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className={styles.formGroup}>
                            <label>Handset Model No*</label>
                            <input
                                type="text"
                                name="handsetModelNo"
                                placeholder="Enter handset model number"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.handsetModelNo}
                            />
                            {formik.touched.handsetModelNo && formik.errors.handsetModelNo && (
                                <div className={styles.error}>{formik.errors.handsetModelNo}</div>
                            )}
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className={styles.formGroup}>
                            <input type="submit" value="Submit" />
                        </div>
                    </div>
                </div>
            </form>
            <Congratulations show={showModal} />
        </div>
    );
}

export default BasicDetails;
