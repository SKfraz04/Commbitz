import React, { useEffect, useState } from 'react';
import styles from '../styles/style.module.css';
import Layout from "../../../components/layout"
import Breadcrumb from '../../../components/breadcrumbs';
import PartnerSeaction from '../../../components/partnerSection';
import blog from "../../../assets/images/blog.png"
import user from "../../../assets/images/user.png"
import { blogListData } from '../api';
import MainLoader from '../../../components/mainLoader';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Pagination from '../../../components/pagination';

const Blog = () => {
    const [blogs, setBlogs] = useState<any>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [loader, setLoader] = useState<boolean>(true);
    const [paginationLoader, setPaginationLoader] = useState<boolean>(false);
    const [count, setCount] = React.useState(0)
    const blogsPerPage = 10;

    const fetchBlogData = async (page: number) => {
        try {

            let pageNumber = currentPage;
         
            const response: any = await blogListData(pageNumber, blogsPerPage);
            if (response?.data && response.data && response.data.blogs) {
                setBlogs(response.data.blogs);
                setCount(response.data.count)
                setLoader(false)
                setPaginationLoader(false);
            } else {
                console.error("Error: Invalid response data structure");
            }
        } catch (error) {
            console.error("Error fetching blog data:", error);
        }
    };

    useEffect(() => {
        fetchBlogData(currentPage);
        window.scrollTo(0, 0);
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        setPaginationLoader(true);
        setCurrentPage(page);

    };

    return (
        <Layout>
            <Breadcrumb />
            <div className={styles.blogBannre}>
                <div className='container'>
                    <div className={styles.blogBannreimage}>
                        <img src={blog} alt="" />
                        <div className={styles.bogText}>
                            <span>Featured</span>
                            <h3>Explore the Beauty of The World </h3>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 🥳️ 🥳️ 🥳️ 🥳️.</p>
                            <div className={styles.usersBlog}>
                                <h5> <img src={user} alt="" />Tracey Wilson <label>August 20, 2022</label></h5>
                            </div>
                        </div>
                    </div>
                    <div className="row" >
                    {loader &&
                        <MainLoader />
                    }
                    {blogs.length > 0 ? (
                        blogs.map((blog: any) => (
                            <div className="col-md-4" key={blog._id}>
                                <Link to={`/blogdetail/${blog?._id}`}>
                                    <div className={styles.innerListBlog}>
                                        <img src={blog.image} alt="" />
                                        <div className={styles.blogDate}>
                                    <span>Featured</span>
                                    <label>{moment(blog.createdAt).format("MMMM DD, YYYY")}</label>
                                    </div>
                                        <h5> {blog?.title.length > 40 ? `${blog.title.slice(0, 40)}...` : blog.title}</h5>
                                    </div>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p className='text-center text-white'>No blogs available</p>
                    )}
                    {paginationLoader ? (
                        <MainLoader />
                    ) : (
                        <Pagination
                            count={count} // You can replace this with the actual count received from the API
                            handlePageChange={handlePageChange}
                            currentPage={currentPage}
                            itemsPerPage={blogsPerPage}
                        />)}
                    <PartnerSeaction />
                </div>
                </div>
            </div>
          
        </Layout>
    );
};

export default Blog;