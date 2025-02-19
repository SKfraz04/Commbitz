import InnerTopPackages from "./InnerTopPackages";
import styles from "../styles/style.module.css";

const TopPackages = () => {
  return (
    <div className={styles.topPackages}>
        <div className='container'>
            <h5>Available Top-up Packages(6)</h5>
            <div className='row'>
                <InnerTopPackages  /> 
                <InnerTopPackages  /> 
                <InnerTopPackages  /> 
                <InnerTopPackages  /> 
                <InnerTopPackages  /> 
                <InnerTopPackages  /> 
            </div>
        </div>
    </div>
  )
}

export default TopPackages