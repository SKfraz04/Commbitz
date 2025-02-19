import styles from './style.module.css';
import CopyRight from './CopyRight';
import FooterContainer from './FooterContainer';
import chat from "../../assets/images/chat.png"
import { Link } from 'react-router-dom';
import { generateWhatsAppLink } from '../../utils/generateWhatsAppLink';

const Footer = () => {


  return (
    <footer>
      <div className={styles.footerMain}>
        <div className='container'>
          <FooterContainer styles={styles} />
          <CopyRight styles={styles} />
        </div>
      </div>
      <span className={styles.nextPage}> <Link to={generateWhatsAppLink()} target="_blank" rel="noopener noreferrer" > <i className="fab fa-whatsapp"></i></Link></span>
    </footer>
  );
};

export default Footer;