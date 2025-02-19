import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import PhoneInput, { isPossiblePhoneNumber, parsePhoneNumber } from 'react-phone-number-input';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import OtpInput from 'react-otp-input';
import Countdown from 'react-countdown';

import styles from '../styles/style.module.css';
import LoginLeft from '../../login/routes/LoginLeft';
import { APP_ROUTES } from '../../../../utils/routes';
import { forgetPassword, resetPassword, verifyOTP } from '../api';
import { ForgetPasswordPayload } from '../interface';
import { forgetPasswordSchema, resetPasswordSchema, verifyOTPSchema } from '../validations';
import MainLoader from '../../../../components/mainLoader';

const Forgot = () => {
	const [isPhoneNumber, setPhoneNumberInput] = useState<boolean>(false);
	const phoneNumberRef = useRef<any>(null);
	const navigate = useNavigate();
	const location = useLocation();

	const [screenType, setScreenType] = useState(1);
	const [otpId, setOTPID] = useState('');
	const [timer, setTimer] = useState(0);
	const [disableOTP, setDisableOTP] = useState(true);
	const [userId, setUserId] = useState('');
	const [loader, setLoader] = useState<boolean>(false);

	const forgetPasswordFormik = useFormik({
		initialValues: { loginIdentifier: '' },
		onSubmit: (values) => {
			let isEmailLogin = false;

			let forgetPasswordPayload: ForgetPasswordPayload = {
				type: location.pathname === APP_ROUTES.DELETE_ACCOUNT ? 3 : 2,
			};

			if (!isPhoneNumber) {
				const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

				if (!emailRegex.test(values.loginIdentifier)) {
					forgetPasswordFormik.setFieldError('loginIdentifier', 'Invalid Email');
					return;
				}

				isEmailLogin = true;
				forgetPasswordPayload = {
					...forgetPasswordPayload,
					email: values.loginIdentifier,
				};
			}

			if (isPossiblePhoneNumber(values.loginIdentifier) && !isEmailLogin) {
				const parsedNumber = parsePhoneNumber(values.loginIdentifier);

				forgetPasswordPayload = {
					...forgetPasswordPayload,
					phoneNumber: parsedNumber?.nationalNumber as string,
					countryCode: "+" + parsedNumber?.countryCallingCode as string,
				};
			}
			setLoader(true)
			toast.promise(
				forgetPassword(forgetPasswordPayload),
				{
					pending: {
						render({ data }) {
							return 'Sending one time password';
						}
					},
					success: {
						render({ data }) {
							setOTPID(data.data.otpId);
							setScreenType(2);
							setTimer(Date.now() + 300000);
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
		},
		validationSchema: forgetPasswordSchema,
	});

	const verifyPasswordFormik = useFormik({
		initialValues: { otp: '' },
		onSubmit: (values) => {
			const payload = {
				otp: values.otp,
				type: location.pathname === APP_ROUTES.DELETE_ACCOUNT ? 3 : 2,
				otpId: otpId,
			};
			setLoader(true)
			toast.promise(
				verifyOTP(payload),
				{
					pending: {
						render({ data }) {
							return 'Verifying OTP';
						}
					},
					success: {
						render({ data }) {
							setLoader(false);
							setOTPID(data?.data?.otpId)
							if (location.pathname !== APP_ROUTES.DELETE_ACCOUNT) {
								setScreenType(3);
								setUserId(data.data._id);
								return 'OTP verified successfully';
							}

							navigate(APP_ROUTES.LOGIN);
							return 'Account removed successfully';
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
		validationSchema: verifyOTPSchema
	});

	const resetPasswordFormik = useFormik({
		initialValues: { newPassword: '', confirmPassword: '' },
		onSubmit: (values) => {
			const payload = {
				password: values.newPassword,
				otpId: otpId,
			};
			setLoader(true)
			toast.promise(
				resetPassword(payload),
				{
					pending: {
						render({ data }) {
							return 'Creating new password';
						}
					},
					success: {
						render({ data }) {
							navigate(APP_ROUTES.LOGIN);
							setLoader(true)
							return 'Password updated successfully';
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
		validationSchema: resetPasswordSchema,
	});

	const resendOTP = () => {
		if (!disableOTP) {
			forgetPasswordFormik.submitForm();
		}
	};

	useEffect(() => {
		if (isPhoneNumber && phoneNumberRef && phoneNumberRef.current && phoneNumberRef.current.focus) {
			phoneNumberRef.current.focus();
		}
	}, [isPhoneNumber]);

	useEffect(() => {
		if (!forgetPasswordFormik.values.loginIdentifier) {
			setPhoneNumberInput(false);
		}
		window.scrollTo(0, 0);
	}, [forgetPasswordFormik.values.loginIdentifier]);



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
									<p>Already have an account? <Link to={APP_ROUTES.LOGIN}> Sign In</Link></p>

								</div>
								<div className='col-md-6'>
									<span><Link to="#">Need Help?</Link></span>
								</div>
							</div>
						</div>
						<div className={styles.loginRight}>
							<h4>
								{
									screenType === 1 && location.pathname === APP_ROUTES.DELETE_ACCOUNT ? 'Delete Account' :
										screenType === 1 ? 'Forgot Password' :
											screenType === 2 ? 'Verification' : 'Reset Password'
								}
							</h4>
							{
								screenType === 1 ?
									<form onSubmit={forgetPasswordFormik.handleSubmit} >
										<div className={styles["form-group"]}>
											<label className="d-flex align-items-center">
												Phone / Email</label>
											{
												isPhoneNumber ?
													<PhoneInput
														placeholder="Enter phone number"
														onChange={(value) => forgetPasswordFormik.setFieldValue('loginIdentifier', value)}
														value={forgetPasswordFormik.values.loginIdentifier}
														ref={phoneNumberRef}
														className={styles.phoneNumber}
													/> :
													<input
														type='text'
														name="loginIdentifier"
														placeholder='Please enter your Email or Mobile Number'
														onChange={(event) => {
															const { target: { value } } = event;
															const numberRegex = /^[0-9]+$/;

															if (numberRegex.test(value)) setPhoneNumberInput(true);
															forgetPasswordFormik.setFieldValue('loginIdentifier', value);
														}}
														onBlur={forgetPasswordFormik.handleBlur}
														value={forgetPasswordFormik.values.loginIdentifier}
													/>
											}
											{forgetPasswordFormik.touched.loginIdentifier && forgetPasswordFormik.errors.loginIdentifier && (
												<div className={styles.error}>{forgetPasswordFormik.errors.loginIdentifier}</div>
											)}
										</div>
										<div className={styles["form-group"]}>
											<input type="submit" value="Get OTP" />
										</div>
									</form> :
									screenType === 2 ?
										<form onSubmit={verifyPasswordFormik.handleSubmit}>

											<div className={`${styles['form-group']} w-100`}>
												<div className='ForgetOtp'>
													<OtpInput
														value={verifyPasswordFormik.values.otp}
														onChange={(otp) => verifyPasswordFormik.setFieldValue('otp', otp)}
														numInputs={5}
														renderSeparator={<span>-</span>}
														containerStyle=""
														renderInput={(props) => <input {...props} type="tel" inputMode="numeric" />}
														inputStyle={{ width: '3.7em' }}
													/>
												</div>
												{verifyPasswordFormik.touched.otp && verifyPasswordFormik.errors.otp && (
													<div className={styles.error}>{verifyPasswordFormik.errors.otp}</div>
												)}
											</div>

											<div className={styles["form-group"]}>
												<input type="submit" value="Verify" />
											</div>

											<div className='sentOTP'>
												<p className='text-white'>Didn’t recieve OTP yet?</p>
												<p className={styles.resendOTP} onClick={resendOTP}>Resend OTP</p>
												<p className='text-white'>in
													<Countdown
														date={timer}
														zeroPadTime={2}
														renderer={({ hours, minutes, seconds, completed }) => {
															return <span className='mx-1'>{minutes < 10 ? '0' : ''}{minutes}: {seconds < 10 ? '0' : ''}{seconds}</span>
														}}
														onComplete={() => setDisableOTP(false)}
													/>
													min</p>,
											</div>
										</form> :
										<form onSubmit={resetPasswordFormik.handleSubmit}>

											<div className={`${styles['form-group']} w-100`}>
												<label className="d-flex align-items-center">
													New Password
												</label>
												<input
													type='password'
													name="newPassword"
													placeholder='New Password'
													onChange={resetPasswordFormik.handleChange}
													onBlur={resetPasswordFormik.handleBlur}
													value={resetPasswordFormik.values.newPassword}
												/>
												{resetPasswordFormik.touched.newPassword && resetPasswordFormik.errors.newPassword && (
													<div className={styles.error}>{resetPasswordFormik.errors.newPassword}</div>
												)}

												<label className="d-flex align-items-center mt-4">
													Confirm Password
												</label>

												<input
													type='password'
													name="confirmPassword"
													placeholder='Confirm Password'
													onChange={resetPasswordFormik.handleChange}
													onBlur={resetPasswordFormik.handleBlur}
													value={resetPasswordFormik.values.confirmPassword}
												/>
												{resetPasswordFormik.touched.confirmPassword && resetPasswordFormik.errors.confirmPassword && (
													<div className={styles.error}>{resetPasswordFormik.errors.confirmPassword}</div>
												)}
											</div>

											<div className={styles["form-group"]}>
												<input type="submit" value="Reset" />
											</div>
										</form>
							}
						</div>
					</div>
				</div>

			</div>
		</div>
	);
};

export default Forgot;
