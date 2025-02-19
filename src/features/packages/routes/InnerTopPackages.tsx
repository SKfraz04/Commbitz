import sim from "../../../assets/images/sim.svg"
import valid from "../../../assets/images/valid.png"
import data from "../../../assets/images/data.png"
import styles from "../styles/style.module.css";

const InnerTopPackages = () => {
  return (
    <div className='col-md-4'>
      <div className={styles.innerTopPacks}>
        <h6>5GB-30 Days</h6>
        <ul>
          <li><span><img src={sim} alt="" /> Data</span><label>1GB</label></li>
          <li><span><img src={valid} alt="" />Validity</span><label>30 Days</label></li>
          <li><span><img src={data} alt="" />Price</span><label>US $20.00</label></li>
        </ul>
      </div>
    </div>
  )
}

export default InnerTopPackages