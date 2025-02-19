import styles from '../styles/style.module.css';
import Layout from "../../../components/layout";
import Breadcrumb from '../../../components/breadcrumbs';
import DashboardSidebar from '../../../components/dashboardsidebar';
import { useEffect, useState } from "react";
import { geNotificationsApi } from "../api";
import moment from "moment";
import Pagination from "../../../components/pagination";
import MainLoader from "../../../components/mainLoader";



const Notifications = () => {
    const [getNotificationLists, setGeNotificationLists] = useState<any>();
    const [counts, setCounts] = useState<any>(0);
    const [currentPage, setCurrentPage] = useState<any>(1)
    const [loader, setLoader] = useState<boolean>(false);



    useEffect(() => {
        geNotificationsApi({ pageNo: 1, limit: 10 }).then((res: any) => {
            setCounts(res?.data?.count)
            setGeNotificationLists(res?.data?.notifications)
            setCurrentPage(1)
            setLoader(false)
        })
            .catch((error) => {
                console.error('Error getting location:', error);
                setLoader(false)
            })
            window.scrollTo(0, 0);
    }, []);

    //        // Function to handle page change
    const handlePageChange = async (page: number) => {
        setLoader(true)
        geNotificationsApi({ pageNo: page, limit: 10 }).then((res: any) => {
            setCounts(res?.data?.count)
            setGeNotificationLists(res?.data?.notifications)
            setCurrentPage(page)
            setLoader(false)
        })
            .catch((error) => {
                console.error('Error getting location:', error);
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
                        <div className='col-md-9'>
                            {loader && <MainLoader />}
                            <div className={styles.ProfileRight}>
                                <h5>Notifications</h5>
                                <div className={styles.tableData}>
                                    <div className={styles.notifications}>
                                        {getNotificationLists && counts > 0 ?
                                           getNotificationLists.map((list: any) => (
                                            <>
                                            <h6 className={styles.notificationTitle}>{moment(list?._id, "DD-MM-YYYY").format('Do MMM YYYY')}</h6>
                                            <div key={list?._id} className={styles.NotificationInner}> 
                                              {list?.notifications?.map((notification: any) => (
                                                <div key={notification?._id} className={styles.notificationList}>
                                                  <h6>
                                                    {notification?.title}
                                                  </h6>
                                                  <p style={{ color: "#fff" }}>{notification?.description}</p>
                                                </div>
                                              ))}
                                            </div>
                                            </>
                                          ))
                                            :
                                            <div>
                                                <h3>{`Notification not found`}</h3>
                                            </div>
                                        }
                                    </div>

                                    <Pagination count={counts} handlePageChange={handlePageChange} currentPage={currentPage} itemsPerPage={10} />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Notifications;