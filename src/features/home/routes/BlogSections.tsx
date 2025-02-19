import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import moment from "moment"

import { getBlogs } from "../api";
import { CONSTANTS } from "../../../utils";
import styles from "../styles/home.module.css";


const BlogSections = () => {
    const [blogDetails, setBlogDetails] = useState<any>([]);
    const getBlogsData = async () => {
        const blogs: any = await getBlogs()
        setBlogDetails(blogs)
    }
    useEffect(() => {
        
        getBlogsData();

    }, []);

    return (
        <>
            {blogDetails?.length > 0 &&
                <div className={styles.blogSection}>

                    <div className='container'>
                        <h6>Latest Blogs</h6>
                        <h3>Stay Update with Traveltrek</h3>
                        <div className='row'>
                            {blogDetails.length ?
                                blogDetails.map((blog: any, index: number) =>
                                    <div className="col-md-4" key={blog._id}>
                                        <div className={styles.blogInner}>
                                            <img src={blog?.featured_img} alt="" />
                                            <div className={styles.blogDate}>
                                                <span>Featured</span>
                                                <label> {blog?.date}</label>
                                            </div>
                                            <h5> {blog?.title.length > 40 ? `${blog.title.slice(0,50)}...` : blog.title} <a href={blog?.link}>Read more</a></h5>
                                        </div>
                                    </div>
                                )
                                :
                                <div className='col-md-4'>
                                    <div className={styles.blogInner}>
                                        <h5>Blogs not found</h5>
                                    </div>
                                </div>
                            }
                        </div>
                        {blogDetails?.length >= 3 ?
                            <a className={styles.Viewbtn} href="https://commbitz.com/blog/">View All</a>
                            : ""}
                    </div>

                </div>
            }
        </>
    )
}

export default BlogSections