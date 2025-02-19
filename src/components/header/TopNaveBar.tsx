import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Select, { SingleValue } from "react-select";
import glob from "../../assets/images/glob.svg";
import useAuth from "../../lib/hooks/useAuth";
import styles from "./style.module.css";
import { currencyUpdate, getCurrency, getLanguage } from "./api";
import MainLoader from "../mainLoader";
import { getUserData } from "../dashboardsidebar/api";
import { setCurrency } from "../../redux/slices/currencySlice";
import storage from "../../utils/storage";
import { getApplink, getPlateform } from "../../utils/getDevicePlateform";
import { Link, useLocation } from "react-router-dom";
import app from "../../assets/images/app.svg"
import play from "../../assets/images/play.svg"

const TopNaveBar = () => {
  const { isAuthenticated } = useAuth();
  const [getCurrecny, setGetCurrency] = useState<any>([]);
  const [currencyValue, setCurrencyValue] = useState<any>();
  const [getLanguages, setGetLanguages] = useState<any>([]);
  const [langValue, setLangValue] = useState<any>("");
  const [langFlag, setLangFlag] = useState<any>("");
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const plateform = getPlateform();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const urlToken: any = queryParams.get("token");

  useEffect(() => {
    if (!urlToken) window.localStorage.removeItem("niyoToken");
    setLoader(false);
    // getLanguage().then((res: any) => {
    //   setGetLanguages(res?.data?.languages);
    //   setLoader(false);
    // });

    if (storage.getToken()) {
      getUserData()
        .then((res: any) => {
          if (!res?.data?.language) {
            currencyUpdate({ language: langValue }).then(() => {
              setLoader(false);
            });
          } else {
            setLoader(false);
            setLangValue(res?.data?.language);
          }
          setLoader(false);
          setCurrencyValue(res?.data?.currencyData?._id);
        })
        .catch((error) => {
          setLoader(false);
          console.log(error);
        });

      if (isAuthenticated)
        getCurrency().then((res) => {
          setLoader(false);
          setGetCurrency(res?.data);
        });
    }
  }, [isAuthenticated]);

  const handleCurrencyUpdate = (
    selectedOption: SingleValue<{ value: string; label: string }>
  ) => {
    setLoader(true);

    const currencyVal = selectedOption?.value;

    setCurrencyValue(currencyVal);

    currencyUpdate({ currencyId: currencyVal }).then(() => {
      setCurrency(currencyVal);
      dispatch(setCurrency(currencyVal));
      setLoader(false);
    });
  };

  const handleLanguageUpdate = (event: any) => {
    setLoader(true);
    const langVal = event?.target?.value;
    currencyUpdate({ language: langVal }).then((res: any) => {
      setLangValue(res?.data?.language);
      setLoader(false);
    });
  };

  const currencyOptions = getCurrecny.map((currency: any) => ({
    value: currency._id,
    label: `${currency.symbol} ${currency.code}`,
  }));

  const lagOption: any = [{ value: "English", label: "English" }];

  const currOption: any = [{ value: "USA", label: "USA" }];

  return (
    <div className={styles.topHead}>
      {/* {loader && <MainLoader />} */}
      <div className="container topHead">
        <div className="row">
          <div className="col-7">
            <div className={styles.wtsApp}>
              <p>
                <Link to="/esim">Get your eSIM now !!</Link>
              </p>
            </div>
          </div>
          <div className="col-5">
            <div className={styles.language}>
              <label
                style={
                  !plateform
                    ? { display: "block", paddingRight: "15px" }
                    : { display: "none" }
                }
              >
                <a
                  style={{ color: "#000" }}
                  href="https://apps.apple.com/in/app/commbitz-e-sim/id6572300745"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={app} width="18" height="18" alt="app store apk" />
                </a>
              </label>
              <label
                style={!plateform ? { display: "block" } : { display: "none" }}
              >
                <a
                  style={{ color: "#000" }}
                  href="https://play.google.com/store/apps/details?id=com.commbitz"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={play} width="18" height="18" alt="play store apk" />
                </a>
              </label>
              <label
                style={
                  plateform === "IOS" || plateform === "android"
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <a
                  style={{ color: "#000" }}
                  href={getApplink()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Go to App
                </a>
              </label>
              <div className={styles.formGroup}>
                <span>
                  <img width="13" height="13" src={glob} alt="" />
                </span>
                {isAuthenticated ? (
                  <Select
                    options={lagOption}
                    value={lagOption.find(
                      (option: any) => option.value === "English"
                    )}
                    isSearchable={false}
                    menuIsOpen={lagOption.length > 1}
                  />
                ) : (
                  // <select onChange={handleLanguageUpdate} value={langValue}>
                  //   {getLanguages && getLanguages.length > 0 && getLanguages.map((lang: any) => (
                  //     <option key={lang._id} value={lang._id}>
                  //       <img src={lang.image} alt="" />{lang.language}
                  //     </option>
                  //   ))}
                  // </select>
                  <Select
                    options={lagOption}
                    value={lagOption.find(
                      (option: any) => option.value === "English"
                    )}
                    isSearchable={false}
                    menuIsOpen={lagOption.length > 1}
                  />
                )}
              </div>
              {/* {isAuthenticated && (
                <div className={styles.formGroup}>
                  <Select
                    options={currencyOptions}
                    onChange={handleCurrencyUpdate}
                    value={currencyOptions.find(
                      (option: any) => option.value === currencyValue
                    )}
                    isSearchable={false}
                    menuIsOpen={lagOption.length > 1}
                  />
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNaveBar;
