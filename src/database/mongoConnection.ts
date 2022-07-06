


import Log from '../config/bunyan.config';
import mongoose from 'mongoose';
import { DatabaseType, PaginatedResponse } from '../types/Database.type';
import { UserType, NewUser, ModifyDataType } from '../types/UserType.type';
import { CommentType, NewComment } from '../types/CommentType.type';
import { NewPostType, PostType } from '../types/PostType.type';
import { ImageType, NewImage } from '../types/ImageType.type';
import { NotificationsType } from '../types/NotificationsType.type';
import CommentsModel from '../models/Comments.models';
import ImageModel from '../models/Image.models';
import PostModel from '../models/Post.models';
import UserModel from '../models/User.models';
import NotificationModel from '../models/NotificationModel';



class MongoConnection implements DatabaseType {
     constructor(url: string) {
          mongoose.connect(url, {}, () => {
               Log.info('connected to database');
          });
     } 

     // Users
     async GetUser(email: string): Promise<UserType[]> {

          const response = await UserModel.find({email: email});

          if (response.length <= 0) return [];

          return [response[0]._doc];
     }

     async GetRandomUser(email: string): Promise<UserType> {

          const response = await UserModel.aggregate([
               {$match: {email: {$ne: email}}},
               {$sample: {size: 1}}
          ]);

          return response[0];


          // const total = await UserModel.countDocuments();
          
          // const random = Math.floor(Math.random() * total);

          // const response = await UserModel.findOne({email: {$ne: email}}).skip(random);

          // console.log(response);

          // return response._doc;
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

     async ModifyUser(email: string, data: ModifyDataType): Promise<boolean> {
          const response = await UserModel.updateOne(
               {email: email}, 
               {$set: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    profileImg: data.profileImg
               }}
          );

          if (response.modifiedCount <= 0) return false;
          return true;
     }

     async DeleteUser(email: string): Promise<boolean> {
          const response = await UserModel.deleteOne({email: email});
          if (response.deletedCount <= 0) return false;
          return true;
     }

     async GetConnections(email: string): Promise<any[]> {
          const response = await UserModel.findOne({email: email})
          .select('connections')
          .populate('connections', ['_id', 'firstName', 'lastName', 'profileImg', 'email', 'connections']);
          return response.connections;
     }

     async AddConnection(email: string, connection: string): Promise<boolean> {

          const updateUserConnections = await UserModel.updateOne(
               { email: email },
               { $push: {connections: connection}}
          );

          if (updateUserConnections.modifiedCount < 1) return false;
          return true;
     }

     async RemoveConnection(email: string, connection: string): Promise<boolean> {
          const updateUserConnections = await UserModel.updateOne(
               { email: email },
               { $pull: {connections: connection}}
          );

          if (updateUserConnections.modifiedCount < 1) return false;
          return true;
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
          
          const response = await PostModel.findOne({_id: id})
          .populate('createdBy', ['firstName', 'lastName', 'email']);
          return [response];
     }

     async GetARandomPost(): Promise<PostType> {
          // const response = await PostModel.aggregate([
          //      {$sample: {size: 1}}
          // ])


          const total = await PostModel.countDocuments();
          
          const random = Math.floor(Math.random() * total);

          const response = await PostModel.findOne()
          .populate('createdBy', ['firstName', 'lastName', 'email']).skip(random);

          return response;
     }

     async GetAllPost(page: number, limit: number): Promise<PaginatedResponse> {
          const startIndex = (page - 1) * limit;

          const endIndex = page * limit;

          const total = await PostModel.countDocuments().exec();

          const response = await PostModel.find().populate(
               'createdBy', ['firstName', 'lastName', 'email']
          ).limit(limit).skip(startIndex).exec();

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

          const response = await UserModel.findOne({email: email})
          .select('posts')
          .populate([
               {
                    path: 'posts',
                    populate: {
                         path: 'createdBy',
                         select: ['firstName', 'lastName', 'email']         
                    }
               }
          ]);

          const selectedPoints = response.posts.slice(startIndex, endIndex);

          const payload: PaginatedResponse = {
               currentPage: page,
               hasMore: endIndex < total,
               limit: limit,
               results: selectedPoints,
               totalFound: total
          }

          return payload
     }

     async GetUserLikedPosts(email: string, page: number, limit: number): Promise<PaginatedResponse> {

          const startIndex = (page - 1) * limit;

          const endIndex = page * limit;

          const count = await UserModel.find({email: email})

          const total = count[0].likedPosts.length;

          const response = await UserModel.findOne({email: email})
          .select('likedPosts')
          .populate([
               {
                    path: 'likedPosts',
                    populate: {
                         path: 'createdBy',
                         select: ['firstName', 'lastName', 'email']         
                    }
               }
          ]);

          const selectedPoints = response.likedPosts.slice(startIndex, endIndex);

          const payload: PaginatedResponse = {
               currentPage: page,
               hasMore: endIndex < total,
               limit: limit,
               results: selectedPoints,
               totalFound: total
          }

          return payload
     }

     async GetUserRepostedPosts(email: string, page: number, limit: number): Promise<PaginatedResponse> {

          const startIndex = (page - 1) * limit;

          const endIndex = page * limit;

          const count = await UserModel.find({email: email})

          const total = count[0].repostedPosts.length;

          const response = await UserModel.findOne({email: email})
          .select('repostedPosts')
          .populate([
               {
                    path: 'repostedPosts',
                    populate: {
                         path: 'createdBy',
                         select: ['firstName', 'lastName', 'email']         
                    }
               }
          ]);

          const selectedPoints = response.repostedPosts.slice(startIndex, endIndex);

          const payload: PaginatedResponse = {
               currentPage: page,
               hasMore: endIndex < total,
               limit: limit,
               results: selectedPoints,
               totalFound: total
          }

          return payload
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

          const dislike = await PostModel.updateOne(
               { _id: id },
               { $inc: {likes: -1} }
          );

          if (dislike.modifiedCount < 1) return false;

          const removeUserFromLikedList = await PostModel.updateOne(
               { _id: id },
               { $pull: {likedBy: user} }
          );

          if (removeUserFromLikedList.modifiedCount < 1) return false;

          const updateUser = await UserModel.updateOne(
               { _id: user },
               { $pull: {likedPosts: id} }
          );

          if (updateUser.modifiedCount < 1) return false;

          return true;
     }

     async RepostPost(id: string, user: string): Promise<boolean> {

          const updateSelectedPost = await PostModel.updateOne(
               { _id: id },
               { $inc: {reposts: 1} }
          );

          if (updateSelectedPost.modifiedCount < 1) return false;

          const addUserToRepostList = await PostModel.updateOne(
               { _id: id },
               { $push: {repostedBy: user} }
          );

          if (addUserToRepostList.modifiedCount < 1) return false;

          const updateUser = await UserModel.updateOne(
               { _id: user },
               { $push: {repostedPosts: id} }
          );

          if (updateUser.modifiedCount < 1) return false;

          return true;
     }

     async UnRepostPost(id: string, user: string): Promise<boolean> {

          const updatePostRepost = await PostModel.updateOne(
               { _id: id },
               { $inc: {reposts: -1} }
          );

          if (updatePostRepost.modifiedCount < 1) return false;

          const addUser = await PostModel.updateOne(
               { _id: id },
               { $pull: {repostedBy: user} }
          );

          if (addUser.modifiedCount < 1) return false;

          const updateUser = await UserModel.updateOne(
               { _id: user },
               { $pull: {repostedPosts: id} }
          );

          if (updateUser.modifiedCount < 1) return false;

          return true;
     }





     // Comments
     async CreateComment(data: NewComment, type: 'post' | 'comment'): Promise<CommentType | false> {
          const newComment = new CommentsModel({
               ...data
          });

          const response = await newComment.save();

          if (!response) return false;

          const commentID = response._id as string;

          const updateUser = await UserModel.updateOne(
               {_id: data.createdBy },
               { $push: {comments: commentID} }
          );

          if (updateUser.modifiedCount < 1) return false;

          if (type === 'post') {
               const updatePost = await PostModel.updateOne(
                    { _id: data.for },
                    { $push: {comments: commentID} }
               );               
          }

          else {
               const updateComment = await CommentsModel.updateOne(
                    { _id: data.for },
                    { $push: {comments: commentID} }
               );
          }

          return response;
     }

     async GetComment(id: string): Promise<CommentType[]> {

          const response = await CommentsModel.findOne({_id: id}).populate(
               'createdBy', ['firstName', 'lastName', 'email']
          );

          return [response];
     }
     
     async GetPostComments(id: string, page: number, limit: number): Promise<PaginatedResponse> {

          const startIndex = (page - 1) * limit;

          const endIndex = page * limit;

          const total = await PostModel.findOne({_id: id})

          const mainTotal = total.comments.length;

          const response = await PostModel.findOne({_id: id})
          .select('comments')
          .populate([
               {
                    path: 'comments',
                    populate: {
                         path: 'createdBy',
                         select: ['firstName', 'lastName', 'email']
                    }
               }
          ]);

          const selectedPoints = response.comments.slice(startIndex, endIndex);

          const payload: PaginatedResponse = {
               currentPage: page,
               hasMore: endIndex < mainTotal,
               limit: limit,
               results: selectedPoints,
               totalFound: mainTotal
          }

          return payload;
     }

     async GetCommentComments(id: string, page: number, limit: number): Promise<PaginatedResponse> {

          const startIndex = (page - 1) * limit;

          const endIndex = page * limit;

          const total = await CommentsModel.findOne({_id: id})

          const mainTotal = total.comments.length;

          const response = await CommentsModel.findOne({_id: id})
          .select('comments')
          .populate([
               {
                    path: 'comments',
                    populate: {
                         path: 'createdBy',
                         select: ['firstName', 'lastName', 'email']
                    }
               }
          ]);

          const selectedPoints = response.comments.slice(startIndex, endIndex);

          const payload: PaginatedResponse = {
               currentPage: page,
               hasMore: endIndex < mainTotal,
               limit: limit,
               results: selectedPoints,
               totalFound: mainTotal
          }

          return payload;
     }





     // Image / Uploads
     async NewUpload(data: NewImage): Promise<ImageType | false> {

          const newImage = new ImageModel({...data});

          const response = await newImage.save();

          if (!response) return false;

          const updateUser = await UserModel.updateOne(
               { _id: data.createdBy },
               { $push: {uploads: response._id} }
          );

          if (updateUser.modifiedCount < 1) return false;

          return response;
     }

     async GetImage(imgId: string): Promise<ImageType[]> {

          const getImage = await ImageModel.find({ _id: imgId });
          
          return getImage;
     }

     async DeleteImage(imgId: string, email: string): Promise<boolean> {
          const response = await ImageModel.deleteOne({_id: imgId});
          if (response.deletedCount <= 0) return false;
          return true;
     }





     // Notifications
     async GetNotifications(email: string): Promise<NotificationsType[]> {
          const response = await UserModel.findOne({email: email}).select('notifications').populate('notifications');

          return [response.notifications];
     }

     async ChangeNotificationStatus(email: string, id: string): Promise<boolean> {
          const response = await NotificationModel.updateOne(
               {_id: id},
               {$set: {isRead: true}}
          );

          if (response.modifiedCount < 1) return false;
          
          return true;
     }

     async DeleteNotification(email: string, id: string): Promise<boolean> {
          const updateUser = await UserModel.updateOne(
               {email: email},
               {$pull: {notifications: id}}
          );

          const response = await NotificationModel.deleteOne({_id: id});

          if (response.deletedCount < 1) return false;
          
          return true;
     }

     async ClearAllNotifications(email: string): Promise<boolean> {
          const response = await UserModel.updateOne(
               {email: email},
               {$pullAll: {notifications: ''}}
          );

          if (response.modifiedCount < 1) return false;

          return true;
     }
}




// main exports
export default MongoConnection