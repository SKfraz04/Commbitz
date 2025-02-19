import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";

import modalStyles from './style.module.css';
import { CreateBlogSchema } from "./validations";
import { createBlogApi, uploadImage } from "./api";
import MainLoader from "../../mainLoader";
import { AddIcon } from "../../../assets/images";

interface Props {
    show: string;
    handleCloseModal: (data: string) => void;
    countryId:string
}

const CreateBlogModals = ({ show, handleCloseModal, countryId }: Props) => {
    const [blogImage, setBlogImage]= useState<string>(AddIcon);
    const [loader, setLoader]= useState<boolean>(false);
    
    
    const handleImageChange = (event: any) => {
        const img = event.currentTarget.files[0]
        const imgUrl = URL.createObjectURL(img);
        setBlogImage(imgUrl)
        createBlogFormik.setFieldValue('blogImage',img);
    };


    const createBlogFormik = useFormik({

        initialValues: {
            country: '',
            title: '',
            topic: '',
            image: '',
            blogImage: '',
            rating: '' // Added rating field
        },
        validationSchema: CreateBlogSchema,

        onSubmit: async (values) => {
            let CreateBlogsPayload: any = {
                title: values.title,
                blogImage: values.blogImage,
                topic: values.topic,
                image: values.image,
                rating: values.rating ,
                country: [`${countryId}`]// Updated to include rating
            };
            const formData = new FormData();
            formData.append('file', CreateBlogsPayload?.blogImage);

            const imageData: any = await uploadImage(formData)

            if (imageData?.data?.statusCode === 400) {
                createBlogFormik.errors.blogImage = "Something went wrong!"
                return false
            } else if (imageData?.statusCode == 200) {
                CreateBlogsPayload.image = imageData?.data.fileName;
                if (CreateBlogsPayload.image == '') {
                    createBlogFormik.errors.blogImage = "Something went wrong!"
                    return false
                }
            }
            setLoader(true)
            toast.promise(                
                createBlogApi(CreateBlogsPayload),
                {
                    pending: {
                        render() {
                            return 'Try to create blog';
                        }
                    },
                    success: {
                        render({ data }) {                            
                            handleCloseModal("") 
                            setLoader(false)                           
                            return 'Blog successfully created!';
                        }
                    },
                    error: {
                        render({ data }: any) {
                            setLoader(false)
                            return data.data.message;
                        }
                    }
                });
        },
    });

    return (
        <>
        {loader &&  <MainLoader />}
        <div
            className={`modal fade ${show}`}
            style={{ display: show ? 'block' : 'none' }}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header b-0">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => handleCloseModal("")}></button>
                    </div>
                    <div className="modal-body">
                    <h5 className="modal-title text-center p-0"  id="exampleModalLabel">Create Blog</h5>
                        <div className={modalStyles.changePasswordModal}>
                            <form onSubmit={createBlogFormik.handleSubmit}>
                                <div className={modalStyles.editIamge}>
                                    <input
                                        type='file'
                                        name="blogImage"
                                        onChange={handleImageChange}
                                        onBlur={createBlogFormik.handleBlur}
                                    />

                                    <span className={modalStyles.PrfileIamge}>  <img src={blogImage} alt="" /></span>
                                    <label>Blog Image</label>
                                    {
                                        createBlogFormik.touched.blogImage && createBlogFormik.errors.blogImage && (
                                            <p className="error">{createBlogFormik.errors.blogImage}</p>
                                        )
                                    }
                                </div>
                                <div className={modalStyles.formGroup}>
                                    <label>Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="Name"
                                        onChange={createBlogFormik.handleChange}
                                        onBlur={createBlogFormik.handleBlur}
                                        value={createBlogFormik.values.title}
                                    />
                                    {createBlogFormik.touched.title && createBlogFormik.errors.title && (
                                        <div className="error">{createBlogFormik.errors.title}</div>
                                    )}
                                </div>
                                {/* <div className={modalStyles.formGroup}>
                                    <div className="d-flex justify-content-between">
                                        <label>
                                            Blog Topic
                                        </label>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="please enter topic"
                                        name="topic"
                                        onChange={createBlogFormik.handleChange}
                                        onBlur={createBlogFormik.handleBlur}
                                        value={createBlogFormik.values.topic}
                                    />

                                    {
                                        createBlogFormik.touched.topic && createBlogFormik.errors.topic && (
                                            <p className="error">{createBlogFormik.errors.topic}</p>
                                        )
                                    }
                                </div> */}
                                   <div className={modalStyles.formGroup}>
                                        <div className="d-flex justify-content-between">
                                            <label>Blog Topic</label>
                                        </div>
                                        <textarea
                                            name="topic"
                                            onChange={createBlogFormik.handleChange}
                                            onBlur={createBlogFormik.handleBlur}
                                            value={createBlogFormik.values.topic}
                                            placeholder="Enter your blog topic here..."
                                            rows={5} // Adjust height as needed
                                            className="form-control"
                                        />
                                        {createBlogFormik.touched.topic && createBlogFormik.errors.topic && (
                                            <p  className="error" >{createBlogFormik.errors.topic}</p>
                                        )}
                                    </div>
                                {/* Rating input field */}
                                <div className={modalStyles.formGroup}>
                                    <label>Rating</label>
                                    <input
                                        type="number"
                                        name="rating"
                                        min="0"
                                        max="5"
                                        onChange={createBlogFormik.handleChange}
                                        onBlur={createBlogFormik.handleBlur}
                                        value={createBlogFormik.values.rating}
                                    />
                                    {createBlogFormik.touched.rating && createBlogFormik.errors.rating && (
                                        <div className="error" >{createBlogFormik.errors.rating}</div>
                                    )}
                                </div>
                                <div className={modalStyles.formGroup}>
                                    <input type="submit" value="Save" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default CreateBlogModals
