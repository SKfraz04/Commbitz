import { Blog, Comment } from "../types"
import { API_URL } from "../../../config"
// import axios from "axios";
import { axios } from "../../../lib/axios";

const blogListData = async(page: number, limit: number):Promise<Blog[]>=>{  
   return axios.get(`${API_URL}/blogs?page=${page}&limit=${limit}`)
}
 const blogListDetailData = async(id:string):Promise<Blog[]>=>{
   return axios.get(  `${API_URL}/blogs/${id}`)
}
const blogListDetailCommentGet = async (page: number, limit: number, blog: string): Promise<Comment[]> => {
   try {
  
     const response = await axios.get(`${API_URL}/blogs/comments?page=${page}&limit=${limit}&blog=${blog}`);
     return response.data.blogComments;
   } catch (error) {
     console.error("Error fetching blog comments:", error);
     throw error; 
   }
 };
 
const blogListDetailCommentPost = async (id: string, commentText: string): Promise<void> => {
   try {
     await axios.post(`${API_URL}/blogs/comment`, { comment: commentText,blog:id });
   } catch (error) {
     console.error("Error adding comment:", error);
     throw error; 
   }
 };
 
 export {
    blogListData,blogListDetailData,blogListDetailCommentGet,blogListDetailCommentPost
 }

 