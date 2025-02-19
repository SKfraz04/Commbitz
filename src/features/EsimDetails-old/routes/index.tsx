import { useEffect, useState } from "react";
import moment from "moment";

import styles from '../styles/style.module.css';
import Layout from "../../../components/layout";
import Breadcrumb from '../../../components/breadcrumbs';
import DashboardSidebar from '../../../components/dashboardsidebar';
import cntflg from "../../../assets/images/cntflg.png"
import { getEsimDetails } from "../api";
import Pagination from "../../../components/pagination";
import MainLoader from "../../../components/mainLoader";
import CreateBlogModals from "../../../components/modals/CreateBlogModals";
import PackEsim from './PackEsim';
import { useNavigate, useParams } from "react-router-dom";

const EsimDetails = () => {
    const navigate = useNavigate();
    const {id} = useParams();

    const [getEsimDetals, setGetEsimDetals] = useState<any>([]);
    const [counts, setCounts] = useState<any>(1);
    const [currentPage, setCurrentPage] = useState<any>(1)
    const [loader, setLoader] = useState<boolean>(true);
    const [show, setShow] = useState<string>('');
    const [countryId, setCountryId] = useState<string>('');


    useEffect(() => {
        getEsimDetails(id).then((res)=>{
            setGetEsimDetals(res?.data)
        }).catch((error:any) => {
            console.log(error)
            setLoader(false)
        })
        window.scrollTo(0, 0);
    }, []);
    return (
        <Layout>
            <div className={styles.Profileouter}>
                <div className='container'>
                    <div className='row'>
                        <DashboardSidebar />
                        {getEsimDetals && getEsimDetals.map((list: any) => (
                            <div className="col-8" style={{color:"#fff"}}>
                                <ul>
                                    <li>{list?.name}</li>
                                    <li>{(list?.remainingQuantity/1024).toFixed(2)}/{(list?.initialQuantity/1024).toFixed(2)}</li>
                                    <li></li>
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default EsimDetails;