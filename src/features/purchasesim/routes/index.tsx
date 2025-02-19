import styles from '../styles/style.module.css';
import Layout from "../../../components/layout"
import Breadcrumb from '../../../components/breadcrumbs';
import DashboardSidebar from '../../../components/dashboardsidebar';
import flag from "../../../assets/images/flag.png"
import scan from "../../../assets/images/scan.png"
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
// import DashboardRight from './DashboardRight';



const Packsim = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <Layout>
            <Breadcrumb />
            <div className={styles.Profileouter}>
                <div className='container'>
                    <div className='row'>
                        <DashboardSidebar />
                        <div className='col-md-9'>
                            <div className={styles.ProfileRight}>
                                <div className={styles.topDesc}>
                                    <h4 className={styles.hgAct}>Activate eSIM</h4>
                                    <ul>
                                        <li className={styles.active}><span>By QR</span></li>
                                        <li><span>By QR</span></li>
                                    </ul>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <div className={styles.leftPurchasesim}>
                                                <div className={styles.tophed}>
                                                    <h5>UKi Mobile <span>USA</span></h5>
                                                    <img src={flag} alt="" />
                                                </div>
                                                <h4>Charter Ultra  Internet</h4>
                                                <div className={styles.simbar}>
                                                    <img src={scan} alt="" />
                                                </div>
                                                <Link to="#">Activate eSIM</Link>
                                            </div>
                                        </div>
                                        <div className='col-md-6'>
                                            <div className={styles.rightPurchasesim}>
                                                <h4>Installation Steps</h4>
                                                <p><b>Download:</b> Install the Commbitz app from your device's app & play store.</p>
                                                <p><b>Select your eSim Plan:</b> Browse through available International eSIM card plans within the app. Choose the one that best fits your needs, whether for data, calls, or both. </p>
                                                <p><b>Activate it anywhere, hassle-free:</b> Follow the prompts within the app to activate your chosen eSIM plan. Enjoy seamless connectivity without the need for physical SIM cards, wherever you are in the world. </p>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Packsim;