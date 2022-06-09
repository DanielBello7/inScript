


// imports
import Log from '../config/bunyan.config';
import mongoose from 'mongoose';
import { DatabaseType, PaginatedResponse } from '../types/Database.type';
import { 
     UserType, 
     NewUser, 
     ModifyDataType 
} from '../types/UserType.type';
import { CommentType, NewComment } from '../types/CommentType.type';
import { NewPostType, PostType } from '../types/PostType.type';
import { ImageType, NewImage } from '../types/ImageType.type';
import CommentsModel from '../models/Comments.models';
import ImageModel from '../models/Image.models';
import PostModel from '../models/Post.models';
import UserModel from '../models/User.models';


class MongoConnection implements DatabaseType {
     constructor(url: string) {
          // connect function
          mongoose.connect(url, {}, () => {
               Log.info('connected to database');
          });
     } 


     // User
     async GetUser(email: string): Promise<UserType[]> {

          const response = await UserModel.find({email: email});

          if (response.length <= 0) return [];

          const user: UserType = {
               _id: response[0]._id,
               email: response[0].email,
               firstName: response[0].firstName,
               lastName: response[0].lastName,
               password: response[0].password
          }

          return [user]
     }

     async GetUsers(page: number, limit: number): Promise<PaginatedResponse> {
          const startIndex = (page - 1) * limit;
          const endIndex = page * limit;

          const total = await UserModel.countDocuments().exec();

          const response = await UserModel.find().limit(limit).skip(startIndex).exec();

          const resUsers = response.map(result => {
               const { password, comments, uploads, ...newResUser } = result;
               return newResUser;
          });

          const payload: PaginatedResponse = {
               currentPage: page,
               hasMore: endIndex < total,
               limit: limit,
               results: resUsers,
               totalFound: total
          }
          return payload
     }

     async CreateUser(user: NewUser): Promise<UserType | false> {

          const newUser = new UserModel({
               firstName: user.firstName,
               lastName: user.lastName,
               email: user.email,
               password: user.password
          });

          const response = await newUser.save();

          if (!response) return false

          return response
     }

     // not created
     async ModifyUser(email: string, data: ModifyDataType): Promise<boolean> {
          return false;
     }

     // not created
     async DeleteUser(email: string): Promise<boolean> {
          return false;
     }


     // Posts
     async NewPost(data: NewPostType): Promise<PostType | false> {

          const newPost = new PostModel({
               text: data.text,
               createdBy: data.createdBy,
               likes: data.likes,
               reposts: data.reposts,
               postType: data.postType,
               mediaType: data.mediaType,
               media: data.media
          });

          const response = await newPost.save();

          if (!response) return false;

          const updateUser = await UserModel.updateOne(
               { _id: data.createdBy },
               { $push: {posts: response._id}}
          );

          if (updateUser.matchedCount <= 0) return false;

          return response;
     }

     async GetPost(id: string): Promise<PostType[]> {
          
          const response = await PostModel.find({_id: id});

          return response;
     }

     async GetAllPost(page: number, limit: number): Promise<PaginatedResponse> {
          const startIndex = (page - 1) * limit;

          const endIndex = page * limit;

          const total = await PostModel.countDocuments().exec();

          const response = await PostModel.find().limit(limit).skip(startIndex).exec();

          const payload: PaginatedResponse = {
               currentPage: page,
               hasMore: endIndex < total,
               limit: limit,
               results: response,
               totalFound: total
          }

          return payload;
     }

     async GetUserPosts(email: string, page: number, limit: number): Promise<PaginatedResponse> {

          const startIndex = (page - 1) * limit;

          const endIndex = page * limit;

          const count = await UserModel.find({email: email})

          const total = count[0].posts.length;

          const response = await UserModel.findOne({email: email}).populate({
               path: 'posts'
          }).limit(limit).skip(startIndex).exec();

          const payload: PaginatedResponse = {
               currentPage: page,
               hasMore: endIndex < total,
               limit: limit,
               results: response,
               totalFound: total
          }

          return payload
     }

     // not created
     async DeletePost(id: string, email: string): Promise<boolean> {
          return false;
     }

     async LikePost(id: string, user: string): Promise<boolean> {
          
          const updateLikes = await PostModel.updateOne(
               { _id: id },
               { $inc: {likes: 1} }
          );

          if (updateLikes.matchedCount < 1) return false;

          const updateLikers = await PostModel.updateOne(
               { _id: id },
               { $push: {likedBy: user}}
          );

          if (updateLikers.modifiedCount < 1) return false;

          const updateUser = await UserModel.updateOne(
               { _id: user },
               { $push: {likedPosts: id}}
          );

          if (updateUser.modifiedCount < 1) return false;

          return true;
     }

     async UnlikePost(id: string, user: string): Promise<boolean> {
          return false
     }

     async RepostPost(id: string, user: string): Promise<boolean> {
          return false
     }

     async UnRepostPost(id: string, user: string): Promise<boolean> {
          return false
     }


     // Comments
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




// main exports
export default MongoConnection