import feature from "../../../assets/images/feature.png";
import styles from '../styles/style.module.css';
import { Layout, Breadcrumb, PartnerSection } from "../../../components";
const FeaturesBanner = () => {
  return (
    <>
      <meta name="description" content="Download the Commbitz app for iOS and Android. Activate eSIMs, switch plans, and enjoy hassle-free global connectivity at your fingertips." />
      <title>Commbitz Mobile App | Manage Your Global Connectivity</title>
      <div className={styles.Featurebaner}>
        <img src={feature} alt="buy eSim for your device" />
        <div className='container'>
          <div className={styles.FeaturebanerText}>
            <div className='row'>
              <div className='col-md-6'>
                <div className={styles.Featurebanerleft}>
                  <h3>

                    <span>Connectivity</span><br /> made easy,<br /> Saving made <br />simple.
                  </h3>
                </div>
              </div>
              <div className='col-md-6'>
                <div className={styles.Featurebanerright}>
                  <p>Commbitz is the fastest growing eSIM store where you can buy virtual- or digital- SIM cards to instantly connect to <b>200+ countries</b> and regions. </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FeaturesBanner