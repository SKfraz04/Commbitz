
interface CreateBlogPayload {
    title: string,
    image: string,
    topic: string,
    rating: number,
    country: []
  }

interface CreateBlogResponse {
    statusCode: number,
    message: string
  }


export type {
    CreateBlogPayload,
    CreateBlogResponse
};