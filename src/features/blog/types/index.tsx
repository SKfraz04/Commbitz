
interface createdBy{
  
    fullName: string;
    avatar: string;
}


interface Blog {
    _id: string;
    title: string;
    topic: string;
    status: number;
    type: number;
    rating: number;
    createdAt: string;
    userId: string;
    image: string;
    createdBy:createdBy
}
 interface Comment {
    comment: string;
    createdAt: string; // Assuming createdAt is a string representing a date
    // Other properties of Comment if any
  }

export type {
    Blog,Comment }