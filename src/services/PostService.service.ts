


// imports
import PostModel from "../models/Post.models";
import { User } from './UserService.service';
import Log from "../config/bunyan.config";
import mongoose from "mongoose";


const NewUser = new User();


class Post {
     constructor() {}
     

     // this service adds a text post
     async AddTextPost(message: string, userID: mongoose.Schema.Types.ObjectId) {
          
          const newPost = new PostModel({
               text: message,
               createdBy: userID,
               postType: "text"
          });

          const post = await newPost.save();

          const post_id = post._id;

          const updateUser = await NewUser.AddPost(userID as any, post_id);

          if (!updateUser) return false;

          return updateUser;
     }


     // likes a post
     async LikePost(postId: string, userID: mongoose.Schema.Types.ObjectId) {
          
          const update = await PostModel.updateOne({_id: postId}, {$inc: {likes: 1}});

          if (update.modifiedCount < 1) return false;


          const updatePost = await PostModel.updateOne(
               { _id: postId },
               { $push: {likedBy: userID} }
          )

          const userUpdate = await NewUser.AddLikedPost(userID as any, postId);

          if (!userUpdate) return false;

          if (updatePost.modifiedCount < 1) return false;

          return update
     }


     // unlikes a post
     async DisLikePost(postID: string, userID: mongoose.Schema.Types.ObjectId) {
          
          const dislike = await PostModel.updateOne({_id: postID}, {$inc: {likes: -1}});

          if (dislike.modifiedCount < 1) return false;

          const updatePost = await PostModel.updateOne(
               { _id: postID },
               { $pull: {likedBy: userID} }
          )


          const userUpdate = await NewUser.RemoveLikedPost(userID as any, postID);

          if (!userUpdate) return false;
          
          if (updatePost.modifiedCount < 1) return false;


          return dislike;
     }


     // handles reposting a post
     async Repost(postID: string, userID: mongoose.Schema.Types.ObjectId) {

          const repost = await PostModel.updateOne(
               { _id: postID },
               { $inc: {reposts: 1} }
          )

          if (repost.modifiedCount < 1) return false;

          const addUser = await PostModel.updateOne(
               { _id: postID },
               { $push: {repostedBy: userID} }
          )


          const userUpdate = await NewUser.AddReposts(userID as any, postID);

          if (!userUpdate) return false;

          if (addUser.modifiedCount < 1) return false;

          return repost;
     }


     // handles un reposting a post
     async UnRepost(postID: string, userID: mongoose.Schema.Types.ObjectId) {
          const repost = await PostModel.updateOne(
               { _id: postID },
               { $inc: {reposts: -1} }
          )

          if (repost.modifiedCount < 1) return false;

          const addUser = await PostModel.updateOne(
               { _id: postID },
               { $pull: {repostedBy: userID} }
          )


          const userUpdate = await NewUser.RemoveReposts(userID as any, postID);

          if (!userUpdate) return false;


          if (addUser.modifiedCount < 1) return false;

          return repost;
     }


     // gets all posts from all users
     async GetAllPosts() {


          const allPosts = await PostModel.find().populate(
               'createdBy', 
               ['firstNname', 'lastName', 'email']
          );


          return allPosts;
     }


     // gets a particular post
     async GetSinglePost(postId: string) {
          
          try {
               
               const response = await PostModel.findById(postId).populate([
                    {
                         path: 'createdBy'
                    },
                    {
                         path: 'comments', 
                         populate: {
                              path: 'createdBy', 
                              select: ['firstName', 'lastName', 'email']
                         }
                    }
               ]);

               if (!response) return false;

               return response;


          }
          catch (error) {

               Log.error(error);
               return error;
     
          }


     }


     // deletes a specific post
     // this function isnt finished yet and should be re-evaluated
     // the problem i am having here on this function is the fact that
     // you have a post already being added to other users liked posts and
     // reposted posts so deleting this post would leave those id's within those 
     // arrays as invalid
     // i need to find a way to erase those posts from the arrays in each individual
     // efficiently
     async DeletePost(postID: string, userID: string) {

          const response = await PostModel.deleteOne({_id: postID});

          const userUpdate = await NewUser.RemovePost(userID, postID);

          return response;
     }



     // function to handle the taking in of created comments to a post
     async AddNewComment(commentID: string, postID: string) {


          const updatePost = await PostModel.updateOne(
               { _id: postID },
               { $push: {comments: commentID} }
          );

          if (updatePost.modifiedCount < 1) return false;

          return updatePost;
     }
}




export { Post }