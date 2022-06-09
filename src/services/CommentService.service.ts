


import CommentModel from "../models/Comments.models";
import { Post } from "./PostService.service";
import { User } from "./UserService.service";




// new post class instance
const NewPost = new Post();


// new user class instance
const NewUser = new User();


class Comment {
     

     constructor() {}


     // function handling getting all the comments from a particualr user
     async GetAllComments() {}



     // function handling the posting of comments
     async PostCommentForPost(postID: string, text: string, userID: string) {

          const newComment = new CommentModel({
               text: text,
               for: postID,
               createdBy: userID
          });

          const comment = await newComment.save();

          const commentID = comment._id as string;

          const updateUser = await NewUser.AddNewComment(commentID, userID);

          if (!updateUser) return false;

          const updatePost = await NewPost.AddNewComment(commentID, postID);

          if (!updatePost) return false;

          return comment;
     }
}


export { Comment }