import styles from '../styles/style.module.css';
import Layout from "../../../components/layout"
import PartnerSeaction from '../../../components/partnerSection';
import MainLoader from '../../../components/mainLoader';
import moment from 'moment';
import { Navigate, useParams } from 'react-router-dom';
import { blogListDetailCommentGet, blogListDetailCommentPost, blogListDetailData } from '../../blog/api';
import { useEffect, useState } from 'react';
import useAuth from '../../../lib/hooks/useAuth';

const Blogdetail = () => {
    const [blog, setBlog] = useState<any>(null);
    const { id } = useParams<{ id?: string }>();
    const [loader, setLoader] = useState<boolean>(true);
    const [newCommentText, setNewCommentText] = useState<string>("");
    const [comments, setComments] = useState<Comment[]>([]);
    const [state, updateSate] = useState<any>({ isAddingComment: false, isUnauthrizedCommentAction: false });
    const [commentError, setCommentError] = useState<string>('');
    const { isAuthenticated } = useAuth();
    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                if (id) {
                    const response: any = await blogListDetailData(id);
                    if (response?.data && response.data && response.data.blog) {
                        setBlog(response.data.blog);
                        setLoader(false);
                    } else {
                        console.error("Error: Invalid response data structure");
                    }
                }
            } catch (error) {
                console.error("Error fetching blog data:", error);
            }
        };
        fetchBlogData();
        window.scrollTo(0, 0);

        const fetchComments = async () => {
            try {
                if (id) {
                    const res: any = await blogListDetailCommentGet(0, 10, id); // Assuming page=0 and limit=10
                    setComments(res);
                }
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };
        fetchComments();

    }, [id]);

    const handleNewCommentChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const text = event.target.value;
        setNewCommentText(text);
        if (text.trim() === '') {
            setCommentError('Comment is required');
        } else {
            setCommentError('');
        }

    };

    const handleAddComment = async (): Promise<void> => {
        if (newCommentText.trim() === '') {
            setCommentError('Comment is required');
            return; // Stop further execution if comment is empty
        }
        if (!isAuthenticated) {
            updateSate((prev: any) => ({ ...prev, isUnauthrizedCommentAction: true }))
        }
        try {
            if ((newCommentText.trim() !== "", id)) {
                updateSate((prev: any) => ({ ...prev, isAddingComment: true }))
                await blogListDetailCommentPost(id, newCommentText);

                if (id) {
                    const commentsResponse: any = await blogListDetailCommentGet(0, 10, id); // Assuming page=0 and limit=10
                    updateSate((prev: any) => ({ ...prev, isAddingComment: false }))
                    setComments(commentsResponse);
                    // Clear the comment input field
                    setNewCommentText("");
                }

            }
        } catch (error) {
            updateSate((prev: any) => ({ ...prev, isAddingComment: false }))
        }

    };
    if (state.isUnauthrizedCommentAction) {
        return <Navigate to={"/login"} />
    }

    return (
        <Layout>
            {/* <Breadcrumb /> */}
            <div className="container">
                {loader && <MainLoader />}
                {blog ? (
                    <>
                        <div className={styles.blogDetails}>
                            <div className="container">
                                <div className={styles.topFeature}>
                                    <div className={styles.bogText}>
                                        <span>Featured</span>
                                        <h3>{blog?.title}</h3>
                                        <div className={styles.usersBlog}>
                                            <h5>
                                                {
                                                    <div className={styles.imgContainer}>
                                                        <img
                                                            src={
                                                                blog?.createdBy?.avatar
                                                                    ? blog?.createdBy?.avatar
                                                                    : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                                            }
                                                            alt=""
                                                            className={styles.profileImg}
                                                        />
                                                    </div>
                                                }
                                                {blog?.createdBy?.fullName}{" "}
                                                <label>
                                                    {moment(blog.createdAt).format("MMMM DD, YYYY")}
                                                </label>
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="rating">
                            {/* Display rating */}
                            {Array.from({ length: 5 }, (_, index) => (
                                <span
                                    key={index}
                                    className={`fa fa-star ${index < blog.rating ? "checked" : ""}`}
                                ></span>
                            ))}
                        </div>
                        <div className={styles.blogMainImage}>
                            <img src={blog.image} alt="" />
                        </div>
                        <div className={styles.blogData}>
                            <h5>{blog.topic}</h5>
                            {/* Display other blog content here */}
                        </div>
                        <div className={styles.commentsSection}>
                            <h3>Comments</h3>
                            <div className={styles.commentInput}>
                                <input
                                    type="text"
                                    value={newCommentText}
                                    onChange={handleNewCommentChange}
                                    placeholder="Add a comment..."
                                    className={styles.commentTextInput}
                                />
                                {commentError && <span className="error">{commentError}</span>}
                                <button
                                    onClick={handleAddComment}
                                    className={styles.commentButton}
                                >
                                    {state.isAddingComment ? 'Loading' : 'Add'}
                                </button>
                            </div>
                            <ul className={styles.commentList}>
                                {comments.map((comment: any, index: any) => (
                                    <li key={index} className={styles.commentListItem}>
                                        <p>{comment.comment}</p>
                                        <p className={styles.commentDate}>
                                            {moment(comment.createdAt).format("MMMM DD, YYYY")}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                ) : (
                    <MainLoader />
                )}
            </div>

            <PartnerSeaction />
        </Layout>
    );
};

export default Blogdetail;