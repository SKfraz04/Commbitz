import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import edit from "../../../assets/images/edit.png";
import userImg from "../../../assets/images/user.jpg"
import { getUserData } from '../../../redux/api';
import { fetchDataStart, fetchDataSuccess, fetchDataFailure } from '../../../redux/slices/userSlice';
import styles from '../styles/style.module.css';

interface Props {
    handlePasswordModal: (event: any) => void;
    handleEditModal: (event: any) => void;
}

const ProfileRight = ({ handlePasswordModal, handleEditModal }: Props) => {
    const dispatch = useDispatch();

    const { data, loading, error }: any = useSelector((state: any) => state.getUserData);

    useEffect(() => {
        const userData = async () => {
            dispatch(fetchDataStart());
            try {
                const userData = await getUserData();
                dispatch(fetchDataSuccess(userData?.data));
            } catch (error: any) {
                dispatch(fetchDataFailure(error.message));
            }
        }
        userData()
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    return (
        <div className='col-md-9'>
            <div className='ProfileRight'>
                <div className={styles.profilePage}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className={styles.profileLeft}>
                                <div className={styles.profilelefttp}>
                                    <h4>Overview</h4>
                                    <img className={styles.profileEdit} src={edit} alt="" onClick={handleEditModal} />
                                </div>
                                <div className={styles.profileImage}>
                                    <span>
                                        <img src={data?.avatar?data?.avatar:userImg} alt="" />
                                    </span>
                                    <div className={styles.profileData}>
                                        <h6>{data?.fullName}</h6>
                                        <h5>{data?.email}</h5>
                                        {/* <label>Licence : #45678</label>  */}
                                    </div>

                                </div>
                                <ul>
                                    <li><span>Contact Number</span><label>{data?.phoneNumber}</label></li>
                                    {/* <li><span>Address</span><label>23 Main Street, Anytown, USA 12345</label></li>
                                <li><span>Time Zone</span><label>Jakarta (GMT+7)</label></li> */}

                                </ul>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className={styles.profileRight}>
                                <h4>Signin Methods</h4>
                                <form>
                                    <div className={styles.formGroup}>
                                        <label>Email Address</label>
                                        <div className={styles.InputState}>
                                            <span>{data && data.email}</span>
                                        </div>
                                        {/* <input className={styles.input} type="text" placeholder="eureka88@email.com" /> */}
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Password</label>
                                        <div className={styles.InputState}>
                                            <span>******************</span>
                                        </div>
                                        {/* <input className={styles.input} type="password" placeholder="******************" /> */}
                                        <button className={styles.changePassword} data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={handlePasswordModal}>Change password</button>
                                    </div>
                                    {/* <div className={styles.secure}>
                                        <h6>Secure Your Account</h6>
                                        <a href="#">Enable</a>
                                    </div> */}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileRight