import chkt from "../../../assets/images/chkt.png"
import { Link } from "react-router-dom";
import moment from "moment";


interface CheckoutLeftTableProps {
  styles: any;
  singleBundleData: any;
  increment: any;
  decrement: any
}

const CheckoutLeftTable: React.FC<CheckoutLeftTableProps> = ({ styles, singleBundleData, increment, decrement }) => {
  return (
    <div className={styles.leftcheckoutable}>
      <h6>Package Details</h6>
      <div className={styles.scrollTable}>
        <table>
          <tr>
            <th>Products</th>
            <th>Pack</th>
            <th>Quantity</th>
            <th>Sub-Total</th>
            <th>Action</th>
          </tr>
          <tr>
            <td>
              <div className={styles.itmenImage}>
                <span><img src={chkt} alt="" /></span>
                <div>
                  <h5>{singleBundleData?.name}</h5>
                  <label><i className="far fa-calendar-alt"></i> {moment().format('Do MMM YYYY')}</label>
                </div>
              </div>
            </td>
            <td>
              {/* <span className={styles.Noprice}>$99</span> */}
              ${(singleBundleData?.planPrice / singleBundleData?.quantity).toFixed(1)}</td>
            <td>
              <div className={styles.pliceselect}>
                <div className={styles.gormGroup}>
                  <span className={styles.decrement} onClick={(enevt) => decrement()}>-</span>
                  <input type='number' value={singleBundleData?.quantity} />
                  <span className={styles.increment} onClick={(enevt) => increment()}>+</span>
                </div>
              </div>
            </td>
            <td>${singleBundleData?.planPrice}</td>
            <td className={styles.trash}><i className="fas fa-trash-alt"></i></td>
          </tr>
        </table>
      </div>
      <div className={styles.retunShop}>
        <button>
          <Link to={"/esim"}><i className="fas fa-arrow-left"></i> Return to Shop</Link></button>
      </div>
    </div>
  )
}

export default CheckoutLeftTable