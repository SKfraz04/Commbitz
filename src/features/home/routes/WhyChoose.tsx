import { useSelector } from "react-redux";

import styles from '../styles/home.module.css';

const WhyChoose = () => {
  const cardData = useSelector((store: any) => store.whychoose);

  return (
    <section className={styles.whyChoose}>
      <div className="container">
        <h3>Why choose Commbitz?</h3>
        <p>We have decided to opt for a simple, clear process that will make your life easier every day. Just follow the steps!</p>
        <div className="row">
          {cardData && cardData.map((item: any, index: number) =>
            <div className="col-md-3" key={index}>
              <div className={`${styles.StepOne} ${styles.whyChooseiner}`}>
                <span>{item.heading}</span>
                <h4>{item.title}</h4>
                <h5>{item.discription}</h5>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default WhyChoose