import logo from "../../assets/images/logo.webp";
import { Link, NavLink, useLocation } from "react-router-dom";
import useAuth from "../../lib/hooks/useAuth";
import navtwo from "../../assets/images/navtwo.svg";
import navthree from "../../assets/images/navthree.svg";
import navfour from "../../assets/images/navfour.svg";
import navfive from "../../assets/images/navfive.svg";
import navsix from "../../assets/images/navsix.svg";
import navseven from "../../assets/images/navseven.svg";
import naveight from "../../assets/images/naveight.svg";
import navten from "../../assets/images/navten.svg";
import navele from "../../assets/images/navele.svg";
import back from "../../assets/images/back.svg";
import styles from "./style.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataFailure, fetchDataStart, fetchDataSuccess } from "../../redux/slices/userSlice";
import { getUserData } from '../../redux/api';

const NavBar = () => {
  const { isAuthenticated } = useAuth();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [loader, setLoader]= useState<boolean>(true);
  const { data } : any = useSelector((state: any) => state.getUserData);
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = async () => {
      dispatch(fetchDataStart());
      try {
        const userData = await getUserData();
        dispatch(fetchDataSuccess(userData?.data));
        setLoader(false)
      } catch (error: any) {
        dispatch(fetchDataFailure(error.message));
      }
    }
    if(isAuthenticated) userData()
      
  }, [isAuthenticated]);
  
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const location = useLocation();
  const [toggle, setToggle] = useState(false);

  const isActiveRoute = (route: string) => {
    return location.pathname === route;
  };

  return (
    <div className={styles.menuHead}>
      <div className="container">
        <nav className="navbar navbar-expand-lg pt-0">
          <div className="container-fluid p-0">
            <Link className="navbar-brand" to="/">
              <img width="190" height="78" src={logo} alt="Commbitz logo" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              onClick={!toggle ? () => setToggle(true) : () => setToggle(false)}
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon">
                <i className="fas fa-bars"></i>
              </span>
            </button>
            {isMobile ? (
              <div className="mobUsername">
                <h4>
                  Hi <b> {isAuthenticated ? data?.fullName : "Guest"},</b>
                </h4>
                <h5>Where are you treavling</h5>
              </div>
            ) : (
              false
            )}

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
              style={toggle ? { display: "block" } : { display: "none" }}
            >
              <ul className={styles.navbar}>
                <li className={isActiveRoute("/") ? styles.active : ""}>
                  <NavLink className="nav-Link" to="/">
                    Home
                  </NavLink>
                </li>
                <li className={isActiveRoute("/about") ? styles.active : ""}>
                  <NavLink className="nav-Link" to="/about">
                    About Us
                  </NavLink>
                </li>
                <li className={isActiveRoute("/esim-list") ? styles.active : ""}>
                  <NavLink className={`nav-Link`} to="/esim-list">
                    eSIM
                  </NavLink>
                </li>
                <li
                  className={
                    isActiveRoute("/blog") || isActiveRoute("/blogdetail")
                      ? styles.active
                      : ""
                  }
                >
                  <a className="nav-Link" href="https://commbitz.com/blog/">
                    Blogs
                  </a>
                </li>
                <li className={isActiveRoute("/contact") ? styles.active : ""}>
                  <NavLink className="nav-Link" to="/contact">
                    Contact Us
                  </NavLink>
                </li>
              </ul>
              {isMobile ? (
                <>
                  <div className="newmobileSidebar" onClick={!toggle ? () => setToggle(true) : () => setToggle(false)}>
                    <div className="navback" >
                      <span>
                        <img src={back} alt="" />
                      </span>
                      <h4>Profile</h4>
                    </div>
                    <div className="topSideHead">
                         <div className="lefttopSideHead">
                         <span>
                           {/* <img src={data?.avatar?.data?.avatar:userImg} alt={data?.fullName} /> */}
                         </span>
                         <div>
                           <h5>Hi {isAuthenticated ? data?.fullName : "Guest"},</h5>
                           <h6>{isAuthenticated ? data?.email : "Where are you treavling"}</h6>
                         </div>
                       </div>
                    </div>
                    <ul>
                      <li>
                        <NavLink className="nav-Link" to="/">
                          <span>
                            <img src={navtwo} alt="" />
                          </span>
                          Home
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="nav-Link" to="/about">
                          <span>
                            <img src={naveight} alt="" />
                          </span>
                          About Us
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className={`nav-Link`} to="/esim-list">
                          <span>
                            <img src={navthree} alt="" />
                          </span>
                          eSIM
                        </NavLink>
                      </li>
                      <li>
                        <a href="https://commbitz.com/blog/">
                          <span>
                            <img src={navfour} alt="" />
                          </span>{" "}
                          Blog
                        </a>
                      </li>
                      <li>
                        <NavLink className="nav-Link" to="/faq">
                          <span>
                            <img src={navten} alt="" />
                          </span>
                          FAQ’s
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="nav-Link" to="/troubleshoot">
                          <span>
                            <img src={navfive} alt="" />
                          </span>
                          Troubleshooting
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="nav-Link" to="/features">
                          <span>
                            <img src={navele} alt="" />
                          </span>
                          Features
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="nav-Link" to="/contact">
                          <span>
                            <img src={naveight} alt="" />
                          </span>
                          Contact Us
                        </NavLink>
                      </li>

                      {isAuthenticated ? (
                        <>
                          <li>
                            <Link to="/profile">
                              <img src={navsix} alt="" />
                              Profile
                            </Link>
                          </li>
                          <li>
                            <NavLink to="/logout">
                              <span>
                                <img src={navseven} alt="" />
                              </span>
                              Logout
                            </NavLink>
                          </li>
                        </>
                      ) : (
                        <li>
                          <Link to="/login">Signup / Login</Link>
                        </li>
                      )}

                      {/* <li><a href="#"><span><img src={naveight} alt="" /></span> Terms &Condition</a></li>

                      <li><a href="#"><span><img src={naveight} alt="" /></span> Privacy Policy</a></li>
                      <li><a href="#"><span><img src={navnine} alt="" /></span> Contact Us</a></li>  */}
                    </ul>
                  </div>
                </>
              ) : (
                false
              )}
            </div>
            <div className={styles.loginBtn}>
              {isAuthenticated ? (
                <Link to="/profile">Profile</Link>
              ) : (
                <Link to="/login">Signup / Login</Link>
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;

