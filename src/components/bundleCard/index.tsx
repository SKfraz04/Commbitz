import { Link, useNavigate } from "react-router-dom";

import styles from './style.module.css';
import { Bundle } from "../../features/esim/interface";
import { addOrder, getDocumentStatus } from "../../features/checkout/api";
import useAuth from "../../lib/hooks/useAuth";
import { GetGeoLocations } from "../../utils/GetGeoLocation";
import { useEffect, useState } from "react";
import MainLoader from "../mainLoader";
import Swal from 'sweetalert2'
import DataIcon from "../../assets/images/DataIcon.svg"
import SpeedIcon from "../../assets/images/SpeedIcon.svg"
import ValidityIcon from "../../assets/images/ValidityIcon.svg"
import { getbundles } from "../../features/home/api";

interface Props {
    bundle: Bundle | null;
    coupon?: string | null
    topup?: string | null
};

const BundleCard = ({ bundle, coupon, topup }: Props) => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isMobile]);

    // const createOrder = () => {
    //     setLoader(true)
    //     GetGeoLocations()
    //         .then(async (data: any) => {
    //             // {latitude: 37.98597720335289, longitude :-103.31725006494221} for usa 
    //             getDocumentStatus(data).then((res: any) => {
    //                 setLoader(false)
    //                 if (res?.data?.showDocuments) {
    //                     // navigate(`/document/${bundle?._id}/?paymentGateway=${res?.data?.paymentGatewayType}`)
    //                     const basePath = `/document/${bundle?._id}`;
    //                     const url = topup
    //                         ? `${basePath}?topup=${btoa(topup !== undefined && topup !== null ? topup : '')}&coupon=${btoa(coupon !== undefined && coupon !== null ? coupon : '')}`
    //                         : coupon ? `${basePath}?coupon=${btoa(coupon !== undefined && coupon !== null ? coupon : '')}` : basePath;
    //                     navigate(`${url}/?paymentGateway=${res?.data?.paymentGatewayType}`);
    //                 } else {
    //                     let orderPayload: any = {
    //                         bundleId: bundle?._id,
    //                         couponId: coupon,
    //                     };
    //                     if (topup) orderPayload.iccid = topup

    //                     addOrder(orderPayload).then(Response => {
    //                         navigate(`/checkout/${Response?.data?.orderId}/?paymentGateway=${res?.data?.paymentGatewayType}`);
    //                         // navigate(`/checkout/${Response?.data?.orderId}`);
    //                     }).catch((error) => {
    //                         console.log(error)
    //                         setLoader(false)
    //                     });
    //                 };
    //             }).catch((error) => {
    //                 console.log(error)
    //                 setLoader(false)
    //             })
    //         })
    //         .catch((error) => {
    //             console.log("Error getting location:", error);
    //             setLoader(false)
    //             Swal.fire("Please enable your location service!");
    //         });
    // };

    const createOrder = (bundleId: string) => {
        setLoader(true);
        GetGeoLocations()
            .then(async (data: any) => {
        getDocumentStatus(data)
          .then((resGeo: any) => { 
              const orderPayload: any = {
                bundleId: bundleId,
                quantity: 1,
              };
              window.localStorage.setItem("showDocuments", resGeo?.data?.showDocuments)
              addOrder(orderPayload)
                .then((Response) => {
                  navigate(
                    `/checkout/${Response?.data?.orderId}/?paymentGateway=${resGeo?.data?.paymentGatewayType}`
                  );
                  setLoader(false);
                })
                .catch((error) => {
                  console.log(error);
                  setLoader(false);
                });
    
          })
          .catch((error) => {
            console.log(error);
            setLoader(false);
          });

            }).catch((error) => {
                console.log("Error getting location:", error);
                setLoader(false)
                Swal.fire("Please enable your location service!");
            });
      };
    return (
        <div className='col-md-3'>
            {loader && <MainLoader />}
            <div className={styles.esimDetails}>
                <div className={styles.FirtPack}>
                    <div className={styles.PackHead}>
                        <div className={styles.PackHeadLeft}>
                            <h4>{bundle?.name}</h4>
                            <p>{bundle?.bundleType == 1 ? "Country" : "Region"}</p>
                        </div>
                        <div className={styles.PackHeadRight}>
                            <span>{bundle?.priceSymbol} {bundle?.price?.toFixed(2)}</span>
                        </div>
                    </div>

                    <ul>
                        <li>
                            <span><img src={SpeedIcon} alt="" /> Data</span>
                            <h5>{bundle && (bundle?.dataAmount == -1 ? "Unlimited" : bundle?.dataAmount < 1000 ? bundle?.dataAmount + " MB" : (bundle?.dataAmount / 1000) + " GB")} </h5>
                        </li>
                        <li>
                            <span><img src={ValidityIcon} alt="" /> Validity</span>
                            <h5>{bundle?.duration} Days</h5>
                        </li>
                        <li>
                            <span><img src={DataIcon} alt="" /> Speed</span>
                            <h5>{bundle?.speed && bundle.speed.length > 0 ? bundle.speed.slice(-1) : 'Speed not Found'}</h5>
                        </li>
                    </ul>
                    <div className={styles.viewAll}>
                        <div onClick={()=>createOrder(bundle?._id as string)} className={styles.buySimBtn}>
                        BUY NOW
                    </div>

                        {/* <div aria-label="Buy Now esim" onClick={() => navigate(`/esim/${bundle?.name}/${bundle?._id}`)} className={styles.buySimBtn}>
                            BUY NOW
                        </div> */}
                        {/* <Link to={`/esim/${bundle?.name}/${bundle?._id}`}>VIEW</Link> */}
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default BundleCard;