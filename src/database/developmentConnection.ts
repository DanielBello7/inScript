


import { DatabaseType, PaginatedResponse } from "../types/Database.type";
import { LocalPaginate } from '../middlewares/Paginate';
import { UserType, NewUser, ModifyDataType } from "../types/UserType.type";
import { NewPostType, PostType } from "../types/PostType.type";
import { NewComment, CommentType } from "../types/CommentType.type";
import { NewImage, ImageType } from "../types/ImageType.type";
import { NotificationsType } from "../types/NotificationsType.type";
// import bcrypt from 'bcrypt';




class DevelopmentAPI implements DatabaseType {

     public users: UserType[];

     public posts: PostType[];

     constructor() {
          this.users = [
               {
                    _id: '224iuvae',
                    firstName: 'Daniel',
                    lastName: 'Benson',
                    email: 'daniel@gmail.com',
                    password: '$2b$10$5EgyJZGKB3ODP//HePhLGe97p8aZvJzyG2Fw5u2H.QOW2ZcHuikPa',
                    // password: 'daniel'
               },
               {
                    _id: '914jlaeov',
                    firstName: 'David',
                    lastName: 'Bello',
                    email: 'david@gmail.com',
                    password: '$2b$10$2qTzPR0PDkL0eah4b5.4reUsp7Y0KejI7hX2IjunAksWjl5KJmLy2',
                    // password: 'david'
               },
               {
                    _id: '0724lbae',
                    firstName: 'Joshua',
                    lastName: 'Badmius',
                    email: 'joshua@gmail.com',
                    password: '$2b$10$Y2DpDOx6Q6UMqZxnzkrg5OS.64k.oJdJg4rvjEV05xuqd3qt1kvjq',
                    // password: 'joshua'
               },
          ]

          this.posts = []
     }


     // Users
     async GetUsers(page: number, limit: number): Promise<any> {
          const response = await LocalPaginate(this.users, page, limit);
          return response;
     }

     async GetUser(id: string): Promise<UserType[]> {
          const selectedUser = this.users.filter(user => user.email === id);
          return selectedUser;
     }

     async GetRandomUser(email: string): Promise<UserType> {
          // const selectedUser = this.users.filter(user => user.email === id);
          return {} as UserType;
     }

     async CreateUser(user: NewUser): Promise<UserType | false> {
          let _id = Math.random().toString();

          const newUser = {...user, _id }

          this.users.push(newUser);

          return newUser;
     }

     async ModifyUser(email: string, data: ModifyDataType): Promise<boolean> {

          let changed = false;

          const newData = this.users.map(user => {
               if (user.email !== email) return user

               changed = true;

               if (data.firstName) user.firstName = data.firstName;

               if (data.lastName) user.lastName = data.lastName;

               return user;
          });

          this.users = newData;

          if (!changed) return false;

          return true;
     }

     async DeleteUser(email: string): Promise<boolean> {
          return true
     }

     async AddConnection(email: string, connection: string): Promise<boolean> {
          return true
     }

     async GetConnections(email: string): Promise<any[]> {
          return []
     }

     async RemoveConnection(email: string, connection: string): Promise<boolean> {
          return true
     }





     // Posts
     async NewPost(data: NewPostType): Promise<PostType | false> {
          const newPost = {
               ...data,
               likedBy: [],
               repostedBy: [],
               comments: [],
               _id: `${Math.random()}`,
               createdAt: new Date()
          }

          // this.posts.push(newPost);

          return {} as PostType;
     }

     async GetPost(id: string): Promise<PostType[]> {
          const result = this.posts.filter(post => post._id === id);
          return result;
     }

     async GetARandomPost(): Promise<PostType> {
          // const result = this.posts.filter(post => post._id === id);
          return {} as PostType;
     }

     async GetAllPost(page: number, limit: number): Promise<PaginatedResponse> {
          const response = await LocalPaginate(this.posts, page, limit);
          return response;
     }

     async GetUserPosts(email: string, page: number, limit: number): Promise<PaginatedResponse> {

          const userPosts = this.users.find(user => user.email === email);

          const results = await LocalPaginate(userPosts?.posts, page, limit);
          
          return results;
     }

     async GetUserLikedPosts(email: string, page: number, limit: number): Promise<PaginatedResponse> {

          const userPosts = this.users.find(user => user.email === email);

          const results = await LocalPaginate(userPosts?.posts, page, limit);
          
          return results;
     }

     async GetUserRepostedPosts(email: string, page: number, limit: number): Promise<PaginatedResponse> {

          const userPosts = this.users.find(user => user.email === email);

          const results = await LocalPaginate(userPosts?.posts, page, limit);
          
          return results;
     }

     async LikePost(id: string, email: string): Promise<boolean> {
          return false
     }

     async UnlikePost(id: string, email: string): Promise<boolean> {
          return false
     }

     async RepostPost(id: string, email: string): Promise<boolean> {
          return false
     }

     async UnRepostPost(id: string, email: string): Promise<boolean> {
          return false
     }





     // Comments
     async CreateComment(data: NewComment, type: 'comment' | 'post'): Promise<CommentType | false> {
          return {} as CommentType;
     }

     async GetComment(id: string): Promise<CommentType[]> {
          return [{} as CommentType];
     }

     async GetPostComments(id: string, page: number, limit: number): Promise<PaginatedResponse> {
          return {} as PaginatedResponse
     }

     async GetCommentComments(id: string, page: number, limit: number): Promise<PaginatedResponse> {
          return {} as PaginatedResponse
     }





     // Uploads
     async NewUpload(data: NewImage): Promise<ImageType | false> {
          return {} as ImageType;
     }

     async GetImage(imgId: string): Promise<ImageType[]> {
          return [{} as ImageType]
     }

     async DeleteImage(imgId: string, email: string): Promise<boolean> {
          return false;
     }





     // Notifications
     async GetNotifications(email: string): Promise<NotificationsType[]> {
          return []
     }

     async ChangeNotificationStatus(email: string, id: string): Promise<boolean> {
          return true;
     }

     async DeleteNotification(email: string, id: string): Promise<boolean> {
          return true;
     }

     async ClearAllNotifications(email: string): Promise<boolean> {
          return true;
     }
}




export default DevelopmentAPI;