import { ChangePasswordSchema } from "./Validation";
import { useFormik } from "formik";
import { toast } from "react-toastify";

import { UpdatePassword } from "./api";
import styles from './style.module.css';
import { useState } from "react";
import eye from "../../../assets/images/eye.png";
import closeye from "../../../assets/images/closeye.png"

interface Props {
    show: string;
    handleCloseModal: (data: string) => void
}

const ChangePasswordModal = ({ show, handleCloseModal }: Props) => {
    const [passwordShown, setPasswordShown] = useState<boolean>(false);
    const [newPasswordShown, setNewPasswordShown] = useState<boolean>(false);
    const [confirmPasswordShown, setConfirmPasswordShown] = useState<boolean>(false);

    const changePasswordFormik = useFormik({
        initialValues: {
            oldPassword: '',
            newPassword: '',
            confpassword: ''
        },
        validationSchema: ChangePasswordSchema,

        onSubmit: async (values) => {

            let ChangePasswordPayload: any = {
                oldPassword: values.oldPassword,
                newPassword: values.newPassword,
                confpassword: values.confpassword,
            };

            toast.promise(
                UpdatePassword(ChangePasswordPayload),
                {
                    pending: {
                        render() {
                            return 'Updating Password';
                        }
                    },
                    success: {
                        render({ data }) {
                            handleCloseModal("")
                            return 'Password updated successfully';
                        }
                    },
                    error: {
                        render({ data }: any) {
                            return data.data.message;
                        }
                    }
                });
        },
    });
    const toggleOldPasswordVisibility = () => {
        setPasswordShown(passwordShown ? false : true)
    }
    const toggleNewPasswordVisibility = () => {
        setNewPasswordShown(newPasswordShown ? false : true)
    }

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordShown(confirmPasswordShown ? false : true)
    }


    return (
        <div className={`modal fade ${show}`} id="exampleModal" style={{ display: show ? 'block' : 'none' }} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Change Password</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => handleCloseModal("")}></button>
                    </div>
                    <div className="modal-body">
                        <div className={styles.changePasswordModal}>
                            <form onSubmit={changePasswordFormik.handleSubmit} >
                                <div className={styles.formGroup}>
                                    <label>Old Password</label>
                                    <input
                                        type={passwordShown ? "text" : "password"}
                                        name="oldPassword"
                                        placeholder="Old Password"
                                        onChange={changePasswordFormik.handleChange}
                                        onBlur={changePasswordFormik.handleBlur}
                                        value={changePasswordFormik.values.oldPassword}
                                    />
                                    <span onClick={toggleOldPasswordVisibility}>
                                        {passwordShown ? <img src={eye} alt="" /> : <img src={closeye} alt="" />}</span>
                                    {
                                        changePasswordFormik.touched.oldPassword && changePasswordFormik.errors.oldPassword && (
                                            <p className="error">{changePasswordFormik.errors.oldPassword}</p>
                                        )
                                    }
                                </div>
                                <div className={styles.formGroup}>
                                    <label>New Password</label>
                                    <input
                                        type={newPasswordShown ? "text" : "password"}
                                        placeholder="New Password"
                                        name="newPassword"
                                        onChange={changePasswordFormik.handleChange}
                                        onBlur={changePasswordFormik.handleBlur}
                                        value={changePasswordFormik.values.newPassword}
                                    />
                                    <span onClick={toggleNewPasswordVisibility}>
                                        {newPasswordShown ? <img src={eye} alt="" /> : <img src={closeye} alt="" />}</span>
                                    {
                                        changePasswordFormik.touched.newPassword && changePasswordFormik.errors.newPassword && (
                                            <p className="error">{changePasswordFormik.errors.newPassword}</p>
                                        )
                                    }
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Confirm Password</label>
                                    <input
                                      type={confirmPasswordShown ? "text" : "password"}
                                        placeholder="Confirm Password"
                                        name="confpassword"
                                        onChange={changePasswordFormik.handleChange}
                                        onBlur={changePasswordFormik.handleBlur}
                                        value={changePasswordFormik.values.confpassword}
                                    />
                                    <span onClick={toggleConfirmPasswordVisibility}>
                                        {confirmPasswordShown ? <img src={eye} alt="" /> : <img src={closeye} alt="" />}</span>
                                    {
                                        changePasswordFormik.touched.confpassword && changePasswordFormik.errors.confpassword && (
                                            <p className="error">{changePasswordFormik.errors.confpassword}</p>
                                        )
                                    }
                                </div>
                                <div className={styles.formGroup}>
                                    <input type="submit" value="Save" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePasswordModal