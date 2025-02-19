import React from 'react'
import styles from './style.module.css'
import moment from 'moment';

interface OrderHistoryModalsProps {
    show : any;
    handlePaymentHistoryClose : any;
    orderDetail:any
}
const OrderHistoryModals : React.FC<OrderHistoryModalsProps> = ({show, handlePaymentHistoryClose, orderDetail}) => {
  return (
            
    <div className={`modal fade ${show}`} style={{ display: show ? 'block' : 'none' }} id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">    
                <div className="modal-content">
                <div className="modal-head welHead">
                    <button type="button" onClick={()=>handlePaymentHistoryClose()} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body p-0">
                        <div className={styles.billingdata}>
                                <h4>Order History</h4>
                                <div className={styles.TravelSim}>
                                    <h6>Travel Sim</h6>
                                    <span>{orderDetail?.name}</span>
                                </div>
                                <ul>
                                    <li>
                                        {orderDetail?.paymentStatus == 2 ? <> <span>Status</span><label className={styles.grn}>Completed</label></> :
                                    <><span>Status</span><label className={styles.red}>Decline</label></>}
                                        </li>
                                    <li><span>Plan</span><label > {orderDetail?.dataAmount == -1
                              ? "Unlimited"
                              : orderDetail?.dataAmount / 1000 >= 1
                              ? orderDetail?.dataAmount / 1000 + " GB"
                              : orderDetail?.dataAmount + " MB"}</label></li>
                                </ul>
                                <div className={styles.billingDetails}>
                                    <h6>Billing Details</h6>
                                    <ul>
                                        <li><span>Date</span><label >{moment(orderDetail?.createdAt).format('DD MMM YYYY')}</label></li>
                                        <li><span>Amount Paid</span><label>{`${orderDetail?.priceSymbol} ${orderDetail?.finalPrice}`}</label></li>
                                        <li><span>Offer applied</span><label>
                                            {`${orderDetail?.priceSymbol} ${orderDetail?.discountPrice}`}
                                            </label>
                                        </li>
                                        <li><span>Payment method</span><label>UPI</label></li>
                                    </ul>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default OrderHistoryModals