import styles from "../styles/style.module.css";

interface FeaturesShowcasseCardProps {
  showSrc: string;
  data:any
}

const FeaturesShowcasseCard: React.FC<FeaturesShowcasseCardProps> = ({ showSrc, data }) => {
  return (
    <div className='col-md-4'>
      <div className={styles.showcaseImage}>
        <img src={showSrc} alt="" />
        <h4>{data?.h4}</h4>
        <h5>{data?.h5}</h5>
      </div>
    </div>
  )
}

export default FeaturesShowcasseCard