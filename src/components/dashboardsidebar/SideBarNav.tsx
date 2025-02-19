import mone from "../../assets/images/mone.png";
import mtwo from "../../assets/images/mtwo.png";
import mthree from "../../assets/images/mthree.png";
import mfour from "../../assets/images/mfour.png";
import mfive from "../../assets/images/mfive.png";
import msix from "../../assets/images/msix.png";
import { NavLink, Link, useLocation } from "react-router-dom";

import dashboardStyles from "./styles/dashboard.module.css";

const SideBarNav = () => {
  const location = useLocation();

  const isActiveRoute = (route: string) => {
    return location.pathname === route;
  };

  return (
    <div className={dashboardStyles.sidebar}>
      <ul>
        <li className={isActiveRoute("/profile") ? dashboardStyles.active : ""}>
          <NavLink to="/profile">
            <span>
              <img src={mone} alt="" />
            </span>
            My Account
          </NavLink>
        </li>
        {/* <li className={isActiveRoute('/my-plans') ? dashboardStyles.active : ''} >
                    <NavLink to="/my-plans">
                        <span>
                        <img src={mtwo} alt=""/>
                        </span>
                        My Plans
                    </NavLink>
                </li> */}
        <li
          className={isActiveRoute("/purchase") ? dashboardStyles.active : ""}
        >
          <Link to="/purchase">
            <span>
              <img src={mthree} alt="" />
            </span>
            My Purchased eSIM
          </Link>
        </li>
        {/* <li className={isActiveRoute('/usage') ? dashboardStyles.active : ''}>
                    <Link to="/usage">
                        <span>
                        <img src={mthree} alt=""/>
                        </span>
                       Usages
                    </Link>
                </li> */}
        <li
          className={
            isActiveRoute("/order-histories") ? dashboardStyles.active : ""
          }
        >
          <Link to="/order-histories">
            <span>
              <img src={mfour} alt="" />
            </span>
            Order History
          </Link>
        </li>
        {/* <li className={isActiveRoute('/') ? dashboardStyles.active : ''}>
                    <Link to="#">
                        <span>
                        <img src={mfive } alt=""/>
                        </span>
                        Loyalty Points
                    </Link>
                </li>  */}
        <li
          className={
            isActiveRoute("/notifications") ? dashboardStyles.active : ""
          }
        >
          <Link to="/notifications">
            <span>
              <img src={mfour} alt="" />
            </span>
            Notifications
          </Link>
        </li>
        <li className={isActiveRoute("/logout") ? dashboardStyles.active : ""}>
          <NavLink to="/logout">
            <span>
              <img src={msix} alt="" />
            </span>
            Logout
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SideBarNav;
