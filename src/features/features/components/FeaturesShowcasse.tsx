import pks from "../../../assets/images/pks.png"
import showone from "../../../assets/images/showone.png"
import showthree from "../../../assets/images/showthree.png"
import FeaturesShowcasseCard from "./FeaturesShowcasseCard"
import styles from "../styles/style.module.css";

const FeaturesShowcase = () => {
    return (
        <div className={styles.showcasse}>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className={styles.showcaseLeft}>
                            <h6>Experience Connectivity Unleashed</h6>
                            <h3>Commbitz eSIM Feature Showcase</h3>
                            <p>Traveling is an enriching experience that opens up new horizons, exposes us to different cultures, and creates memories that last a lifetime. </p>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className={styles.showcaseRight}>
                            <img src={pks} alt="" />
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <FeaturesShowcasseCard showSrc={showone} data={{h4: "Redefined Roaming", h5:"Global, Multiverse, local and regional, voice and data sim Plans."}} />
                    <FeaturesShowcasseCard showSrc={showone} data={{h4:"Sustainable  choice", h5:"Commbitz eSIM is a sustainable choice, with offerings that are future-defining for multiple industries, all of which are the most advanced in the world in regard to penetration in developed economie"}}/>
                    <FeaturesShowcasseCard showSrc={showthree} data={{h4:"Made Easy", h5:"Connectivity made easy. That’s what we do. 24*7, 365 days a year."}}/>
                </div>
            </div>
        </div>
    )
}

export default FeaturesShowcase;