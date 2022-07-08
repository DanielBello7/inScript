


// imports
import { UserType, NewUser, ModifyDataType } from "./UserType.type";
import { NewPostType, PostType } from './PostType.type';
import { NewComment, CommentType } from './CommentType.type';
import { ImageType, NewImage } from './ImageType.type';
import { NotificationsType } from './NotificationsType.type';


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
     // Users
     GetUser: (email: string) => Promise<UserType[]>,
     GetRandomUser: (email: string) => Promise<UserType>,
     GetUsers: (page: number, limit: number) => Promise<PaginatedResponse>,
     CreateUser: (user: NewUser) => Promise<UserType | false>,
     ModifyUser: (email: string, details: ModifyDataType) => Promise<boolean>,
     DeleteUser: (email: string) => Promise<boolean>,
     GetConnections: (email: string) => Promise<any[]>,
     AddConnection: (email: string, connection: string) => Promise<boolean>,
     RemoveConnection: (email: string, connection: string) => Promise<boolean>



     // Posts
     NewPost: (data: NewPostType) => Promise<PostType | false>,
     GetPost: (id: string) => Promise<PostType[]>,
     GetARandomPost: () => Promise<PostType>,
     GetAllPost: (page: number, limit: number) => Promise<PaginatedResponse>,
     GetUserPosts: (email: string, page: number, limit: number) => Promise<PaginatedResponse>,
     GetUserLikedPosts: (email: string, page: number, limit: number) => Promise<PaginatedResponse>,
     GetUserRepostedPosts: (email: string, page: number, limit: number) => Promise<PaginatedResponse>,
     LikePost: (id: string, email: string) => Promise<boolean>,
     UnlikePost: (id: string, email: string) => Promise<boolean>,
     RepostPost: (id: string, email: string) => Promise<boolean>,
     UnRepostPost: (id: string, email: string) => Promise<boolean>,
     GetProfileImg: (email: string) => Promise<String>



     // Comments
     CreateComment: (data: NewComment, type: 'comment' | 'post') => Promise<CommentType | false>,
     GetComment: (id: string) => Promise<CommentType[]>,
     GetPostComments: (id: string, page: number, limit: number) => Promise<PaginatedResponse>,
     GetCommentComments: (id: string, page: number, limit: number) => Promise<PaginatedResponse>,

     

     // Uploads
     NewUpload: (data: NewImage) => Promise<ImageType | false>,
     GetImage: (imgId: string) => Promise<ImageType[]>,
     DeleteImage: (imgId: string, email: string) => Promise<boolean>,



     // Notifications
     GetNotifications: (email: string) => Promise<NotificationsType[]>,
     ChangeNotificationStatus: (email: string, id: string) => Promise<boolean>,
     DeleteNotification: (email: string, id: string) => Promise<boolean>,
     ClearAllNotifications: (email: string) => Promise<boolean>
}