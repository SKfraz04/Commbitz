import moment from 'moment';
import { Link } from 'react-router-dom';
import { generateWhatsAppLink } from '../../utils/generateWhatsAppLink';
interface CopyRightProps {
    styles: any
}

const CopyRight: React.FC<CopyRightProps> = ({ styles }) => {
    return (
        <div className={styles.copyright}>
            <div className='row'>
                <div className='col-md-8'>
                    <div className={styles.copyleft}>
                        <ul>
                            <p>COMMBITZ {moment().year()} All Rights Reserved</p>
                            <li><Link to="/privacyPolicy">Privacy Policy</Link></li>
                            <li><Link to="/termsConditions">Term & Condition</Link></li>
                            <li><Link to="/shippingPolicy">Shipping Policy</Link></li>
                            <li><Link to="/refundPolicy">Refund Policy</Link></li>
                        </ul>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className={styles.copyRight}>
                        <ul>
                            <div className={styles.copyRight}>
                                <ul>
                                    <li><a href='https://www.linkedin.com/company/commbitz/' target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a></li>
                                    <li><a href="https://www.instagram.com/commbitz_esim/?hl=en" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a></li>
                                    <li><a href="https://www.youtube.com/@Commbitz_esim" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a></li>
                                    <li><a href="https://www.facebook.com/commbizesim" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a></li>
                                </ul>
                            </div>

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CopyRight