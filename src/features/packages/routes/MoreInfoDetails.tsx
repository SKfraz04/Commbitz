
import styles from "../styles/style.module.css";

const MoreInfoDetails = () => {
  return (
    <div className={styles.InfoDetails}>
      <div className='container'>
        <h5>More Details</h5>
        <ul>
          <li>
            <div className={styles.InflLeft}>
              <span>NETWORK</span>
              <h4>02 -UK </h4>
              <h4>Three UK</h4>
            </div>
            <div className={styles.InflRight}>
              <i className="fas fa-info-circle"></i>
            </div>
          </li>
          <li>
            <div className={styles.InflLeft}>
              <span>PLAN TYPE</span>
              <h4>Data, Call and SMS  </h4>
            </div>
            <div className={styles.InflRight}>
              <i className="fas fa-info-circle"></i>
            </div>
          </li>
          <li>
            <div className={styles.InflLeft}>
              <span>ACTIVATION POLICY</span>
              <h4>The validity period starts when the eSIM connects to any supported networks. </h4>

            </div>
            <div className={styles.InflRight}>
              <i className="fas fa-info-circle"></i>
            </div>
          </li>

          <li>
            <div className={styles.InflLeft}>
              <span>OTHER INFO</span>
              <h4>The validity period starts when the eSIM connects to any supported networks.</h4>

            </div>
            <div className={styles.InflRight}>
              <i className="fas fa-info-circle"></i>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default MoreInfoDetails