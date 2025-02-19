import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import MarkdownIt from "markdown-it";
import MainLoder from '../../../components/mainLoader'
import styles from '../styles/style.module.css';
import { Layout, Breadcrumb, PartnerSection } from "../../../components";
import { FAQ } from '../interfaces';
import { getFAQS } from '../api';
import { THEME } from '../../../utils/constants';
import { generateWhatsAppLink } from '../../../utils/generateWhatsAppLink';
import Pagination from '../../../components/pagination';


const TroubleShoot = () => {
    const [loader, setLoader]= useState<boolean>(true);
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [count, setCount] = useState(0)
    const [activeFAQ, setActiveFAQ] = useState<string>('');
    const params = useParams();
    const faqPerPage = 10;
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [paginationLoader, setPaginationLoader] = useState<boolean>(false);

    const handlePageChange = (page: number) => {
        setPaginationLoader(true);
        setCurrentPage(page);

    };

    const mdParser = new MarkdownIt({
        html: true,
        linkify: true,
        typographer: true,
    });

    useEffect(() => {
        getFAQS({page:currentPage, limit:faqPerPage}).then((res:any) => {
            setFaqs(res.data.troubleShoot);
            setCount(res?.data?.count)
            setLoader(false)
        });
        window.scrollTo(0, 0);
    }, [currentPage]);
    return (
        <Layout>
            {loader &&
                <MainLoder/>
            }
            <Breadcrumb />
            <div className={params.theme === THEME.LIGHT ? styles.Faqtop: styles.FaqtopDark}>
                <div className='container'>
                    <div className={styles.Faqtopouter}>
                        <div className='row align-items-center'>
                            <div className='col-md-7'>
                                <div className={styles.faqLeft}>
                                    <h3>Do you have more questions?</h3>
                                    <Link to={generateWhatsAppLink()} target="_blank" ><i className="fab fa-whatsapp"></i> Direct Chat  </Link>
                                </div>
                            </div>
                            <div className='col-md-5'>
                                <div className={styles.faqRight}>
                                    <p>You can email us your question, we are available 24/7 to answer all your question.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={params.theme === THEME.LIGHT ? styles.FaqQuestionLight: styles.FaqQuestion}>
                <div className='container'>
                    <div className={params.theme === THEME.LIGHT ? "faqPageQuestionDark": "faqPageQuestion"} >
                        <div className="accordion" id="faqAccordion">
                            {faqs?.map((faq) => {
                                return (
                                    <div className="accordion-item" key={faq._id} onClick={() => setActiveFAQ(activeFAQ === faq._id ? '' : faq._id)}>
                                        <h2 className="accordion-header" id={`heading-${faq._id}`}>
                                            <button
                                                className={`accordion-button ${activeFAQ === faq._id ? 'active' : ''}`}
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target={`#collapse${faq._id}`}
                                                aria-expanded="false"
                                                aria-controls={`collapse${faq._id}`}
                                            >
                                                <p> {faq.question}</p>
                                            </button>
                                        </h2>
                                        <div
                                            id={`collapse${faq._id}`}
                                            className={`accordion-collapse collapse ${activeFAQ === faq._id ? "show" : "hide"}`}
                                            data-bs-parent="#faqAccordion"
                                            aria-labelledby={`heading-${faq._id}`}
                                        >
                                            <div className="accordion-body">
                                                <div className='row'>
                                                    <div className='col-md-12'>
                                                        <div className={styles.faqaccorright}>
                                                            <div
                                                                className="text-white"
                                                                dangerouslySetInnerHTML={{
                                                                    __html: mdParser.render(faq.answer as string),
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <Pagination
                            count={count} // You can replace this with the actual count received from the API
                            handlePageChange={handlePageChange}
                            currentPage={currentPage}
                            itemsPerPage={faqPerPage}
                        />
            <PartnerSection />
        </Layout>
    );
};

export default TroubleShoot;