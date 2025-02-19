import flag from "../../../assets/images/uk.png";

import styles from "../styles/style.module.css";

const PackagesHead = () => {
  return (
    <div className={styles.PackegesHead}>
      <div className='container'>
        <div className={styles.PackegesHeadInnr}>
          <h4>As-salaam'alykum, Ahlan</h4>
          <h5><img src={flag} alt="" /> United Arab Emirates</h5>
          <span>50% Off</span>
        </div>
      </div>
    </div>
  )
}

export default PackagesHead