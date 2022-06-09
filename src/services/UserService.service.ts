


// imports 
import UserModel from "../models/User.models";



class User {
     constructor() {}


     // function to add a post to a user
     async AddPost(userID: string, postID: string) {


          const updateUser = await UserModel.updateOne(
               { _id: userID }, 
               { $push: {posts: postID} }
          );

          if (updateUser.modifiedCount <= 0) return false;

          return updateUser;
     }


     // this removes a post from a user
     async RemovePost(userID: string, postID: string) {

          const updateUser = await UserModel.updateOne(
               { _id: userID }, 
               { $pull: {posts: postID} }
          );

          if (updateUser.modifiedCount <= 0) return false;

          return updateUser
     }

     
     // gets all of a particular users post
     async GetUserPosts(email: string) {


          // const selectedUser = await UserModel.findById(userID).populate('posts');

          // to populate inside another populate layer you do
          const selectedUser = await UserModel.findOne({email: email}).populate({
               path: 'posts',
               populate: { path: 'createdBy' }
          });

          return selectedUser.posts;
     }


     // this handles adding a liked post to a user database
     async AddLikedPost(userID: string, postID: string) {

          const updateUser = await UserModel.updateOne(
               { _id: userID },
               { $push: {likedPosts: postID} }
          )

          if (updateUser.modifiedCount < 1) return false;

          return updateUser
     }



     // this handles removing a post from a user liked posts
     async RemoveLikedPost(userID: string, postID: string) {

          const updateUser = await UserModel.updateOne(
               { _id: userID },
               { $pull: {likedPosts: postID} }
          )

          if (updateUser.modifiedCount < 1) return false;

          return updateUser

     }



     // this handles adding a post to a users reposts
     async AddReposts(userID: string, postID: string) {

          const updateUser = await UserModel.updateOne(
               { _id: userID },
               { $push: {repostedPosts: postID} }
          )

          if (updateUser.modifiedCount < 1) return false;

          return updateUser;

     }



     // this handles removing a post from a users reposts
     async RemoveReposts(userID: string, postID: string) {

          const updateUser = await UserModel.updateOne(
               { _id: userID },
               { $pull: {repostedPosts: postID} }
          )

          if (updateUser.modifiedCount < 1) return false;

          return updateUser;
     }




     // this function handles the adding of comments to a user comments
     async AddNewComment(commentID: string, userID: string) {


          const updateUser = await UserModel.updateOne(
               {_id: userID},
               { $push: {comments: commentID} }
          );

          if (updateUser.modifiedCount < 1) return false;

          return updateUser;
     }
}



export { User }