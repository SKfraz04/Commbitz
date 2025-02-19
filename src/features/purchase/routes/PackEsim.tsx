import styles from '../styles/style.module.css';
import flag from "../../../assets/images/flag.png"
import { Link } from 'react-router-dom';

interface PackEsimProps {
    getQrCode:any
}

const PackEsim : React.FC<PackEsimProps> = ({getQrCode}) => {
  return (
    <div className='col-md-9'>
        <div className={styles.ProfileRight}>
            <div className={styles.topDesc}>
                <h4 className={styles.hgAct}><Link to="/purchase"><i className="fas fa-chevron-left"></i></Link> Activate eSim</h4>
            <ul>
                <li className={styles.active}><span>{getQrCode?.type === 1 ? `QR Code` : `SMDP Code`}</span></li>
            </ul>
            <div className='row'>
                <div className='col-md-6'>
                    <div className={styles.leftPurchasesim}>
                            <div className={styles.tophed}>
                                <h5>{getQrCode?.data?.name} 
                                    {/* <span>{getQrCode?.data?.name}</span> */}
                                    </h5>
                                <img src={getQrCode?.data?.flagImageUrl} alt="" />
                            </div>
                            <h4 style={{color : "#fff"}} >{getQrCode?.type === 1 ? `QR Code` : `SMDP Code`}</h4>
                            <br/>
                            <div className={styles.simbar}>
                            {
                            getQrCode?.type === 1 ? 
                                <img src={getQrCode?.data?.qr} alt="" /> 
                            :   <span style={{color : "#fff"}}>{getQrCode?.data}</span>
                             }
                            
                            </div>
                            {/* <Link to="#">Activate eSIM</Link> */}
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className={styles.rightPurchasesim} style={{color : "#fff"}}>
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
  )
}

export default PackEsim