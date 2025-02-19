import { useEffect, useState } from "react";
import moment from "moment";

import styles from '../styles/style.module.css';
import Layout from "../../../components/layout";
import Breadcrumb from '../../../components/breadcrumbs';
import DashboardSidebar from '../../../components/dashboardsidebar';
import cntflg from "../../../assets/images/cntflg.png"
import { getEsimList } from "../api";
import Pagination from "../../../components/pagination";
import MainLoader from "../../../components/mainLoader";
import CreateBlogModals from "../../../components/modals/CreateBlogModals";
import PackEsim from './PackEsim';
import { useNavigate } from "react-router-dom";

const Purchase = () => {
    const [qrUrl, setQrUrl] = useState<any>({});
    const navigate = useNavigate();

    const [getInventoryLists, setGetInventoryLists] = useState<any>();
    const [counts, setCounts] = useState<any>(1);
    const [currentPage, setCurrentPage] = useState<any>(1)
    const [loader, setLoader] = useState<boolean>(true);
    const [show, setShow] = useState<string>('');
    const [countryId, setCountryId] = useState<string>('');


    useEffect(() => {
        getEsimList().then((res: any) => {
            setCounts(res?.data?.length)
            setGetInventoryLists(res?.data?.slice(0, 10))
            setLoader(false)
        }).catch((error: any) => {
            setLoader(false)
        })
        window.scrollTo(0, 0);
    }, []);

    // Function to handle page change
    const handlePageChange = async (page: number) => {
        setLoader(true)
        const startpage = page == 1 ? (page - 1) * 10 : (page - 1) * 10
        getEsimList().then((res: any) => {
            setCounts(res?.data?.length)
            setGetInventoryLists(res?.data?.slice(startpage, page * 10))
            setCurrentPage(page)
            setLoader(false)
        }).catch((error: any) => {
            setLoader(false)
        })
    };

    const handleCloseModal = (newValue: any) => {
        setShow(newValue)
    };
    const handleCrateBlogPopup = (countryId: string) => {
        setCountryId(countryId)
        setShow("show")
    }

    const handleQrCode = (data: string, type: number) => {
        setQrUrl({ data, type })
    }
    return (
        <Layout>
            <Breadcrumb />
            <div className={styles.Profileouter}>
                <div className='container'>
                    <div className='row'>
                        <DashboardSidebar />
                        {Object.keys(qrUrl).length == 0 ?
                            <div className='col-md-9'>
                                {loader && <MainLoader />}
                                <div className={styles.ProfileRight}>
                                    <h5>My Purchased eSIM</h5>
                                    <div className={styles.topFilter}>
                                    </div>
                                    <div className={styles.tableData}>
                                        <table>
                                            <tr> <th>Purchased On</th>
                                                <th>Country Name</th>
                                                <th>SIM ID</th>
                                                <th>View QR</th>
                                                <th>View Code</th>
                                                <th>Topup</th>
                                                {/* <th>Action</th> */}
                                            </tr>
                                            {getInventoryLists && getInventoryLists.length > 0 ?
                                                getInventoryLists.map((list: any) =>
                                                    <tr>
                                                        <td>{moment(list?.createdAt).format('Do MMM YYYY')}</td>
                                                        <td>{list?.name || "N/A"}</td>
                                                        <td className="pointer" onClick={()=> navigate(`/esim-details/${list?.iccid}`)}>{list?.iccid}</td>
                                                        <td className={`${styles.green}`}><span className="pointer" onClick={() => handleQrCode(list, 1)}>QR</span></td>
                                                        <td className={styles.green}><span className="pointer" onClick={() => handleQrCode(list?.smdpCode, 2)} >Code</span></td>
                                                        <td className={styles.green}><span className="pointer" onClick={() => navigate(`/esim-list?topup=${btoa(JSON.stringify({country : list?.countryId, iccid : list?.iccid}))}`)}>Topup</span></td>
                                                        {/* <td className={styles.green}><span className="pointer" onClick={() => handleCrateBlogPopup(list?.countryId)}>Create Blog</span></td> */}
                                                    </tr>
                                                )
                                                :
                                                <tr>
                                                    <td colSpan={6} className="text-center"> Data not found</td>
                                                </tr>
                                            }
                                        </table>
                                        <Pagination count={counts} handlePageChange={handlePageChange} currentPage={currentPage} itemsPerPage={10} />
                                        <CreateBlogModals show={show} handleCloseModal={handleCloseModal} countryId={countryId} />
                                    </div>
                                </div>
                            </div>
                            : <PackEsim getQrCode={qrUrl} />}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Purchase;