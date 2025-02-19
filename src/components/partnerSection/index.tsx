import styles from './style.module.css';
import {
    PartnerSectionFive,
    PartnerSectionFour,
    PartnerSectionOne,
    PartnerSectionSeven,
    PartnerSectionSix,
    PartnerSectionThree,
    PartnerSectionTwo
} from "../../assets/images";
import Sdivder from "react-slick";


const PartnerSection = () => {
    var partner = {
        dots: false,
        arrow: false,
        infinite: true,
        loop: true,
        // centerMode: true,
        // centerPadding: '60px',
        speed: 500,
        // fade: true,
        autoplay: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]

    };
    return (
        <section className={styles.partners}>
            <div className='container'>
                {/* <p>Partner with us</p>
                <h3>Collaborate for Success: Become a<br /> Commbitz Partner</h3> */}
                <ul>
                    <Sdivder {...partner}>
                        <div className='partner-logo'><span><img src={PartnerSectionOne} width="180" height="50" alt="" /></span></div>
                        <div className='partner-logo'><span><img src={PartnerSectionTwo} width="180" height="50" alt="" /></span></div>
                        <div className='partner-logo'><span><img src={PartnerSectionThree} width="180" height="50" alt="" /></span></div>
                        <div className='partner-logo'><span><img src={PartnerSectionFour} width="180" height="50" alt="" /></span></div>
                        <div className='partner-logo'><span><img src={PartnerSectionFive} width="180" height="50" alt="" /></span></div>
                        <div className='partner-logo'><span><img src={PartnerSectionSix} width="180" height="50" alt="" /></span></div>
                        <div className='partner-logo'><span><img src={PartnerSectionSeven} width="180" height="50" alt="" /></span></div>
                    </Sdivder>
                </ul>
            </div>
        </section>
    )
}

export default PartnerSection;