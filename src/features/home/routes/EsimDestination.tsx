import { useEffect, useState } from "react";
import Slider from "react-slick";
import SearchBar from "../../../components/searchbar";
import styles from "../styles/home.module.css";
import { BarIcon, ESIMMap, LocationIcon } from "../../../assets/images";
import { BundleCard } from "../../../components";
import { BUNDLE_TYPE } from "../../../utils/constants";
import { Bundle } from "../../esim/interface";
import MainLoader from "../../../components/mainLoader";
import {
  bundleSearch,
  getCoupons,
  getCountries,
  getRegions,
  getbundles,
} from "../api";
import { useSelector } from "react-redux";
import WelcomeBanner from "../../../components/modals/WelcomeBanner";
import users from "../../../assets/images/users.png";
import moment from "moment";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MapComponent from "./MapComponent";
import { getCountryCenterCoordinates } from "../../../utils/getGeoCountryName";
import GeoChart from "./geoChart";
import france from "../../../assets/images/france.png";
import taj from "../../../assets/images/taj.png";
import srchic from "../../../assets/images/srchic.svg";
import india from "../../../assets/images/india.png";
import Pagination from "../../../components/pagination";
import { GetGeoLocations } from "../../../utils/GetGeoLocation";
import helpmob from "../../../assets/images/helpmob.svg";
import { toast } from "react-toastify";
import { getCompatibleDevice } from "../../packageOption/api";
import { addOrder, getDocumentStatus } from "../../checkout/api";
import Swal from "sweetalert2";

interface Coordinates {
  latitude: number;
  longitude: number;
  name: string;
}

const EsimDestination: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const eSimPage = location.pathname.split("/").includes("esim-list");
  const [activeTab, setActiveTab] = useState<number>(
    eSimPage ? BUNDLE_TYPE.LOCAL : BUNDLE_TYPE.POPULAR
  );

  const [bundles, setBundles] = useState<Bundle[]>([]);
  const [getDatas, setGetDatas] = useState<any>();
  const [getMobDatas, setGetMobDatas] = useState<any>();
  const [loader, setLoader] = useState<boolean>(true);
  const currency = useSelector((state: any) => state?.getCurrency?.currency);
  const [welcomeModalShow, setWelcomeModalShow] = useState(false);
  const [country, setCountry] = useState<string>("India");
  const loadmore: boolean = true;
  const [searchVal, setSearchVal] = useState<any>({
    search: "",
    submit: false,
  });
  const [countriesData, setCountriesData] = useState<any>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [geoLocationData, setGeoLocationData] = useState<any>({
    latitude: 0,
    longitude: 0,
  });
  const [geoLocationErr, setGeoLocationErr] = useState<boolean>(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showSomeDropdown, setShowSomeDropdown] = useState<any>({
    installation: false,
    deviceCompatibility: false,
  });
  const [deviceName, setDeviceName] = useState("");

  const [getLoader, setGetLoader] = useState<boolean>(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    if (isMobile) setActiveTab(1);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  const showWelcomeModalShow = (val: any) => {
    setWelcomeModalShow(val);
  };

  const pageRecords = eSimPage ? 24 : 12;

  useEffect(() => {
    let currentTime: any = new Date();

    const hasPopupBeenShown = localStorage.getItem("showWelcomeModal");

    if (!hasPopupBeenShown || currentTime.getTime() > hasPopupBeenShown) {
      currentTime.setHours(currentTime.getHours() + 12);

      localStorage.setItem("showWelcomeModal", currentTime.getTime());

      showWelcomeModalShow("show");
    }
  }, []);

  useEffect(() => {
    setLoader(true);
    if (activeTab === BUNDLE_TYPE.POPULAR) {
      GetGeoLocations()
        .then((data: any) => {
          setGeoLocationErr(false);
          setGeoLocationData(data);

          const query: any = {
            page: currentPage,
            limit: pageRecords,
          };

          if (data.latitude || data.longitude) {
            query.lat = data?.latitude;
            query.long = data?.longitude;
          }

          if (searchVal.search) query.searchString = searchVal?.search;

          getCountries(query)
            .then((res: any) => {
              setLoader(false);
              if (currentPage === 1) {
                setGetDatas(res?.data);
              } else {
                setGetDatas((pre: any) => ({
                  ...pre,
                  countries: [...pre.countries, ...res?.data?.countries],
                }));
              }
            })
            .catch((error) => {
              console.log(error);
              setLoader(false);
            });
        })
        .catch((error) => {
          const query: any = {
            page: currentPage,
            limit: pageRecords,
            isPopular: true,
          };
          if (searchVal.search) query.searchString = searchVal?.search;

          getCountries(query)
            .then((res: any) => {
              setLoader(false);
              if (currentPage === 1) {
                setGetDatas(res?.data);
              } else {
                setGetDatas((pre: any) => ({
                  ...pre,
                  countries: [...pre.countries, ...res?.data?.countries],
                }));
              }
            })
            .catch((error) => {
              console.log(error);
              setLoader(false);
            });
          // setGeoLocationErr(true);
          // setGetDatas([]);
          // console.log("Error getting location:", error);
          // setLoader(false);
        });
    } else if (activeTab === BUNDLE_TYPE.LOCAL) {
      const query: any = {
        page: currentPage,
        limit: pageRecords,
      };

      if (searchVal.search) query.searchString = searchVal?.search;

      getCountries(query)
        .then((res: any) => {
          setLoader(false);
          if (currentPage === 1) {
            setGetDatas(res?.data);
          } else {
            setGetDatas((pre: any) => ({
              ...pre,
              countries: [...pre.countries, ...res?.data?.countries],
            }));
          }
        })
        .catch((error) => {
          console.log(error);
          setLoader(false);
        });
    } else if (activeTab === BUNDLE_TYPE.MULTIVERSE) {
      const query: any = {
        page: currentPage,
        limit: pageRecords,
      };
      if (searchVal.search) query.search = searchVal?.search;
      getRegions(query)
        .then((res: any) => {
          setLoader(false);
          setGetDatas(res?.data);
        })
        .catch((error) => {
          console.log(error);
          setLoader(false);
        });
    }
  }, [activeTab, currency, currentPage, searchVal.submit]);

  const handleSearchSubmit = () => {
    setGeoLocationData({ latitude: 0, longitude: 0 });
    setCurrentPage(1);
    setSearchVal({
      ...searchVal,
      submit: !searchVal.submit,
    });
    setCountriesData("");
  };

  const handleSearchCountries = async (e: any) => {
    setLoader(true);
    const searchValue = e.target.value;
    setSearchVal((prevState: any) => ({
      submit: isMobile ? !searchVal.submit : false,
      search: searchValue,
    }));

    if (e.target.value?.length <= 2) return setCountriesData([]);

    if (!searchValue) return setCountriesData([]);

    if (searchValue.trim() && !isMobile) {
      // const [countriesResponse, regionsResponse]: any = await Promise.all([
      //   getCountries({ searchString: searchValue.trim() }),
      //   getRegions({ search: searchValue.trim() }),
      // ]);
      // setCountriesData([
      //   ...countriesResponse?.data?.countries,
      //   ...regionsResponse?.data?.regions,
      // ]);

      getCountries({ searchString: searchValue.trim() })
        .then((res: any) => {
          setCountriesData(res?.data?.countries);
          setLoader(false);
        })
        .catch((error) => {
          console.log(error, "search");
          setLoader(false);
        });
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handelCompatibleDevice = () => {
    if (!deviceName) return toast.error("Please enter device name");
    getCompatibleDevice({ deviceName })
      .then((res) => {
        res?.statusCode === 200
          ? toast.success(res?.data?.deviceMessage)
          : toast.error("Something went wrong!!!");
      })
      .catch((error) => {
        setLoader(false);
        toast.error("Something went wrong!!!");
      });
  };

  const createOrder = (countryName: string) => {
    setGetLoader(true);
    getDocumentStatus(geoLocationData)
      .then((resGeo: any) => {
        const query: any = {
          search: countryName,
        };
        getbundles(query).then((res: any) => {
          const orderPayload: any = {
            bundleId: res?.data?.bundles[0]?._id,
            quantity: 1,
          };

          if(geoLocationData?.latitude && geoLocationData?.longitude) {
            orderPayload.lat = geoLocationData?.latitude;
            orderPayload.long = geoLocationData?.longitude
          }

          window.localStorage.setItem(
            "showDocuments",
            resGeo?.data?.showDocuments
          );
          addOrder(orderPayload)
            .then((Response) => {
              navigate(
                `/checkout/${Response?.data?.orderId}/?paymentGateway=${resGeo?.data?.paymentGatewayType}`
              );
              setGetLoader(false);
            })
            .catch((error) => {
              console.log(error);
              setGetLoader(false);
            });
        });
      })
      .catch((error) => {
        console.log(error);
        setGetLoader(false);
        return Swal.fire("Please enable your location service!");
      });
  };

  return (
    <>
      <section className={styles.esimDestination}>
        {getLoader && <MainLoader />}
        <div className="mobBk">
          <div className="container ipdad-cutm">
            <h6>Connect Anywhere, Anytime – Your eSIM, Your Way</h6>
            <h3>International eSIM Destinations</h3>
            <div className={styles.SearchBoxOuter}>
              <div className={styles.SimpleSearch}>
                <span>
                  <img width="20" height="20" src={srchic} alt="" />
                </span>
                <input
                  type="text"
                  placeholder="Search Destination"
                  onChange={handleSearchCountries}
                  value={searchVal?.search}
                />
                <button onClick={handleSearchSubmit}>Search</button>
              </div>
            </div>

            {searchVal?.search &&
              countriesData &&
              (countriesData?.length > 0 ? (
                <ul className={styles.ContrySearch}>
                  {countriesData?.map((country: any, index: number) => (
                    <li
                      key={index}
                      onClick={() => {
                        // setSearchVal({
                        //   ...searchVal,
                        //   search: country?.name,
                        // });
                        // setCountriesData("");
                        createOrder(country?.name);
                      }}
                    >
                      <img
                        src={country?.flagImageUrl}
                        alt={country?.name}
                        style={{ width: "30px" }}
                      />
                      {country?.name}
                    </li>
                  ))}
                </ul>
              ) : (
                searchVal?.search?.length > 2 && (
                  <ul className={styles.ContrySearch}>
                    <li>{loader ? "Loading..." : "Country not found"}</li>
                  </ul>
                )
              ))}
          </div>
        </div>
        {!eSimPage && (
          <div className={styles.esimBlogs}>
            <ul>
              <li
                onClick={() => {
                  if (activeTab !== BUNDLE_TYPE.POPULAR) {
                    setActiveTab(BUNDLE_TYPE.POPULAR);
                    setLoader(false);
                    setSearchVal({
                      search: "",
                      submit: false,
                    });
                    setCurrentPage(1);
                  }
                }}
                className={
                  activeTab === BUNDLE_TYPE.POPULAR ? styles.active : ""
                }
              >
                <span>Popular Plans </span>
              </li>
              <li
                onClick={() => {
                  if (activeTab !== BUNDLE_TYPE.LOCAL) {
                    setActiveTab(BUNDLE_TYPE.LOCAL);
                    setLoader(false);
                    setSearchVal({
                      search: "",
                      submit: false,
                    });
                    setCurrentPage(1);
                  }
                }}
                className={activeTab === BUNDLE_TYPE.LOCAL ? styles.active : ""}
              >
                <span>Local eSIMs</span>
              </li>
              <li
                onClick={() => {
                  if (activeTab !== BUNDLE_TYPE.MULTIVERSE) {
                    setActiveTab(BUNDLE_TYPE.MULTIVERSE);
                    setLoader(false);
                    setSearchVal({
                      search: "",
                      submit: false,
                    });
                    setCurrentPage(1);
                  }
                }}
                className={
                  activeTab === BUNDLE_TYPE.MULTIVERSE ? styles.active : ""
                }
              >
                <span>Regions</span>
              </li>
            </ul>
          </div>
        )}

        <div className="container ipdad-cutm mobile-sims">
          <div className={styles.esimPack}>
            {(activeTab === BUNDLE_TYPE.POPULAR ||
              activeTab === BUNDLE_TYPE.LOCAL) && (
              <>
                <div className="mobHeadings">
                  <h5>
                    Popular Countries
                    {/* <a href="#">View All</a> */}
                  </h5>
                </div>
                <div className="row">
                  {getDatas?.countries?.length > 0 ? (
                    getDatas?.countries?.map((item: any, index: number) => (
                      <div
                        className="col-md-2"
                        key={index}
                        onClick={
                          () => createOrder(item?.name)
                          // navigate(`/esim/${item?.name}`)
                        }
                      >
                        <div className={styles.franceBox}>
                          {item?.flagImageUrl && (
                            <img
                              className={styles.flagfrnce}
                              width="40"
                              height="40"
                              src={item?.flagImageUrl}
                              alt=""
                            />
                          )}
                          <h4>{item?.name}</h4>
                          {item?.historicImageUrl && (
                            <img
                              className={styles.taj}
                              width="105"
                              height="104"
                              src={item?.historicImageUrl}
                              alt=""
                            />
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-md-12" style={{ color: "#fff" }}>
                      <h4 style={{ textAlign: "center" }}>
                        {
                          loader ? "Loading..." : "Country is not found!!"
                          // geoLocationErr
                          // ? "Please allow your Location.!!"
                          // : "Country is not found!!"
                        }
                      </h4>
                    </div>
                  )}
                  <Pagination
                    count={getDatas?.count} // You can replace this with the actual count received from the API
                    handlePageChange={handlePageChange}
                    currentPage={currentPage}
                    itemsPerPage={pageRecords}
                    loadMore={loadmore}
                  />
                </div>
              </>
            )}
            {activeTab === BUNDLE_TYPE.MULTIVERSE && getDatas && (
              <>
                <div className="mobHeadings">
                  <h5>
                    Popular Regions
                    {/* <a href="#">View All</a> */}
                  </h5>
                </div>
                <div className="row">
                  {getDatas?.regions?.length > 0 ? (
                    getDatas?.regions?.map((item: any, index: number) => (
                      <div
                        className="col-md-2"
                        key={index}
                        onClick={
                          () => createOrder(item?.name)
                          //  navigate(`/esim/${item?.name}`)
                        }
                      >
                        <div className={styles.franceBoxcount}>
                          {/* <img className={styles.flagfrnce} src={france} alt="" /> */}
                          <h4>{item?.name}</h4>
                          <img
                            className={styles.taj}
                            width="90"
                            height="90"
                            src={item?.flagImageUrl}
                            alt={item?.name}
                            style={{ width: "150px" }}
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-md-12" style={{ color: "#fff" }}>
                      <h4 style={{ textAlign: "center" }}>
                        {loader ? "Loading..." : "Region is not found!!!"}
                      </h4>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          {isMobile ? (
            <>
              <div className="mobilePurchase">
                <div className="leftMobPur">
                  <h5>Install your purchased eSIM</h5>
                </div>
                <div className="rightmobpur">
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      setShowSomeDropdown({
                        installation: !showSomeDropdown?.installation,
                        deviceCompatibility:
                          showSomeDropdown?.deviceCompatibility &&
                          !showSomeDropdown?.deviceCompatibility,
                      });
                    }}
                  >
                    Install Guidelines{" "}
                    <i className="fas fa-angle-double-right"></i>
                  </a>
                  {showSomeDropdown?.installation && (
                    <ul>
                      <li>
                        <a
                          href="https://www.youtube.com/shorts/voW6qD5mQKE"
                          target="_blank"
                        >
                          <i className="fab fa-youtube"></i> Guidelines for
                          Andriod{" "}
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.youtube.com/shorts/yJk3lSCnF2Y"
                          target="_blank"
                        >
                          <i className="fab fa-youtube"></i> Guidelines for IOS{" "}
                        </a>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
              <div className="helpdeskMoob">
                <div className="leftdeskmob">
                  <h5>Go-To Help Desk</h5>
                  <h6>for eSIM installation guide</h6>
                  <Link to="/contact">Get Help</Link>
                </div>
                <div className="rightdeskmob">
                  <img src={helpmob} alt="" />
                </div>
              </div>
              <div className="deviceSuport">
                <h5>Check Device Compatibility</h5>
                <h6>Ensure Your Device is Ready for eSIM Activation</h6>
                <div className="formGroup">
                  <input
                    type="text"
                    placeholder="Enter your Phone Model"
                    onChange={(e) => {
                      setDeviceName(e.target.value);
                    }}
                    style={{ color: "#fff" }}
                    value={deviceName}
                  />
                  <button onClick={handelCompatibleDevice}>Apply</button>
                </div>
              </div>
            </>
          ) : (
            false
          )}
          {isMobile
            ? getMobDatas && (
                <div className="mobileSims">
                  <h4>Popular Plan in you Region</h4>
                  <div className={styles.esimPackMob}>
                    <div className="row">
                      {/* <SearchBar searchClass={styles.topSearch} placeHolder={"Search Country, Regions, eSIM"} handleSearchSubmit={handleSearchSubmit} viewAllBundle={viewAllBundle} /> */}
                      {getMobDatas?.bundles?.length > 0 ? (
                        getMobDatas?.bundles.map(
                          (bundle: any, index: number) => (
                            <div className="col-md-3" key={index}>
                              <div className={styles.esimpackLeft}>
                                <div className={styles.PackList}>
                                  <div className="homepckCard">
                                    <BundleCard bundle={bundle} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        )
                      ) : (
                        <span className="text-center" style={{ color: "#fff" }}>
                          eSim Plan is not found
                        </span>
                      )}
                      <Pagination
                        count={getMobDatas?.count} // You can replace this with the actual count received from the API
                        handlePageChange={handlePageChange}
                        currentPage={currentPage}
                        itemsPerPage={pageRecords}
                        loadMore={loadmore}
                        loader={loader}
                      />
                    </div>
                  </div>
                </div>
              )
            : false}
        </div>

        {/* {welcomeModalShow && (
          <WelcomeBanner
            show={welcomeModalShow}
            handleCloseModal={showWelcomeModalShow}
          />
        )} */}
      </section>
    </>
  );
};

export default EsimDestination;
