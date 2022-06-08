


// imports
import { 
     UserType, 
     NewUser, 
     ModifyDataType 
} from "./UserType.type";

import {
     NewPostType, 
     PostType,
} from './PostType.type';


// paginator response type
export type PaginatedResponse = {
     results: any[],
     hasMore: boolean,
     totalFound: number,
     currentPage: number,
     limit: number
}


// main database type
export type DatabaseType = {
     GetUser: (email: string) => Promise<UserType[]>,
     GetUsers: (page: number, limit: number) => Promise<PaginatedResponse>,
     CreateUser: (user: NewUser) => Promise<UserType | false>,
     DeleteUser: (email: string) => Promise<boolean>,
     ModifyUser: (email: string, details: ModifyDataType) => Promise<boolean>,

     NewPost: (data: NewPostType) => Promise<PostType | false>,
     GetPost: (id: string) => Promise<PostType[]>,
     GetAllPost: (page: number, limit: number) => Promise<PaginatedResponse>,
     GetUserPosts: (email: string, page: number, limit: number) => Promise<PaginatedResponse>
}