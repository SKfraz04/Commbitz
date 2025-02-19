import { useState, useEffect } from "react";

import {BundleCard} from "../../../components"

import { getBundles } from "../api"
import styles from '../styles/style.module.css';
import { FilterIcon } from "../../../assets/images";
import { BUNDLE_TYPE } from "../../../utils/constants";
import { useLocation } from "react-router-dom";
import { getCountries, getRegions } from "../../home/api";

const EsimList = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const couponId = queryParams.get('country');
    const [selectedBundleType, setBundleType] = useState<number>(1);
    const [countries, setCountries] = useState<any[]>([]);
    const [bundles, setBundles] = useState<any[]>([]);

    const handleBundleTypeChange = async (event: any) => {
        const selectedValue = parseInt(event.target.value);
        setBundleType(selectedValue);

        if (selectedValue === BUNDLE_TYPE.LOCAL) {
            getCountries({page:1, limit:300}).then((res:any) => {
                const { countries } = res.data;

                setCountries(countries);
            });
        } else if (selectedValue === BUNDLE_TYPE.MULTIVERSE) {

            getRegions({page:1, limit:300}).then((res:any) => {
                const regions = res?.data?.regions;

                setCountries(regions);

                getBundlesList(selectedBundleType, regions[0]._id);
            });

        }
    };

    const handleCountryChange = async (event: any) => {
        const value = event.target.value;
        const regionType = selectedBundleType;

        getBundlesList(regionType, value);
    }

    const getBundlesList = (selectedBundleType: number, value: string) => {
        let params = {
            regionType: selectedBundleType,
            [selectedBundleType === BUNDLE_TYPE.LOCAL ? 'countryId': 'regionId']: value,
        };

        getBundles(params).then(res => {
            setBundles(res.data.bundles);
        });
    };

    useEffect(() => {
        getCountries({page:1, limit:300}).then((res:any) => {
            const { countries } = res.data;

            setCountries(countries);
            getBundlesList(selectedBundleType, countries[0]._id);
        });
    }, []);
    return (
        <section className={styles.sifmList}>
            <div className='container'>
                <div className={styles.esimFilter}>
                    <div className={styles.formGroup}>
                        <select onChange={handleBundleTypeChange} value={selectedBundleType}>
                            <option key='local' value={1}>Local</option>
                            <option key='multiverse' value={2}>MultiCountry</option>
                        </select>
                    </div>
                    <div className={styles.formGroup}>
                        <span>
                            <img src={FilterIcon} alt="filter" />
                        </span>
                        <select onChange={handleCountryChange}>
                            {countries.map((country, index) => (
                                <option key={index} value={country._id}>{country.name}</option>
                            ))}
                        </select>
                    </div>
                    {/* <div className={styles.formGroup}>
                        <span><img src={cntflg} alt="" /></span>
                        <select>
                            <option>America (US)</option>
                        </select>
                    </div> */}
                    {/* <div className={styles.formGroup}>
                        <span><img src={filter} alt="" /></span>
                        <select>
                            <option>Newest</option>
                        </select>
                    </div> */}
                </div>
                <div className={styles.esimBlogs}>
                    <div className='row'>
                        {bundles.length > 0 ?
                            bundles.map((bundle, index) =>
                                <BundleCard key={index} bundle={bundle} />
                            )
                            :
                            <div className={styles.notFount}>No Esim Found!</div>

                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EsimList;