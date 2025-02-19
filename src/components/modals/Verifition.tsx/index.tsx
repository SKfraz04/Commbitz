import { useState } from "react";
import { useFormik } from "formik";
import { verifyOTPSchema } from "../../../features/auth/signup/validations";
import OtpInput from "react-otp-input";
import Countdown from "react-countdown";
import styles from "./style/style.module.css"


interface VerifyOtpModalProps {
    show: string;
    otpId: string;
    timer: any;
    otpVeriFy: any;
    fieldForVerify: any;
    handleResendOTP: any;
    ClosedModal: any
}


const VerifyOtpModal: React.FC<VerifyOtpModalProps> = ({ show, otpId, timer, otpVeriFy, handleResendOTP, ClosedModal }) => {

    const [disableOTP, setDisableOTP] = useState(true);

    const display = show ? 'block' : 'none';
    const verifyPhoneFormik = useFormik({
        initialValues: { otp: '' },
        validationSchema: verifyOTPSchema,
        onSubmit: (values) => {
            const payload = {
                otp: values.otp,
                type: 1,
                otpId: otpId,
            };
            otpVeriFy(payload)

        },

    });

    return (
        <div className={`modal fade ${show}`} id="exampleModal" style={{ display }} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">OTP verification</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => ClosedModal("")}></button>
                    </div>
                    <div className="modal-body">
                        <div className={styles.changePasswordModal}>
                            <form onSubmit={verifyPhoneFormik.handleSubmit}>
                                <div className={`${styles['form-group']} w-100`}>
                                    <OtpInput
                                        value={verifyPhoneFormik.values.otp}
                                        onChange={(otp) => verifyPhoneFormik.setFieldValue('otp', otp)}
                                        numInputs={5}
                                        renderSeparator={<span>-</span>}
                                        containerStyle="justify-content-evenly"
                                        renderInput={(props) => <input {...props} />}
                                        inputStyle={{ width: '3.7em' }}
                                    />
                                    {verifyPhoneFormik.touched.otp && verifyPhoneFormik.errors.otp && (
                                        <div className={styles.error}>{verifyPhoneFormik.errors.otp}</div>
                                    )}
                                </div>

                                <div className={styles["form-group"]}>
                                    <input type="submit" value="Verify" />
                                </div>

                                <div className={styles.sentOTP}>
                                    <p className='text-white'>Didn’t recieve OTP yet?</p>
                                    <p className={styles.resendOTP} onClick={!disableOTP ? handleResendOTP : () => console.log("okay")}>Resend OTP</p>
                                    <p className='text-white'>in
                                        <Countdown
                                            key={timer}
                                            date={timer}
                                            zeroPadTime={2}
                                            renderer={({ minutes, seconds }) => {
                                                return <span className='mx-1'>{minutes < 10 ? '0' : ''}{minutes}: {seconds < 10 ? '0' : ''}{seconds}</span>
                                            }}
                                            onComplete={() => setDisableOTP(false)}
                                        />
                                        min</p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerifyOtpModal