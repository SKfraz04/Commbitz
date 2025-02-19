import uk from "../../assets/images/uk.png";
import france from "../../assets/images/france.png";
import india from "../../assets/images/india.png";
import america from "../../assets/images/america.png";
import autria from "../../assets/images/autria.png";
import bllogo from "../../assets/images/logo.webp";
import arrigt from "../../assets/images/arrigt.png";
import visa from "../../assets/images/visa.png";
import support from "../../assets/images/support.svg";
import andew from "../../assets/images/andew.png";
import spsent from "../../assets/images/spsent.svg";
import mic from "../../assets/images/mic.svg";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { sendAppLinkMail } from "../../utils/commonApi";
import { useEffect, useRef, useState } from "react";
import MainLoader from "../mainLoader";
import { getCountries } from "./api";
import { addOrder, getDocumentStatus } from "../../features/checkout/api";
import { getbundles } from "../../features/home/api";
import { GetGeoLocations } from "../../utils/GetGeoLocation";

interface FooterContainerProps {
  styles: any;
}
const FooterContainer: React.FC<FooterContainerProps> = ({ styles }) => {
  const [emailSendError, setEmailSendError] = useState("");
  const [emailSendSuccess, setEmailSendSuccess] = useState("");
  const [popularCountries, setPopularCountries] = useState<any>("");
  const [loader, setLoader] = useState(false);
  const formRef = useRef<any>(null);
  const [chatBoxOpen, setChatBoxOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const getRoot = window.location.origin;

  useEffect(() => {
    const getPopularContries = async () => {
      setPopularCountries((await getCountries())?.data?.countries);
    };
    getPopularContries();
  }, []);

  const handleSendMailSubmit = (event: any) => {
    event.preventDefault(); // Prevent the default form submission behavior
    setEmailSendError("");
    setEmailSendSuccess("");
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;

    if (!email) {
      setEmailSendError("Email is required!");
      return null;
    }
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      setEmailSendError("Invalid email!");
      return null;
    }
    sendAppLinkMail({ email })
      .then((res) => {
        if (res?.statusCode === 200) {
          setEmailSendSuccess("Email successfully sent!");
          formRef.current.reset();
        }
        setTimeout(() => {
          setEmailSendSuccess("");
        }, 5000);
      })
      .catch((error) => {
        setEmailSendSuccess("");
        setEmailSendError("Something went wrong!!");
        setTimeout(() => {
          setEmailSendError("");
        }, 5000);
      });
  };

  const createOrder = (countryName: string) => {
    setLoader(false);
    GetGeoLocations()
      .then((data: any) => {
        getDocumentStatus(data)
          .then((resGeo: any) => {
            const query: any = {
              search: countryName,
            };
            getbundles(query).then((res: any) => {
              const orderPayload: any = {
                bundleId: res?.data?.bundles[0]?._id,
                quantity: 1,
              };
              window.localStorage.setItem(
                "showDocuments",
                resGeo?.data?.showDocuments
              );
              addOrder(orderPayload)
                .then((Response) => {
                  navigate(
                    `/checkout/${Response?.data?.orderId}/?paymentGateway=${resGeo?.data?.paymentGatewayType}`
                  );
                  setLoader(false);
                })
                .catch((error) => {
                  console.log(error);
                  setLoader(false);
                });
            });
          })
          .catch((error) => {
            console.log(error);
            setLoader(false);
          });
      })
      .catch((error) => {
        console.log("Error getting location:", error);
        setLoader(false);
      });

    // Swal.fire("Please enable your location service!");
  };

  return (
    <>
      <div className="row">
        <div className="col-md-3">
          <div className={styles.footerInner}>
            <h6>About</h6>
            <div className={styles.ftLogo}>
              <Link to="/">
                <img src={bllogo} width="190" height="68" alt="" />
              </Link>
            </div>
            <p>
              <a style={{ color: "#fff" }} href={`Tel:+447452292014`}>
                +44 7452 292014
              </a>{" "}
              <br />
              <a style={{ color: "#fff" }} href={`mailto:hello@commbitz.com`}>
                hello@commbitz.com
              </a>
              <br />
              COMMBITZ for IoT & M2M
              <br />
              COMMBITZ for Business
              <br />
              COMMBITZ for Virtual Numbers
            </p>
          </div>
        </div>
        <div className="col-md-2">
          <div className={styles.footerInner}>
            <h6>Popular Countries</h6>
            <ul>
              {popularCountries &&
                popularCountries.map((country: any, index: any) => (
                  <li
                    key={index + 1}
                    onClick={() => createOrder(country?.name)}
                  >
                    <img src={country?.flagImageUrl} width="20" height="20" alt="" />
                    {country?.name}
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className="col-md-2">
          <div className={styles.footerInner}>
            <h6>More Info</h6>
            <ul className={styles.partner}>
              <li>
                <NavLink to="/contact">
                  <img src={arrigt} alt="" />
                  Contact
                </NavLink>
              </li>
              <li>
                <a className="nav-Link" href="https://commbitz.com/blog/">
                  <img src={arrigt} alt="" />
                  Blogs
                </a>
              </li>
              <li>
                <NavLink to="/faq">
                  <img src={arrigt} alt="" />
                  FAQ's
                </NavLink>
              </li>
              <li>
                <NavLink to="/troubleshoot">
                  <img src={arrigt} alt="" />
                  Troubleshoot
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-4">
          <div className={styles.footerInner}>
            <div className={styles.Newsletter}>
              <span>Complete Info, Just a Click Away!</span>
              <div className={styles.formGroup}>
                <form onSubmit={handleSendMailSubmit} ref={formRef}>
                  <input type="text" name="email" placeholder="Enter Your Email" />
                  <input type="submit" value="Subscribe" />
                </form>
                {emailSendError && (
                  <span className="error">{emailSendError}</span>
                )}
                {emailSendSuccess && <span>{emailSendSuccess}</span>}
              </div>
            </div>
          </div>
        </div>

        {/* {loader && <MainLoader />} */}
      </div>

      <div className={styles.chatSport}>
        {/* <span
          className={styles.chatSportbtn}
          onClick={() => setChatBoxOpen(!chatBoxOpen)}
        >
          <img src={support} alt="" /> Help Desk
        </span> */}
        {chatBoxOpen && (
          <div className={styles.chatBox}>
            <div className={styles.chatBoxHead}>
              <div className={styles.leftchatBox}>
                <img src={andew} alt="" />
                <div>
                  <h4>Johns </h4>
                  <span>Active Now</span>
                </div>
              </div>
              <div className={styles.rightchatBox}>
                <h6>Customer Support</h6>
              </div>
            </div>
            <div className={styles.chatBody}>
              <div className={styles.clietChat}>
                <h5>When can I install my eSIM?</h5>
              </div>
              <div className={styles.clietChat}>
                <h5>What devices Support eSIM ?</h5>
              </div>
              <div className={styles.clietChat}>
                <h5>How can I top up an eSIM?</h5>
              </div>
              <div className={styles.userChat}>
                <h5>Can I talk to someone please?</h5>
              </div>
              <div className={styles.clietChat}>
                <div className={styles.jusNow}>
                  <img src={andew} alt="" />
                  <h5>
                    Hi there! I’m Hannah.
                    <br />
                    How can I help you?
                  </h5>
                </div>
                <span className={styles.time}>Hannah・Just now</span>
              </div>
            </div>

            <div className={styles.chatFotetr}>
              <div className={styles.formGroup}>
                <input type="text" placeholder="Type a reply..." />
              </div>
              <div className={styles.media}>
                <span>
                  <img src={mic} alt="" />
                </span>
                <span>
                  <img src={spsent} alt="" />
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FooterContainer;
