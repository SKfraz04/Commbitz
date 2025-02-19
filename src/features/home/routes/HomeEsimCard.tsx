import { FlagIcon, RingIcon } from '../../../assets/images';
import styles from '../styles/home.module.css';

const HomeEsimCard = () => {
  return (
    <section className={styles.esimCard}>
      <div className="container">
        <div className="row align-items-end">
          <div className="col-md-3">
            <div className="esimCardLeft">
              <h6>Stay Connected Everywhere!</h6>
              <h3>Travel Smart<br /> with eSIM.</h3>
            </div>

          </div>
          <div className="col-md-9">
            <div className="esimCardRight">
              <div className="centersimcard">
                <img src={RingIcon} alt="" />
                <div className="centersimcardhead">
                  <h5>United Arab Emirates <img src={FlagIcon} alt="" /></h5>
                </div>
                <h4>As-salaam'alykum, Ahlan</h4>
                <ul>
                  <li>
                    <label>Available</label>
                    <h6>1GB</h6>
                    <span>Internet</span>
                  </li>
                  <li>
                    <label>Available</label>
                    <h6>120 min</h6>
                    <span>Calls</span>
                  </li>
                  <li>
                    <label>Available</label>
                    <h6>15 Days</h6>
                    <span>Duration</span>
                  </li>
                </ul>
                <div className="esimcadbtn">
                  <button>Active</button>
                  <button className="buybtn"> Buy Now </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeEsimCard;