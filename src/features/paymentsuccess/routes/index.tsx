import styles from '../styles/style.module.css';
import Layout from "../../../components/layout"
import sucess from "../../../assets/images/sucess.png"
import { Link } from 'react-router-dom';
import Breadcrumb from '../../../components/breadcrumbs';
import { useEffect } from 'react';

const Payment = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <Layout>
            <Breadcrumb />
            <div className={styles.paymentSucess}>
                <div className='container'>
                    <div className={styles.paymentSucessInner}>
                        <img src={sucess} alt="" />
                        <h4>Payment Successful!</h4>
                        <p>Thank you for making a purchase! We will notify you via email. Thank you for your patience!</p>
                        <div className={styles.SuccBtn}>
                            <Link to="/">Go to homepage</Link>
                            <Link to="/purchase">View Order</Link>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Payment;