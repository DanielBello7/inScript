


import { DatabaseType, PaginatedResponse } from "../types/Database.type";
import { LocalPaginate } from '../middlewares/Paginate';
import bcrypt from 'bcrypt';
import { 
     UserType, 
     NewUser, 
     ModifyDataType 
} from "../types/UserType.type";
import { NewPostType, PostType } from "../types/PostType.type";
import { NewComment, CommentType } from "../types/CommentType.type";
import { NewImage, ImageType } from "../types/ImageType.type";



// create the implementation of the class
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


     // function to get users
     async GetUsers(page: number, limit: number): Promise<any> {
          const response = await LocalPaginate(this.users, page, limit);
          return response;
     }

     // function to get a particular user
     async GetUser(id: string): Promise<UserType[]> {
          const selectedUser = this.users.filter(user => user.email === id);
          return selectedUser;
     }

     // function to create a new user and add to the database
     async CreateUser(user: NewUser): Promise<UserType | false> {
          let _id = Math.random().toString();

          const newUser = {...user, _id }

          this.users.push(newUser);

          return newUser;
     }

     // function to modify a user
     async ModifyUser(email: string, data: ModifyDataType): Promise<boolean> {

          let changed = false;

          const newData = this.users.map(user => {
               if (user.email !== email) return user

               changed = true;

               if (data.firstName) user.firstName = data.firstName;

               if (data.lastName) user.lastName = data.lastName;

               if (data.password) {
                    user.password = bcrypt.hashSync(data.password, 10);
               }

               return user;
          });

          this.users = newData;

          if (!changed) return false;

          return true;
     }

     // function to remove a user from the list
     async DeleteUser(email: string): Promise<boolean> {
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

          this.posts.push(newPost);

          return newPost;
     }

     async GetPost(id: string): Promise<PostType[]> {
          const result = this.posts.filter(post => post._id === id);
          return result;
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

     async DeletePost (id: string, email: string): Promise<boolean> {
          return false;
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


     // comments
     async CreateComment(data: NewComment): Promise<CommentType> {
          return {} as CommentType;
     }

     async GetComment(id: string): Promise<CommentType[]> {
          return [{} as CommentType];
     }

     async GetPostComments(id: string, page: number, limit: number): Promise<PaginatedResponse> {
          return {} as PaginatedResponse
     }

     async GetUserComments(email: string, page: number, limit: number): Promise<PaginatedResponse> {
          return {} as PaginatedResponse
     }

     async LikeComment(commentId: string, email: string): Promise<boolean> {
          return false;
     }

     async UnLikeComment(commentId: string, email: string): Promise<boolean> {
          return false;
     }

     async RepostComment(commentId: string, email: string): Promise<boolean> {
          return false;
     }

     async UnRepostComment(commentId: string, email: string): Promise<boolean> {
          return false;
     }

     async DeleteComment(commentId: string, email: string): Promise<boolean> {
          return false;
     }


     // Image / Uploads
     async NewUpload(data: NewImage): Promise<ImageType> {
          return {} as ImageType;
     }

     async GetImage(imgId: string): Promise<ImageType[]> {
          return [{} as ImageType]
     }

     async DeleteImage(imgId: string, email: string): Promise<boolean> {
          return false;
     }
}


// export the class
export default DevelopmentAPI;