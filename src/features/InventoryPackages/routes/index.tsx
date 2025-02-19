import styles from '../styles/style.module.css';
import Layout from "../../../components/layout"
import Breadcrumb from '../../../components/breadcrumbs';
import DashboardSidebar from '../../../components/dashboardsidebar';
import { useEffect, useState } from "react";
import { addToEsim, getOrderReferenc } from "../api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Pagination from "../../../components/pagination";
import chkt from "../../../assets/images/chkt.png"



const InventoryPackages = () => {
    const { id }: any = useParams();
    const [getInventoryLists, setGetInventoryLists] = useState<any>();
    const [counts, setCounts] = useState<any>(1);
    const [currentPage, setCurrentPage] = useState<any>(1)
    const [pageLoading, setPageLoading] = useState<any>(true)
    const navigate = useNavigate()

    const getInventoryList = async () => {

        const getOrderReference = (await getOrderReferenc(id))?.data
        setCounts(getOrderReference?.length)
        setGetInventoryLists(getOrderReference?.slice(0, 10))
    }

    useEffect(() => {
        getInventoryList();
    }, []);
    const handleEsimAdd = async (id: string) => {
        toast.promise(
            addToEsim({ inventoryId: id }),
            {
                pending: {
                    render() {
                        return 'Trying to add to esim';
                    }
                },
                success: {
                    render({ data }) {
                        navigate('/purchase')
                        return 'esim add Successful';
                    }
                },
                error: {
                    render({ data }: any) {
                        return data.data.message;
                    }
                }
            });
    }
    // Function to handle page change
    const handlePageChange = async (page: number) => {
        setPageLoading(false)
        const getOrderReference = (await getOrderReferenc(id))?.data
        setCounts(getOrderReference?.length)
        const startpage = page == 1 ? (page - 1) * 10 : (page - 1) * 10
        setGetInventoryLists(getOrderReference?.slice(startpage, page * 10))
        setCurrentPage(page)
        setPageLoading(true)
    };
    if (!pageLoading) {
        return <div>Loading...</div>
    }
    return (
        <Layout>
            <Breadcrumb />
            <div className={styles.Profileouter}>
                <div className='container'>
                    <div className='row'>
                        <DashboardSidebar />
                        <div className='col-md-9'>
                            <div className={styles.ProfileRight}>
                                <div className={styles.topDesc}>
                                    <h6>Dashboard</h6>
                                    <h3>Inventory Plans</h3>
                                </div>
                                <div className='row'>
                                    {getInventoryLists && getInventoryLists.length > 0 ?
                                        getInventoryLists.map((data: any) =>
                                            <div className='col-md-4' style={{ "padding": "10px" }}>
                                                <div className={styles.dashBox}>
                                                    <div className={styles.topDash}>
                                                        <span><img src={chkt} alt="" /></span>
                                                        <div className={styles.leftTopDas}>
                                                            <h5>{data?.name}</h5>
                                                        </div>
                                                    </div>
                                                    <div className={styles.btnDash}>
                                                        <div className={styles.rateDas}>
                                                            <p>Total eSIm’s</p>
                                                            <h6>{data?.quantity}</h6>
                                                        </div>
                                                        <span className={styles.addToEsim} onClick={() => handleEsimAdd(data?._id)}>Active Plan</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                        : <div className="dataNotFound">Data not found</div>
                                    }
                                </div>
                                <Pagination count={counts} handlePageChange={handlePageChange} currentPage={currentPage} itemsPerPage={10} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default InventoryPackages;