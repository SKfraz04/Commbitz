import slone from "../../../assets/images/slone.png";
import sltwo from "../../../assets/images/sltwo.png";
import slthree from "../../../assets/images/slthree.png";
import crone from "../../../assets/images/crone.svg";
import cntflg from "../../../assets/images/cntflg.png";

import crtwo from "../../../assets/images/crtwo.svg";
import crthree from "../../../assets/images/crthree.svg";
import Swal from "sweetalert2";
import Slider from "react-slick";
import styles from "../styles/home.module.css";
import { useEffect, useState } from "react";
import useAuth from "../../../lib/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { addOrder, getDocumentStatus } from "../../checkout/api";
import { GetGeoLocations } from "../../../utils/GetGeoLocation";
import MainLoader from "../../../components/mainLoader";
import disc from "../../../assets/images/disc.svg";
import srchic from "../../../assets/images/srchic.svg";

interface HomeBannerProps {
  bannerEsim: any;
}
const HomeBanner: React.FC<HomeBannerProps> = ({ bannerEsim }) => {
  const [loader, setLoader] = useState(false);

  const bundles = Array.from({ length: 3 }, () => bannerEsim).flat();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  var settings = {
    dots: true,
    arrow: false,
    pauseOnHover: false,
    infinite: true,
    loop: true,
    speed: 100,
    fade: true,
    cssEase: "linear",
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // const createOrder = (id: any) => {
  //   setLoader(false);
  //   GetGeoLocations()
  //     .then(async (data: any) => {
  //       getDocumentStatus(data)
  //         .then((res: any) => {
  //           setLoader(false);
  //           if (res?.data?.showDocuments) {
  //             navigate(`/document/${id}`);
  //           } else {
  //             let orderPayload: any = {
  //               bundleId: id,
  //             };

  //             addOrder(orderPayload)
  //               .then((res) => {
  //                 navigate(`/checkout/${res?.data?.orderId}`);
  //               })
  //               .catch((error) => {
  //                 console.log(error);
  //                 setLoader(false);
  //               });
  //           }
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //           setLoader(false);
  //         });
  //     })
  //     .catch((error) => {
  //       console.log("Error getting location:", error);
  //       setLoader(false);
  //       Swal.fire("Please enable your location service!");
  //     });
  // };

  return (
    <section className={styles.BannerSection}>
      {/* {loader && <MainLoader />} */}
      <div className="homeSlids">
        <Slider {...settings}>
          <div className={styles.outreHomeside}>
            <img
              className={styles.bnrImage}
              width="1920"
              height="310"
              src={slone}
              alt="Tourism eSim"
            />
            <div className={styles.innerHomeSlide}>
              <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-8">
                  {/* <div className={`${styles.dotsone} ${styles.innerHomeSlideRight}`}>
                    <div className={styles.outerCirlcle}>
                      <img src={crone} alt="" />
                      <div className="bullets">
                        <span className="bulletone"></span>
                        <span className="bullettwo"></span>
                        <span className="bulletthree"></span>
                      </div>
                    </div>
                    <div className={styles.CountryInCircle}>
                      <div className={styles.topHeadFlag}>
                        <h4>{bundles[0]?.name}<img src={bundles[0]?.flagImageUrl} alt="" /></h4>
                        <ul>
                          <li>
                            <div className={styles.innerPlabs}>
                              <span>Data</span>
                              <h6>{(bundles[0]?.dataAmount)}</h6>
                            </div>
                          </li>
                          <li>
                            <div className={styles.innerPlabs}>
                              <span>Validity</span>
                              <h6>{bundles[0]?.duration} Days</h6>
                            </div>
                          </li>
                          <li>
                            <div className={styles.innerPlabs}>
                              <span>Speed</span>
                              <h6>{bundles[0]?.speed && bundles[0].speed.length > 0 ? bundles[0].speed.slice(-1) : 'Speed not Found'}</h6>
                            </div>
                          </li>
                        </ul>
                        <div className={styles.layBtn}>
                          <button aria-label="Buy Now esim" onClick={(e) => createOrder(bundles[0]._id)} >Buy Now </button>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.outreHomeside}>
            <img
              className={styles.bnrImage}
              width="1920"
              height="310"
              src={sltwo}
              alt="International eSim"
            />
            <div className={styles.innerHomeSlide}>
              <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-8">
                  {/* <div className={`${styles.dotstwo} ${styles.innerHomeSlideRight}`}>
                    <div className={styles.outerCirlcle}>
                      <img src={crtwo} alt="" />
                      <div className="bullets">
                        <span className="bulletone"></span>
                        <span className="bullettwo"></span>
                        <span className="bulletthree"></span>
                      </div>
                    </div>
                    <div className={styles.CountryInCircle}>
                      <div className={styles.topHeadFlag}>
                        <h4>{bundles[1]?.name}<img src={bundles[1]?.flagImageUrl} alt="" /></h4>
                        <ul>
                          <li>
                            <div className={styles.innerPlabs}>
                              <span>Data</span>
                              <h6>{(bundles[1]?.dataAmount)}</h6>
                            </div>
                          </li>
                          <li>
                            <div className={styles.innerPlabs}>
                              <span>Validity</span>
                              <h6>{bundles[1]?.duration} Days</h6>
                            </div>
                          </li>
                          <li>
                            <div className={styles.innerPlabs}>
                              <span>Speed</span>
                              <h6>{bundles[1]?.speed && bundles[1].speed.length > 0 ? bundles[1].speed.slice(-1) : 'Speed not Found'}</h6>
                            </div>
                          </li>
                        </ul>
                        <div className={styles.layBtn}>
                          <button onClick={(e) => createOrder(bundles[1]._id)} >Buy Now </button>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  {/* <div className={styles.afordableSim}>
                    <h4>Affordable eSIM.<br /> Global Connectivity.<br /> Unlimited Freedom.</h4>
                  </div> */}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.outreHomeside}>
            <img
              width="1920"
              height="310"
              className={styles.bnrImage}
              src={slthree}
              alt="Travel eSim"
            />
            <div className={styles.innerHomeSlide}>
              <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-8">
                  {/* <div className={`${styles.dotsthree} ${styles.innerHomeSlideRight}`}>
                    <div className={styles.outerCirlcle}>
                      <img src={crthree} alt="" />
                      <div className="bullets">
                        <span className="bulletone"></span>
                        <span className="bullettwo"></span>
                        <span className="bulletthree"></span>
                      </div>
                    </div>
                    <div className={styles.CountryInCircle}>
                      <div className={styles.topHeadFlag}>
                        <h4>{bundles[2]?.name}<img src={bundles[2]?.flagImageUrl} alt="" /></h4>
                        <ul>
                          <li>
                            <div className={styles.innerPlabs}>
                              <span>Data</span>
                              <h6>{(bundles[2]?.dataAmount)}</h6>
                            </div>
                          </li>
                          <li>
                            <div className={styles.innerPlabs}>
                              <span>Validity</span>
                              <h6>{bundles[2]?.duration} Days</h6>
                            </div>
                          </li>
                          <li>
                            <div className={styles.innerPlabs}>
                              <span>Speed</span>
                              <h6>{bundles[2]?.speed && bundles[2].speed.length > 0 ? bundles[2].speed.slice(-1) : 'Speed not Found'}</h6>
                            </div>
                          </li>
                        </ul>
                        <div className={styles.layBtn}>
                          <button onClick={() => createOrder(bundles[2]._id)} >Buy Now </button>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  {/* <div className={styles.afordableSim}>
                    <h4>Affordable eSIM.<br /> Global Connectivity.<br /> Unlimited Freedom.</h4>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </Slider>
        <div className={styles.innerHomeSlideLeft}>
          <div className="stay-new">
            <h6>Stay Connected Everywhere!</h6>
            <h3>
              Travel Smart
              <br /> with eSIM.
            </h3>
          </div>
          <div className={styles.afordableSim}>
            <h4>
              Affordable eSIM.
              <br /> Global Connectivity.
              <br /> Unlimited Freedom.
            </h4>
          </div>

          {/* <div className={styles.SimpleSearch}>
            <span><img src={srchic} alt="" /></span>
            <input type="text" placeholder="Search Destination" />
            <button>Search</button>
          </div> */}
          {/* <div className="diaCountImg">
            <img src={disc} alt="" />
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
