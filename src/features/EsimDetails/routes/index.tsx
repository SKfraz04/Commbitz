import { useEffect, useState } from "react";
import moment from "moment";
import Slider from "react-slick";
import styles from '../styles/style.module.css';
import Layout from "../../../components/layout";
import Breadcrumb from '../../../components/breadcrumbs';
import DashboardSidebar from '../../../components/dashboardsidebar';
import cntflg from "../../../assets/images/cntflg.png"
import Pagination from "../../../components/pagination";
import MainLoader from "../../../components/mainLoader";
import CreateBlogModals from "../../../components/modals/CreateBlogModals";
import { useNavigate, useParams } from "react-router-dom";
import chip from "../../../assets/images/chip.png"
import chit from "../../../assets/images/chit.png"
import left from "../../../assets/images/left.png"
import tower from "../../../assets/images/tower.png"
import { getEsimDetails } from "../api";

function EsimDetails() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [getEsimDetals, setGetEsimDetals] = useState<any>([]);
    const [getSingleDetals, setGetSingleDetals] = useState<any>({});
    const [counts, setCounts] = useState<any>(1);
    const [currentPage, setCurrentPage] = useState<any>(1)
    const [loader, setLoader] = useState<boolean>(true);
    const [show, setShow] = useState<string>('');
    const [countryId, setCountryId] = useState<string>('');

    const currentDate = moment(new Date())

    useEffect(() => {
        getEsimDetails(id).then((res) => {
            setGetEsimDetals(res?.data)
            setGetSingleDetals(res?.data[0])
            setLoader(false)
        }).catch((error: any) => {
            console.log(error)
            setLoader(false)
        })
        window.scrollTo(0, 0);
    }, []);
   

    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <Layout>
            <Breadcrumb />
            {loader && <MainLoader />}
            <div className={styles.Profileouter}>
                <div className='container'>
                    <div className='row'>
                        <DashboardSidebar />
                        <div className='col-md-9'>
                            <div className={styles.ProfileRight}>
                                <div className={styles.UsageHeaqd}>
                                    <h5>{getSingleDetals?.name}</h5>
                                    <div className="row">
                                        {/* <div className="col-md-4">
                                            <div className={styles.UsageLeft}>
                                                <div className={styles.UsageBorder}>
                                                    <ul>
                                                        <li>
                                                            <span><img src={chip} alt="" /></span>
                                                            <div>
                                                                <span>Phone Number</span>
                                                                <h4>+91 0987654321</h4>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <span><img src={chip} alt="" /></span>
                                                            <div>
                                                                <span>Phone Number</span>
                                                                <h4>+91 0987654321</h4>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <span><img src={chip} alt="" /></span>
                                                            <div>
                                                                <span>Phone Number</span>
                                                                <h4>+91 0987654321</h4>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <span><img src={chip} alt="" /></span>
                                                            <div>
                                                                <span>Phone Number</span>
                                                                <h4>+91 0987654321</h4>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div> */}
                                        <div className="col-md-12">
                                            <div className={styles.usageRight}>
                                                <div className={styles.uagePag}>
                                                    <h6>Plan Overview</h6>
                                                    {getSingleDetals &&
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className={styles.usagePlan}>
                                                                    <ul>
                                                                        <li>
                                                                            <span>Left</span>
                                                                            <label>{
                                                                                getSingleDetals?.remainingQuantity % 1000 === 0
                                                                                    ? (getSingleDetals.remainingQuantity / 1000)
                                                                                    : (getSingleDetals.remainingQuantity / 1000).toFixed(1)
                                                                            } GB</label>
                                                                            <p>Internet</p>
                                                                        </li>
                                                                        <li>
                                                                            <span>Left</span>
                                                                            <label>
                                                                                {getSingleDetals?.assignmentState == 2 ?
                                                                                    `${moment(getSingleDetals?.endTime).diff(currentDate, 'days')} ` :
                                                                                    getSingleDetals?.assignmentState == 3 ? '0 ' :
                                                                                        `${getSingleDetals?.duration} `}
                                                                                Days</label>
                                                                            <p>Duration</p>
                                                                        </li>
                                                                    </ul>
                                                                    <span className={styles.expireUsge}>
                                                                        {getSingleDetals?.assignmentState == 2 ? `Validity  Expired on ${moment(getSingleDetals?.endTime).format("DD MMM YYYY")
                                                                            }` :
                                                                            getSingleDetals?.assignmentState == 3 ? 'Plan Expired' :
                                                                                'Plan Not Active'} </span>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className={styles.dataHistory}>
                                                                    <h4>
                                                                        {
                                                                            getSingleDetals?.initialQuantity % 1000 === 0
                                                                                ? (getSingleDetals.initialQuantity / 1000)
                                                                                : (getSingleDetals.initialQuantity / 1000).toFixed(1)
                                                                        } GB - {getSingleDetals?.duration} Days
                                                                    </h4>
                                                                    <ul>
                                                                        <li>
                                                                            <span><img src={tower} alt="" />Data</span>
                                                                            <label>{
                                                                                getSingleDetals?.initialQuantity % 1000 === 0
                                                                                    ? (getSingleDetals.initialQuantity / 1000)
                                                                                    : (getSingleDetals.initialQuantity / 1000).toFixed(1)
                                                                            } GB</label>
                                                                        </li>
                                                                        <li>
                                                                            <span><img src={left} alt="" />Validity</span>
                                                                            <label>{getSingleDetals?.duration} Days</label>
                                                                        </li>
                                                                        <li>
                                                                            <span><img src={chit} alt="" /> Speed</span>
                                                                            <label>{getSingleDetals?.speed?.length > 0 ? getSingleDetals?.speed.slice(-1) : 'Speed not Found'}</label>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    }
                                                </div>

                                                <div className={styles.uageSlider}>
                                                    <h6>Other Plans</h6>
                                                    <div className={styles.usgeSLiderMain}>
                                                        <div className="CusotmArow">
                                                            <Slider {...settings}>
                                                                {getEsimDetals && getEsimDetals.map((list: any) => (
                                                                    <div key={list?._id} className={`${styles.swapInner} pointer`} onClick={() => setGetSingleDetals(list)}>
                                                                        <div className={styles.dataHistory}>
                                                                            <h4>{
                                                                                list?.initialQuantity % 1000 === 0
                                                                                    ? (list.initialQuantity / 1000)
                                                                                    : (list.initialQuantity / 1000).toFixed(1)
                                                                            } GB - {list?.duration} Days
                                                                                <span className={list?.assignmentState == 2 ? styles.activeExpireUsge : styles.expireUsge}>
                                                                                    {list?.assignmentState == 2 ? `Active` :
                                                                                        list?.assignmentState == 3 ? 'Expired' :
                                                                                            'Not Active'} </span>
                                                                            </h4>
                                                                            <ul>
                                                                                <li>
                                                                                    <span><img src={tower} alt="" />Data</span>
                                                                                    <label>{
                                                                                        list?.initialQuantity % 1000 === 0
                                                                                            ? (list.initialQuantity / 1000)
                                                                                            : (list.initialQuantity / 1000).toFixed(1)
                                                                                    } GB</label>
                                                                                </li>
                                                                                <li>
                                                                                    <span><img src={left} alt="" />Validity</span>
                                                                                    <label>{list?.duration} Days</label>
                                                                                </li>
                                                                                <li>
                                                                                    <span><img src={chit} alt="" /> Speed</span>
                                                                                    <label>{list?.speed?.length > 0 ? list?.speed.slice(-1) : 'Speed not Found'}</label>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </Slider>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default EsimDetails
