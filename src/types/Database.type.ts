


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

import {
     NewComment,
     CommentType
} from './CommentType.type';

import {
     ImageType,
     NewImage
} from './ImageType.type'


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
     GetUserPosts: (email: string, page: number, limit: number) => Promise<PaginatedResponse>,

     DeletePost: (id: string, email: string) => Promise<boolean>,
     LikePost: (id: string, email: string) => Promise<boolean>,
     UnlikePost: (id: string, email: string) => Promise<boolean>,
     RepostPost: (id: string, email: string) => Promise<boolean>,
     UnRepostPost: (id: string, email: string) => Promise<boolean>,

     CreateComment: (data: NewComment) => Promise<CommentType | false>,
     GetComment: (id: string) => Promise<CommentType[]>,
     GetPostComments: (id: string, page: number, limit: number) => Promise<PaginatedResponse>,
     GetUserComments: (email: string, page: number, limit: number) => Promise<PaginatedResponse>,
     LikeComment: (commentId: string, email: string) => Promise<boolean>,
     UnLikeComment: (commentId: string, email: string) => Promise<boolean>,
     RepostComment: (commentId: string, email: string) => Promise<boolean>,
     UnRepostComment: (commentId: string, email: string) => Promise<boolean>,
     DeleteComment: (commentId: string, email: string) => Promise<boolean>,

     NewUpload: (data: NewImage) => Promise<ImageType | false>,
     GetImage: (imgId: string) => Promise<ImageType[]>,
     DeleteImage: (imgId: string, email: string) => Promise<boolean>
}