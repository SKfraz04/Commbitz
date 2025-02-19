import { useEffect, useState } from "react";
import styles from "../styles/style.module.css";
import { getBundles, getBundleFilterData } from "../api";
import { BUNDLE_TYPE, DATAAMOUNT, PLANDAYS } from "../../../utils/constants";
import { FilterIcon } from "../../../assets/images";
import MainLoder from "../../../components/mainLoader";
import search from "../../../assets/images/search.png";
import chip from "../../../assets/images/chip.svg";
import {
  Breadcrumb,
  Layout,
  BundleCard,
  PartnerSection,
} from "../../../components";
import MainLoader from "../../../components/mainLoader";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Pagination from "../../../components/pagination";
import { decodeBase64 } from "../../../utils/secureToken";
import { toast } from "react-toastify";
import Slider from "react-slick";
import chit from "../../../assets/images/chit.png";
import left from "../../../assets/images/left.png";
import tower from "../../../assets/images/tower.png";
import { getCountries, getCoupons, getRegions } from "../../home/api";
import { GetGeoLocations } from "../../../utils/GetGeoLocation";
import useAuth from "../../../lib/hooks/useAuth";
import region from "../../../assets/images/region.svg";
import flag from "../../../assets/images/india.png";
import france from "../../../assets/images/france.png";
import taj from "../../../assets/images/taj.png";
import filter from "../../../assets/images/filter.svg";
import mobar from "../../../assets/images/mobar.svg";
import EsimDestination from "../../home/routes/EsimDestination";
interface Params {
  regionType: number;
  limit: number;
  page: number;
  search: string;
  countryId?: string;
  couponId?: string;
  bundlesCombinedId?: String;
  dataAmount?: number;
  days?: number;
}

const Esim = () => {
  let { countryName } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  // const couponId = queryParams.get('couponId');
  let countryId = queryParams.get("country");
  let topup: any = queryParams.get("topup");
  let viewall = queryParams.get("viewall");
  topup = decodeBase64(topup);
  const { isAuthenticated } = useAuth();
  const couponPlans = location?.state ? location?.state?.couponPlans : null;
  const [countries, setCountries] = useState<any[]>([]);
  const [regions, setRegions] = useState<any[]>([]);
  const [bundles, setBundles] = useState<any[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");
  const currency = useSelector((state: any) => state?.getCurrency?.currency);
  const [activeTab, setActiveTab] = useState<number>(1);
  const [counts, setCounts] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const navigate = useNavigate();
  const [activeCoupon, setActiveCoupon] = useState<any>({});
  const [couponId, setCouponId] = useState<any>();
  const [getCouponDetals, setGetCouponDetals] = useState<any>([]);
  const [bundleFilter, setBundleFilter] = useState<any>({
    country: "",
    region: "",
    search: "",
  });

  const [esimFilter, setEsimFilter] = useState<any>({
    coverage: "",
    package: "",
    validity: "",
  });

  const [esimFilterData, setEsimFilterData] = useState<any>();

  const topupDetails = topup && !topup?.error ? JSON.parse(topup) : "";

  const [searchParams, setSearchParams] = useState("");
  const [showPackageOption, setShowPackageOption] = useState<boolean>(false);

  const [bundleAmount, setBundleAmount] = useState<number>(0);
  const [bundlePlans, setBundlePlans] = useState<number>(0);

  const handleSearch = (event: any) => {
    setSearchParams(event.target.value);
  };

  const handleSearchSubmit = (event: any) => {
    event.preventDefault();
    setLoader(true);
    setCurrentPage(1);
    setBundleFilter({
      ...bundleFilter,
      country: "",
      region: "",
      search: searchParams,
    });
    navigate(`/esim-list/${searchParams}`);
    if (event.target.value) {
      setCurrentPage(1);
      if (countryId || topupDetails?.country || viewall) {
        navigate(`/esim-list`, { replace: false });
      }
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setLoader(true);
    window.scrollTo(600, 600);
  };

  const pageRecords = 12;

  useEffect(() => {
    getCountries({ page: 1, limit: 300 })
      .then((res: any) => {
        setCountries(res?.data?.countries);
      })
      .catch((err) => {
        console.log(err, "getCountries ");
        setLoader(false);
      });
    getRegions({ page: 1, limit: 100 })
      .then((res: any) => {
        setRegions(res?.data?.regions);
      })
      .catch((err) => {
        console.log(err, "getRegions ");
        setLoader(false);
      });
    window.scrollTo(10, 10);
    // getBundleFilterData({ search: searchParams }).then((res: any) => {
    //     setEsimFilterData(res?.data[0])
    // }).catch((error) => {
    //     toast.error(error?.data?.message || "Something went wrong!")
    // })
  }, []);

  useEffect(() => {
    setLoader(true);
    if (topup && topup?.error) {
      toast.error("Topup not exist, something went wrong!");
      setTimeout(() => {
        navigate(-2);
      }, 3000);
    }

    const params: Params = {
      regionType: activeTab,
      limit: pageRecords,
      page: currentPage,
      search: searchParams || "",
    };

    if (countryId || topupDetails?.country) {
      params.countryId = countryId ? countryId : topupDetails?.country;
      setSearchParams("");
      params.regionType = 1;
      setActiveTab(1);
      window.scrollTo(600, 600);
    }

    if (bundleFilter.country || bundleFilter.region || bundleFilter.search) {
      params.search =
        bundleFilter.country || bundleFilter.region || bundleFilter.search;
    } else if (countryName) {
      params.search = countryName ? (countryName as string) : searchParams;
    } else {
      // couponId
    }

    if (couponId) {
      params.couponId = couponId;
    }

    if (esimFilter?.coverage) {
      params.bundlesCombinedId = esimFilter?.coverage;
    }
    if (bundleAmount > 0) {
      params.dataAmount = bundleAmount;
    }
    if (bundlePlans > 0) {
      params.days = bundlePlans;
    }

    getBundles(params)
      .then((res) => {
        setCounts(res.data.count);
        setBundles(res.data.bundles);
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
        console.log(error);
      });
    // window.scrollTo(10, 10);
  }, [
    activeTab,
    currency,
    currentPage,
    countryId,
    couponId,
    esimFilter,
    countryName,
    bundleFilter,
    bundleAmount,
    bundlePlans,
  ]);

  var settings = {
    dots: false,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
          autoplay: true, // Enables auto sliding
          autoplaySpeed: 1000,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 1,
          autoplay: true, // Enables auto sliding
          autoplaySpeed: 1000,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  var esimslider = {
    dots: false,
    arrow: false,
    infinite: true,
    // loop: true,
    // speed: 100,
    // autoplay: true,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    if (countryName)
      getBundleFilterData({ search: countryName })
        .then((res: any) => {
          setEsimFilterData(res?.data[0]);
        })
        .catch((error) => {
          setLoader(false);
          toast.error(error?.data?.message || "Something went wrong!");
        });

    window.addEventListener("resize", handleResize);
    if (isMobile) setActiveTab(1);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  return (
    <Layout>
      <meta
        name="description"
        content="Commbitz offers global eSIM with unlimited data, instant QR activation, and 24/7 support in 190+ countries. Get seamless connectivity on your travels worldwide."
      />
      {countryName && (
        <meta
          name="description"
          content={`esim for ${
            countryName.charAt(0).toUpperCase() + countryName.slice(1)
          } country`}
        />
      )}
      <meta
        name="keywords"
        content="global sim card unlimited data, global sim card, global esim, travel sim card, international sim card unlimited data, travel esim"
      ></meta>
      <title>Commbitz eSIM Services | Connect Anywhere, Anytime</title>
      {/* {loader && <MainLoder />} */}
      <Breadcrumb />
      {/* <div className={styles.esimBanner}>
                <div className='container'>
                    <div className={styles.esimBannerOuter}>
                        <h4>Commbitz eSIM stay connected anytime, anywhere!</h4>
                    </div>
                </div>
            </div> */}
      <EsimDestination />
      <section style={{ display: "none" }} className={styles.newEsim}>
        <div className="container">
          {!topup && getCouponDetals && getCouponDetals?.length > 0 && (
            <div className="mainCoupon">
              <div className="row">
                <div className={styles.PackHeadLeft}>
                  <h4>Coupons</h4>
                </div>
                {couponId && activeCoupon && (
                  <div className="col-3">
                    <div className={styles.esimDetails}>
                      <div className={styles.FirtPack}>
                        <div className={styles.PackHead}>
                          <div className={styles.PackHeadLeft}>
                            <h4>{activeCoupon?.title}</h4>
                          </div>
                          <div className={styles.PackHeadRight}>
                            <span>OFF {activeCoupon?.discount}%</span>
                          </div>
                        </div>
                        <button
                          className={styles.buySimBtn}
                          onClick={() => {
                            setActiveCoupon({});
                            setCouponId("");
                          }}
                        >
                          {couponId == activeCoupon?._id
                            ? "Deactive"
                            : "Active"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                <div className={`${couponId ? "col-9" : "col-12"}`}>
                  <Slider {...settings}>
                    {getCouponDetals.map((list: any) => (
                      <div className={styles.esimDetails}>
                        <div className={styles.FirtPack}>
                          <div className={styles.PackHead}>
                            <div className={styles.PackHeadLeft}>
                              <h4>{list?.title}</h4>
                            </div>
                            <div className={styles.PackHeadRight}>
                              <span>OFF {list?.discount}%</span>
                            </div>
                          </div>
                          <button
                            className={styles.buySimBtn}
                            onClick={() => {
                              setActiveCoupon(list);
                              setCouponId(list?._id);
                            }}
                            disabled={couponId == list?._id ? true : false}
                          >
                            {couponId == list?._id ? "Deactive" : "Active"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </div>
          )}

          <div className={styles.esminFilter}>
            <div className={styles.FormGroup}>
              <form className={styles.FormGroup} onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  placeholder="Search Country, Regions, Plans"
                  value={searchParams}
                  onChange={handleSearch}
                  style={{ color: "#ffffff" }}
                />
                <button onClick={handleSearchSubmit}>Search</button>
              </form>
            </div>
            <div className={styles.esimBlogsfl}>
              <div className={styles.formGroup}>
                {/* <span>
                  <img src={flag} alt="" />
                </span> */}
                <select
                  className={styles.countySelect}
                  onChange={(e) => {
                    setLoader(true);
                    setSearchParams("");
                    setCurrentPage(1);
                    if (countryId || topupDetails?.country || countryName) {
                      navigate(`/esim-list`, { replace: false });
                    }
                    setBundleFilter({
                      ...bundleFilter,
                      country: e.target.value,
                      region: "",
                      search: "",
                    });
                  }}
                  value={bundleFilter.country}
                >
                  <option value="">Select Country</option>
                  {countries &&
                    countries?.map((item: any, index: number) => (
                      <option value={item?.name}>{item?.name}</option>
                    ))}
                </select>
              </div>
              <div className={styles.formGroup}>
                {/* <span>
                  <img src={region} alt="" />
                </span> */}
                <select
                  onChange={(e) => {
                    setLoader(true);
                    setSearchParams("");
                    setCurrentPage(1);
                    if (countryId || topupDetails?.country || countryName) {
                      navigate(`/esim-list`, { replace: false });
                    }
                    setBundleFilter({
                      ...bundleFilter,
                      region: e.target.value,
                      country: "",
                      search: "",
                    });
                  }}
                  value={bundleFilter.region}
                >
                  <option value={""}>Select Regions</option>
                  {regions &&
                    regions?.map((item: any, index: number) => (
                      <option value={item?.name}>{item?.name}</option>
                    ))}
                </select>
              </div>
              {/* <span className={styles.filterSpan}>
                <img src={filter} alt="" /> Filter
              </span> */}
            </div>
          </div>
          {/* {(isMobile && countryName) ? (
            <>
              <div className="mobileFilters">
                <div className="leftmobFiletr">
                  <Slider {...esimslider}>
                    <div
                      className="mobSpan"
                      onClick={() => {
                        setBundleAmount(0);
                        setBundlePlans(0);
                      }}
                    >
                      <span className={0 === bundlePlans ? "active" : ""}>
                        All Pack
                      </span>
                    </div>
                    {esimFilterData &&
                      esimFilterData?.validityDays?.map(
                        (item: number, index: number) => (
                          <div
                            className="mobSpan"
                            onClick={() => setShowPackageOption(true)}
                          >
                            <span
                              className={item === bundlePlans ? "active" : ""}
                            >
                              {item > 1 ? item + ` Days` : item + ` Day`}
                            </span>
                          </div>
                        )
                      )}
                  </Slider>
                </div>
                <div
                  className="rightmobFiletr"
                  onClick={() => setShowPackageOption(!showPackageOption)}
                >
                  <span>
                    <img src={mobar} alt="" />
                  </span>
                </div>
              </div>
            </>
          ) : (
            false
          )} */}
          <div className="udadEsin">
            <div className={styles.esimBlogs}>
              <div className="row">
                {bundles.length > 0
                  ? bundles?.map((bundle, index) => (
                      <BundleCard
                        key={index}
                        bundle={bundle}
                        coupon={couponId}
                        topup={topupDetails?.iccid ? topupDetails?.iccid : ""}
                      />
                    ))
                  : !loader && (
                      <div className={styles.notFount}>Esim not Found!</div>
                    )}
              </div>
            </div>
          </div>
        </div>
        <Pagination
          count={counts} // You can replace this with the actual count received from the API
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          itemsPerPage={pageRecords}
        />
      </section>
      {/* <PartnerSection /> */}
      {showPackageOption && (
        <div
          className="modal fade show"
          id="changeplan"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          style={{ display: showPackageOption ? "block" : "none" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header p-0">
                {/* <h5 className="modal-title" id="exampleModalLabel">Modal title</h5> */}
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowPackageOption(!showPackageOption)}
                ></button>
              </div>
              <div className="modal-body p-0 b-0">
                <div className={styles.PacageOptioOuter}>
                  <h4>
                    Package options
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        setBundleAmount(0);
                        setBundlePlans(0);
                      }}
                    >
                      Clear All
                    </a>
                  </h4>
                  {/* <h5>Select options</h5> */}
                  <div className={styles.SelectSim}>
                    <h6>SIM card validity</h6>
                    <ul>
                      {/* bundlePlans */}
                      {esimFilterData &&
                        esimFilterData?.validityDays?.map(
                          (item: number, index: number) => (
                            <li
                              className={
                                item === bundlePlans ? styles.active : ""
                              }
                              onClick={() => setBundlePlans(item)}
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
                      {/* bundleAmount */}
                      {esimFilterData &&
                        esimFilterData?.dataAmount?.map(
                          (item: number, index: number) => (
                            <li
                              className={
                                item === bundleAmount ? styles.active : ""
                              }
                              onClick={() => setBundleAmount(item)}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Esim;
