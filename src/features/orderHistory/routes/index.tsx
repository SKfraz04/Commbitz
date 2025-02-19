import { useEffect, useState } from "react";
import moment from "moment";

import styles from "../styles/style.module.css";
import Layout from "../../../components/layout";
import Breadcrumb from "../../../components/breadcrumbs";
import DashboardSidebar from "../../../components/dashboardsidebar";
import cntflg from "../../../assets/images/cntflg.png";
import { getOrderHistories } from "../api";
import Pagination from "../../../components/pagination";
import MainLoader from "../../../components/mainLoader";
import OrderHistoryModals from "../../../components/modals/OrderHistoryModals";
import { getOrderDetails } from "../../checkout/api";

const OrderHistory = () => {
  const [getOrdreLists, setGetOrderLists] = useState<any>();
  const [counts, setCounts] = useState<any>(0);
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [loader, setLoader] = useState<boolean>(false);
  const [orderDetail, setOrderDetail] = useState<any>();
  const [show, setShow] = useState("");

  useEffect(() => {
    getOrderHistories({ pageNo: 1, limit: 10, status: 4 })
      .then((res: any) => {
        setCounts(res?.data?.count);
        setGetOrderLists(res?.data.orders);
        setCurrentPage(1);
        setLoader(false);
      })
      .catch((error) => {
        console.error("Error getting location:", error);
        setLoader(false);
      });
    window.scrollTo(0, 0);
  }, []);

  //        // Function to handle page change
  const handlePageChange = async (page: number) => {
    setLoader(true);
    getOrderHistories({ pageNo: page, limit: 10, status: 4 })
      .then((res: any) => {
        setCounts(res?.data?.count);
        setGetOrderLists(res?.data.orders);
        setCurrentPage(page);
        setLoader(false);
      })
      .catch((error) => {
        console.error("Error getting location:", error);
        setLoader(false);
      });
  };

  const handlePaymentHistory = (id: any) => {
    setLoader(true);
    getOrderDetails(id)
      .then((res) => {
        setOrderDetail(res?.data);
        setLoader(false);
        setShow("show");
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
      });
  };
  const handlePaymentHistoryClose = () => {
    setShow("");
  };
  return (
    <Layout>
      <Breadcrumb />
      <div className={styles.Profileouter}>
        <div className="container">
          <div className="row">
            <DashboardSidebar />
            <div className="col-md-9">
              {loader && <MainLoader />}
              <div className={styles.ProfileRight}>
                <h5>Order History</h5>
                <div className={styles.topFilter}></div>
                <div className={styles.tableData}>
                  <table>
                    <tr>
                      {" "}
                      <th>Order Date</th>
                      <th>Country</th>
                      <th>Quantity</th>
                      <th>Data</th>
                      <th>validity</th>
                      <th>Price</th>
                      <th>Plateform</th>
                      <th>Status</th>
                    </tr>
                    {getOrdreLists && counts > 0 ? (
                      getOrdreLists.map((list: any) => (
                        <tr>
                          <td>
                            {moment(list?.createdAt).format("Do MMM YYYY")}
                          </td>
                          <td>
                            <img src={list?.name} alt="" />
                            {list?.name}
                          </td>
                          <td>{list?.quantity}</td>
                          <td>
                            {list?.dataAmount == -1
                              ? "Unlimited"
                              : list?.dataAmount / 1000 >= 1
                              ? list?.dataAmount / 1000 + " GB"
                              : list?.dataAmount + " MB"}
                          </td>

                          <td>{list?.duration} days</td>
                          <td>
                            {!list?.isFree
                              ? list?.priceSymbol +
                                "" +
                                list?.price +
                                " " +
                                list?.priceCurrency
                              : "Free"}
                          </td>
                          <td>
                            {!list?.partnerWebsiteName
                              ? "commbitz.com"
                              : list?.partnerWebsiteName}
                          </td>
                          {list?.orderStatus === 1 ? (
                            <td className={styles.yellow}>
                              <span
                                onClick={() => handlePaymentHistory(list?._id)}
                              >
                                Decline
                              </span>
                            </td>
                          ) : (
                            <td className={styles.green}>
                              <span
                                onClick={() => handlePaymentHistory(list?._id)}
                              >
                                Completed
                              </span>
                            </td>
                          )}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="text-center">
                          {" "}
                          Data not found
                        </td>
                      </tr>
                    )}
                  </table>
                  <Pagination
                    count={counts}
                    handlePageChange={handlePageChange}
                    currentPage={currentPage}
                    itemsPerPage={10}
                  />
                </div>
              </div>
              {show && (
                <OrderHistoryModals
                  show={show}
                  handlePaymentHistoryClose={handlePaymentHistoryClose}
                  orderDetail={orderDetail}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderHistory;
