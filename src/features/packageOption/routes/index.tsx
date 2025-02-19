import React, { useEffect, useState } from "react";

import Layout from "../../../components/layout";

import Breadcrumb from "../../../components/breadcrumbs";
import chip from "../../../assets/images/chip.svg";
import arui from "../../../assets/images/arui.png";
import flag from "../../../assets/images/france.png";
import styles from "../styles/style.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { getBundleDetails, getbundles } from "../../home/api";
import { DATAAMOUNT, PLANDAYS } from "../../../utils/constants";
import { GetGeoLocations } from "../../../utils/GetGeoLocation";
import { addOrder, getDocumentStatus } from "../../checkout/api";
import MainLoader from "../../../components/mainLoader";
import Swal from "sweetalert2";
import { getBundleFilterData } from "../../esim/api";
import { getCompatibleDevice } from "../api";
import { toast } from "react-toastify";

function PackageOption() {
  const { bundleId, countryName } = useParams();
  const navigate = useNavigate();
  const [bundleDetails, setBundleDetails] = useState<any>({});
  const [bundleQty, setBundleQty] = useState<number>(1);

  const [bundleAmount, setBundleAmount] = useState<number>(0);
  const [bundlePlans, setBundlePlans] = useState<number>(0);
  const [loader, setLoader] = useState(false);
  const [iosDevice, setIosDevice] = useState(false);
  const [androidDevice, setAndroidDevice] = useState(false);
  const [esimFilterData, setEsimFilterData] = useState<any>();
  const [deviceDropDown, setDeviceDropDown] = useState<boolean>(false);
  const [deviceName, setDeviceName] = useState("");
  const [esimBundleId, setEsimBundleId] = useState("");
  const [deviceNameMsg, setDeviceNameMsg] = useState({
    error: "",
    success: "",
  });

  const createOrder = () => {
    setLoader(true);
    GetGeoLocations()
      .then(async (data: any) => {
        // {latitude: 37.98597720335289, longitude :-103.31725006494221} for usa
        getDocumentStatus(data)
          .then((res: any) => {
            setLoader(false);
            if (res?.data?.showDocuments) {
              // navigate(`/document/${bundle?._id}/?paymentGateway=${res?.data?.paymentGatewayType}`)
              const basePath = `/document/${esimBundleId}`;
              // const url = topup
              //     ? `${basePath}?topup=${btoa(topup !== undefined && topup !== null ? topup : '')}&coupon=${btoa(coupon !== undefined && coupon !== null ? coupon : '')}`
              //     : coupon ? `${basePath}?coupon=${btoa(coupon !== undefined && coupon !== null ? coupon : '')}` : basePath;
              navigate(
                `${basePath}/?paymentGateway=${res?.data?.paymentGatewayType}`
              );
            } else {
              let orderPayload: any = {
                bundleId: esimBundleId,
                quantity: bundleQty,
                // couponId: coupon,
              };
              // if (topup) orderPayload.iccid = topup

              addOrder(orderPayload)
                .then((Response) => {
                  navigate(
                    `/checkout/${Response?.data?.orderId}/?paymentGateway=${res?.data?.paymentGatewayType}`
                  );
                  // navigate(`/checkout/${Response?.data?.orderId}`);
                })
                .catch((error) => {
                  console.log(error);
                  setLoader(false);
                });
            }
          })
          .catch((error) => {
            console.log(error);
            setLoader(false);
          });
      })
      .catch((error) => {
        console.log("Error getting location:", error);
        setLoader(false);
        Swal.fire("Please enable your location service!");
      });
  };

  useEffect(() => {
    if (bundleId) {
      setEsimBundleId(bundleId);
      getBundleDetails(bundleId)
        .then((res: any) => {
          setBundleAmount(res?.data?.dataAmount);
          setBundlePlans(res?.data?.duration);
          setBundleDetails(res?.data);
        })
        .catch((error) => {
          console.log(error, "getBundleDetails");
          setLoader(false)
        });
    } else {
      const query: any = {
        search: countryName,
      };
      getbundles(query).then((res: any) => {
        navigate(`/esim/${countryName}`);
        setEsimBundleId(res?.data?.bundles[0]?._id);
        setBundleAmount(res?.data?.bundles[0]?.dataAmount);
        setBundlePlans(res?.data?.bundles[0]?.duration);
        setBundleDetails(res?.data?.bundles[0]);
      });
    }

    getBundleFilterData({ search: countryName })
      .then((res: any) => {
        setEsimFilterData(res?.data[0]);
      })
      .catch((error) => {
        setLoader(false)
        toast.error(error?.data?.message || "Something went wrong!");
      });
    window.scrollTo(100, 100);
  }, [countryName]);

  const handleBundleDetails = (params: any) => {
    setBundleAmount(params?.dataAmount);
    setBundlePlans(params?.duration);
    const query: any = {
      dataAmount: params?.dataAmount,
      duration: params?.duration,
      search: countryName,
    };
    getbundles(query).then((res: any) => {
      navigate(`/esim/${countryName}`);
      setEsimBundleId(res?.data?.bundles[0]?._id);
      setBundleDetails(res?.data?.bundles[0]);
    });
  };
  const handelCompatibleDevice = () => {
    if (!deviceName)
      return setDeviceNameMsg({
        error: "Please enter device name.",
        success: "",
      });
    getCompatibleDevice({ deviceName })
      .then((res) => {
        res?.statusCode === 200
          ? setDeviceNameMsg({ error: "", success: res?.data?.deviceMessage })
          : setDeviceNameMsg({ error: "Something went wrong!!!", success: "" });
      })
      .catch((error) => {
        setLoader(false)
        setDeviceNameMsg({ error: "Something went wrong!!!", success: "" });
      });
  };

  return (
    <Layout>
      <Breadcrumb />
      <div className={styles.PackageOption}>
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className={styles.LeftPackage}>
                <div className={styles.PacageOptioOuter}>
                  <div className={styles.SelectSim}>
                    <h6>SIM card validity</h6>
                    <ul>
                      {esimFilterData &&
                        esimFilterData?.validityDays?.map(
                          (item: number, index: number) => (
                            <li
                              className={
                                item === bundlePlans ? styles.active : ""
                              }
                              onClick={() =>
                                handleBundleDetails({
                                  duration: item,
                                  dataAmount: bundleAmount,
                                })
                              }
                            >
                              <span>
                                {item > 1 ? item + ` Days` : item + ` Day`}
                              </span>
                            </li>
                          )
                        )}
                    </ul>
                  </div>
                  <div className={styles.SelectSim}>
                    <h6>Data package</h6>
                    <ul>
                      {esimFilterData &&
                        esimFilterData?.dataAmount?.map(
                          (item: number, index: number) => (
                            <li
                              className={
                                item === bundleAmount ? styles.active : ""
                              }
                              onClick={() =>
                                handleBundleDetails({
                                  dataAmount: item,
                                  duration: bundlePlans,
                                })
                              }
                            >
                              <span>
                                {item === -1
                                  ? ` Unlimited`
                                  : item / 1000 + ` GB`}
                              </span>
                            </li>
                          )
                        )}
                    </ul>
                  </div>
                  <div className={styles.Quantity}>
                    <h6>Quantity</h6>
                    {bundleDetails ? (
                      <div className={styles.quaOuter}>
                        <label>
                          <img src={chip} alt="" />
                          {bundleDetails?.name}
                        </label>
                        <div className={styles.count}>
                          <h5>
                            {/* <span>$99 </span>  */}
                            {bundleDetails?.priceSymbol}{" "}
                            {(bundleDetails?.price * bundleQty).toFixed(2)}
                          </h5>
                          <div className={styles.inputCount}>
                            <span
                              onClick={() =>
                                bundleQty > 1 ? setBundleQty(bundleQty - 1) : 1
                              }
                            >
                              -
                            </span>
                            <input
                              type="text"
                              placeholder="0"
                              value={bundleQty}
                            />
                            <span onClick={() => setBundleQty(bundleQty + 1)}>
                              +
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center" style={{ color: "#fff" }}>
                        Sorry, we couldn't find any plans matching your selection.
                      </div>
                    )}
                  </div>
                </div>
                <div className={styles.coverCountryOuter}>
                  <h4>
                    Coverage Countries (
                    {esimFilterData?.coverageCountries?.length})
                  </h4>
                  <div className={styles.coverageCountry}>
                    <ul>
                      {esimFilterData &&
                        esimFilterData?.coverageCountries?.map(
                          (item: any, index: number) => (
                            <li>
                              <span>
                                <img src={item?.flagImageUrl} alt="" />
                                {item?.name}
                              </span>
                            </li>
                          )
                        )}
                    </ul>
                  </div>
                </div>

                <div className={styles.EnterDevice}>
                  <p>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      onClick={(e: any) => {
                        setDeviceDropDown(e.target.checked);
                      }}

                      id="flexCheckDefault"
                    />{" "}
                    {/* Before completing this order please  */}
                    Your device is
                    eSIM compatible and network - unlocked.{" "}
                    <span data-bs-toggle="modal" data-bs-target="#supportModal">
                      {" "}
                      Learn More
                    </span>
                  </p>
                  {deviceDropDown && (
                    <>
                      <div className={styles.FromGroup}>
                        <input
                          type="text"
                          placeholder="Kindly provide the device name to continue"
                          onChange={(e) => {
                            setDeviceName(e.target.value);
                          }}
                          value={deviceName}
                          style={{ color: "#fff" }}
                        />
                        <button onClick={handelCompatibleDevice}>Apply</button>
                      </div>
                      {(deviceNameMsg?.error || deviceNameMsg?.success) && (
                        <div
                          style={{
                            color: deviceNameMsg?.error ? "red" : "green",
                          }}
                        >
                          {deviceNameMsg?.error || deviceNameMsg?.success}
                        </div>
                      )}
                    </>
                  )}
                </div>
                {/* <div className={styles.EnterDevice}>
                  <p>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      onClick={(e: any) => {
                        setAirlineDropDown(e.target.checked);
                      }}
                      id="flexCheckDefault"
                    />{" "}
                    <b>Airline Membership</b>
                  </p>
                  {airlineDropDown && (
                    <div className={styles.AirlineMember}>
                      <div className="row">
                        <div className="col-md-6">
                          <div className={styles.leftAir}>
                            <label>Frequent Flyer Airline</label>
                            <div className={styles.selectCus}>
                              <span>Frequent Flyer Airline</span>
                              <ul>
                                <li className={styles.active}>
                                  Amirates Airline
                                </li>
                                <li>Air Mauritius Airline</li>
                                <li>Air Mauritius Airline </li>
                                <li>Air India Airline</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className={styles.leftAir}>
                            <label>Number</label>
                            <input type="number" placeholder="Enter Number" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className={styles.offerWeProvide}>
                  <h4>Offers for you</h4>
                  <div className={styles.oferOuter}>
                    <div className={styles.offerHead}>
                      <span> Lowest Price Guarantee</span>
                      <a href="#">Apply</a>
                    </div>
                    <h5>Get 0% Free Credit On This Activity</h5>
                    <p>
                      You'll definitely receive the best price for this
                      activity. Find it cheaper elsewhere? Tell us and     we'll
                      match the difference (terms and conditions apply).
                    </p>
                    <h6>Expires Dec 01, 2020</h6>
                  </div>

                  <div className={styles.oferOuter}>
                    <div className={styles.offerHead}>
                      <span> Commbitz Rewards</span>
                      <a href="#">Apply</a>
                    </div>
                    <h5>Get 1 GB data free on your first eSIM.</h5>
                    <p>
                      You'll definitely receive the best price for this
                      activity. Find it cheaper elsewhere? Tell us and     we'll
                      match the difference (terms and conditions apply).
                    </p>
                    <h6>Expires Dec 01, 2020</h6>
                  </div>
                </div> */}

                <div className={styles.simSupport}>
                  <h3>What devices support eSIM ?</h3>
                  <h4>Find an up-to-date list of eSIM compatible phones</h4>
                  <div className={styles.acrodPage}>
                    <div className={styles.accordionItem}>
                      <button
                        className={styles.openCol}
                        onClick={() => {
                          setAndroidDevice(false);
                          setIosDevice(!iosDevice);
                        }}
                      >
                        iOS devices that support eSIM ?{" "}
                        <i className="fas fa-chevron-down"></i>
                      </button>
                      {iosDevice && (
                        <div className={styles.accordionBoody}>
                          <ul>
                            <li>
                              iPhone 15 / Pro / Pro Max (USA version is eSIM
                              only)
                            </li>
                            <li>
                              iPhone 14 / Pro / Pro Max (USA version is eSIM
                              only)
                            </li>
                            <li>iPhone 13 / Pro / Pro Max / Mini</li>
                            <li>iPhone 12 / Pro / Pro Max / Mini</li>
                            <li>iPhone 11 / Pro / Pro Max</li>
                            <li>iPhone XS / XS Max</li>
                            <li>iPhone XR</li>
                            <li>iPhone SE (2020 / 2022)</li>
                            <li>iPad Air (3rd & 4th Generation)</li>
                            <li>
                              iPad Pro 11‑inch (1st / 2nd/ 3rd generation)
                            </li>
                            <li>
                              iPad Pro 12.9‑inch (3rd / 4th / 5th / 6th
                              generation)
                            </li>
                            <li>iPad (7th / 8th / 9th generation)</li>
                            <li>iPad Mini (5th / 6th generation)</li>
                          </ul>
                        </div>
                      )}
                    </div>
                    <div className={styles.accordionItem}>
                      <button
                        className={styles.openCol}
                        onClick={() => {
                          setIosDevice(false);
                          setAndroidDevice(!androidDevice);
                        }}
                      >
                        Android devices with eSIM support ?{" "}
                        <i className="fas fa-chevron-down"></i>
                      </button>
                      {androidDevice && (
                        <div className={styles.accordionBoody}>
                          <h5>Samsung</h5>
                          <ul>
                            <li>
                              iPhone 15 / Pro / Pro Max (USA version is eSIM
                              only)
                            </li>
                            <li>
                              iPhone 14 / Pro / Pro Max (USA version is eSIM
                              only)
                            </li>
                            <li>iPhone 13 / Pro / Pro Max / Mini</li>
                            <li>iPhone 12 / Pro / Pro Max / Mini</li>
                            <li>iPhone 11 / Pro / Pro Max</li>
                          </ul>
                          <h5>Motorola</h5>
                          <ul>
                            <li>
                              iPhone 15 / Pro / Pro Max (USA version is eSIM
                              only)
                            </li>
                            <li>
                              iPhone 14 / Pro / Pro Max (USA version is eSIM
                              only)
                            </li>
                            <li>iPhone 13 / Pro / Pro Max / Mini</li>
                            <li>iPhone 12 / Pro / Pro Max / Mini</li>
                            <li>iPhone 11 / Pro / Pro Max</li>
                          </ul>
                          <h5>Huawei</h5>
                          <ul>
                            <li>
                              iPhone 15 / Pro / Pro Max (USA version is eSIM
                              only)
                            </li>
                            <li>
                              iPhone 14 / Pro / Pro Max (USA version is eSIM
                              only)
                            </li>
                            <li>iPhone 13 / Pro / Pro Max / Mini</li>
                            <li>iPhone 12 / Pro / Pro Max / Mini</li>
                            <li>iPhone 11 / Pro / Pro Max</li>
                          </ul>
                          <h5>OnePlus</h5>
                          <ul>
                            <li>
                              iPhone 15 / Pro / Pro Max (USA version is eSIM
                              only)
                            </li>
                            <li>
                              iPhone 14 / Pro / Pro Max (USA version is eSIM
                              only)
                            </li>
                            <li>iPhone 13 / Pro / Pro Max / Mini</li>
                            <li>iPhone 12 / Pro / Pro Max / Mini</li>
                            <li>iPhone 11 / Pro / Pro Max</li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className={styles.RightPackage}>
                {bundleDetails && (
                  <div className={styles.packageDetails}>
                    <h4>Package details</h4>
                    <ul>
                      <li>
                        eSIM{" "}
                        <span>
                          {bundleDetails?.priceSymbol}{" "}
                          {(bundleDetails?.price * bundleQty).toFixed(2)}
                        </span>
                      </li>
                      <li>{/* Tax <span>$9</span> */}</li>
                      <li>
                        Total{" "}
                        <span>
                          {bundleDetails?.priceSymbol}{" "}
                          {(bundleDetails?.price * bundleQty).toFixed(2)}
                        </span>
                      </li>
                    </ul>
                    {/* <div className={styles.applyPromo}>
                      <h5>Apply Promo Code</h5>
                      <div className={styles.formGroup}>
                        <input type="text" placeholder="Enter Promo Code" />
                        <button>Apply</button>
                      </div>
                      <p>
                        You can apply your discount / referral code or use
                        airmoney with your purchase
                      </p>
                    </div> */}
                    <button className={styles.aplyBtn} onClick={createOrder}>
                      Buy NOW
                    </button>
                  </div>
                )}

                <div className={styles.packageDetailsPoint}>
                  <h4>
                    Package Details{" "}
                    {/* <span>
                      <img src={arui} alt="" />
                    </span> */}
                  </h4>
                  <ul>
                    <li>
                      <span>Free cancellation before redemption</span>
                    </li>
                    <li>
                      <span>Instant Configuration</span>
                    </li>
                    <li>
                      <span>Valid 180 Days</span>
                    </li>
                  </ul>
                  <div className={styles.usageOncept}>
                    <div className={styles.usagedetailOuter}>
                      <div className={styles.usagebox}>
                        Usage validity
                        {/* <i className="fas fa-chevron-down"></i> */}
                      </div>
                      <div className={styles.usageBody}>
                        <p>
                          The voucher is valid for 180 day(s) from the booking
                          confirmation date. It expires at the same booking
                          confirmation time on the last day. (I.e. If the
                          booking confirmation time is at 13:00, it will expire
                          at 13:00 180 day(s) later).
                        </p>
                      </div>
                    </div>

                    <div className={styles.usagedetailOuter}>
                      <div className={styles.usagebox}>
                        Additional information{" "}
                        {/* <i className="fas fa-chevron-down"></i> */}
                      </div>
                      <div className={styles.usageBody}>
                        <p>
                          The voucher is valid for 180 day(s) from the booking
                          confirmation date. It expires at the same booking
                          confirmation time on the last day. (I.e. If the
                          booking confirmation time is at 13:00, it will expire
                          at 13:00 180 day(s) later).
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="supportModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header p-0 border-0">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body p-0">
              <div className={styles.suportHead}>
                <h4>Device Campatibility</h4>
              </div>
              <div className={styles.supportDesc}>
                <h5>What device suppoprt eSIM?</h5>
                <p>Tu Sue as commbitz, a device must meet the following:</p>
                <ul>
                  <li>The device supports eSIMs.</li>
                  <li> The device is not carrier or network-Locked.</li>
                  <li>
                    The device is not jailbroken (IOS) or rooted (Android).
                  </li>
                </ul>
                <p>
                  You can use our list to see it the device you want to use is
                  eSIM. Compatible. Note, same regional model may not support
                  eSIMs.
                </p>
                <a href="#">READ AND ACCEPT</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default PackageOption;
