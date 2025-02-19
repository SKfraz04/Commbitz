import offer from "../../../assets/images/offer.png";
import styles from '../styles/style.module.css';
import FeaturesEsimOfferCard from "./FeaturesEsimOfferCard"

const FeaturesEsimOffers = () => {
  return (
    <div className={styles.Esimoffers}>
      <div className='container'>
        <h6>Unlock Unrivaled Connectivity</h6>
        <h3>Explore Our SIM Offerings</h3>
        <div className='row'>
          <div className='col-md-6'>
            <div className={styles.esimofferleft}>
              <img src={offer} alt="" />
            </div>
          </div>
          <div className='col-md-6'>
            <div className={styles.esimofferrigt}>
              <div className='row'>
                <FeaturesEsimOfferCard />
                <FeaturesEsimOfferCard />
                <FeaturesEsimOfferCard />

                <FeaturesEsimOfferCard />
                <FeaturesEsimOfferCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturesEsimOffers