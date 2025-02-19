import styles from '../styles/style.module.css';
import Layout from "../../../components/layout"
import sucess from "../../../assets/images/sucess.png"
import { Link } from 'react-router-dom';
import Breadcrumb from '../../../components/breadcrumbs';
import { useEffect } from 'react';

const ThankYouPage = () => {
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
                        <h4>Thank You</h4>
                        <p>Successfully Save Your Details!!</p>
                        <div className={styles.SuccBtn}>
                            <Link to="/">Go to homepage</Link>
                            <Link to="/basic-details">Go to Details Form</Link>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ThankYouPage;