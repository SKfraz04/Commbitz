import styles from '../styles/style.module.css';
import Layout from "../../../components/layout"
import Breadcrumb from '../../../components/breadcrumbs';
import DashboardSidebar from '../../../components/dashboardsidebar';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataFailure, fetchDataStart, fetchDataSuccess } from '../../../redux/slices/userSlice';
import { getUserData } from '../../../redux/api';
import { getInventory } from '../api';
import MainLoader from '../../../components/mainLoader';
import Pagination from '../../../components/pagination';
import chkt from "../../../assets/images/chkt.png"
import { Link } from 'react-router-dom';



const Dashboard = () => {

    const [getInventoryLists, setGetInventoryLists] = useState<any>();
    const [counts, setCounts] = useState<any>(1);
    const [currentPage, setCurrentPage] = useState<any>(1)
    const [loader, setLoader] = useState<boolean>(false);

    const dispatch = useDispatch();

    const { data } = useSelector((state: any) => state.getUserData);

    useEffect(() => {
        const userData = async () => {
            dispatch(fetchDataStart());
            try {
                const userData = await getUserData();
                dispatch(fetchDataSuccess(userData?.data));
            } catch (error: any) {
                dispatch(fetchDataFailure(error.message));
            }
        }
        userData()
        window.scrollTo(0, 0);
    }, [dispatch]);

    useEffect(() => {
        getInventory({ pageNo: currentPage, limit: 10 }).then((res: any) => {

            setCounts(res?.data?.count)
            setGetInventoryLists(res?.data?.inventory)
        })

    }, []);
    // Function to handle page change
    const handlePageChange = async (page: number) => {
        setLoader(true)
        setCurrentPage(page)
        getInventory({ pageNo: page, limit: 10 }).then((res: any) => {

            setCounts(res?.data?.count)
            setGetInventoryLists(res?.data?.inventory)
            setLoader(false)
        })
    };


    return (
        <Layout>
            <Breadcrumb />
            <div className={styles.Profileouter}>
                <div className='container'>
                    <div className='row'>
                        <DashboardSidebar />
                        {/* <DashboardRight styles={styles} /> */}

                        <div className='col-md-9'>
                            {loader && <MainLoader />}
                            <div className={styles.ProfileRight}>
                                <div className={styles.topDesc}>
                                    <h6>Dashboard</h6>
                                    <h3>Hello, {data?.fullName}</h3>
                                    <p>From your My Account Dashboard you have the ability to view a snapshot of your recent account activity and update your account information. Select a link below to view or edit information.</p>
                                </div>
                                <div className='row'>
                                    {getInventoryLists && getInventoryLists.length > 0 ?
                                        getInventoryLists.map((data: any) =>
                                            <div className='col-md-4' style={{"padding": "10px"}}>
                                                <div className={styles.dashBox}>
                                                    <div className={styles.topDash}>
                                                        <span><img src={chkt} alt=""/></span>
                                                    </div>
                                                    <div className={styles.btnDash}>
                                                        <div className={styles.rateDas}>
                                                            <p>Total eSIM</p>
                                                            <h6>{data?.quantity}</h6>
                                                        </div>
                                                        <Link to={`/InventoryPackages/${data?._id}`}><span>View Plans</span></Link>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                        : <div className="dataNotFound">Dota not founds</div>
                                    }
                                </div>
                                {counts > 1 && <Pagination count={counts} handlePageChange={handlePageChange} currentPage={currentPage} itemsPerPage={10} />
                                }
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;