


// imports
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { User } from '../services/UserService.service';
import { Post } from '../services/PostService.service';
import mongoose from 'mongoose';
import Log from '../config/bunyan.config';




// an instance of the post class
const Posts = new Post();

// an instance of the user class
const NewUser = new User();




// gets a single post ---[GET]
async function GetSinglePost(req: Request, res: Response) {

     try {


          const selectedPost = req.params.id;
          
          const response = await Posts.GetSinglePost(selectedPost);

          if (!response) return res.json({msg: 'post not found'});

          return res.json({success: 1, payload: response});

     }
     catch (error) {
          Log.error(error);
          return res.json({msg: 'error'})
     }

}




// function to get all the posts of a user ---[GET]
async function GetAllUserPosts(req: Request, res: Response) {

     try {

          const id = req.params.id;

          const allPosts = await NewUser.GetUserPosts(id);

          return res.json({success: 1, payload: allPosts});
     }
     catch (error) {

          Log.error(error);
          return res.json({msg: 'error'});

     }

}




// function to create a post ---[POST]
async function CreatePost(req: Request, res: Response) {
     

     try {

          // checking if there are errors
          const errors = validationResult(req);
          
          if (!errors.isEmpty()) return res.send(errors.array());



          // setting the values from the request body
          const message = req.body.message;
          
          const { iat, exp, ...user } = req.user as any;

          const uploadPost = await Posts.AddTextPost(message, user._id);

          if (!uploadPost) return res.json({msg: 'error saving post'});

          return res.json({success: 1, msg: 'post uploaded', payload: uploadPost});

     }
     catch (error) {

          Log.error(error);
          return res.json({msg: 'error'});

     }
}




// function to like a post ---[GET]
async function LikePost(req: Request, res: Response) {

     try {

          const postID = req.params.postID;

          const user = req.user as any;

          if (!mongoose.isValidObjectId(postID)) 
               return res.json({success: 0, msg: 'invalid post-id'});

          const handleOperation = await Posts.LikePost(postID, user._id);

          if (!handleOperation) return res.json({msg: 'error liking post'});

          return res.json({success: 1, payload: handleOperation});

     }
     catch (error) {

          Log.error(error);
          return res.json({msg: 'error'});

     }
}




// function to unlike a post ---[GET]
async function UnLikePost(req: Request, res: Response) {

     try {
     
          const postID = req.params.postID;

          const user = req.user as any;

          if (!mongoose.isValidObjectId(postID)) 
               return res.json({success: 0, msg: 'invalid post-id'});

          const handleOperation = await Posts.DisLikePost(postID, user._id);

          if (!handleOperation) return res.json({msg: 'error handling post'});

          return res.json({success: 1, payload: handleOperation});

     }
     catch (error) {

          Log.error(error);
          return res.json({msg: 'error'});

     }
}




// function to make a repost
async function Repost(req: Request, res: Response) {

     try {

          const postID = req.params.postID;

          const user = req.user as any;
     
          if (!mongoose.isValidObjectId(postID)) 
               return res.json({success: 0, msg: 'invalid post-id'});
     
          const handleOperation = await Posts.Repost(postID, user._id);
     
          if (!handleOperation) return res.json({msg: 'error making repost'});
     
          return res.json({success: 1, payload: handleOperation});


     }
     catch (error) {
          Log.error(error);
          return res.json({msg: 'error'})
     }

}




// function to undo a repost
async function UnRepost(req: Request, res: Response) {

     try {

          const postID = req.params.postID;

          const user = req.user as any;
     
          if (!mongoose.isValidObjectId(postID)) 
               return res.json({success: 0, msg: 'invalid post-id'});
     
          const handleOperation = await Posts.UnRepost(postID, user._id);
     
          if (!handleOperation) return res.json({msg: 'error handling repost'});
     
          return res.json({success: 1, payload: handleOperation});

     }
     catch (error) {

          Log.error(error)
          return res.json({msg: 'error'});
          
     }
}




// function to handle all posts
async function GetAllPosts(req: Request, res: Response) {
     try {

          const posts = await Posts.GetAllPosts();

          return res.json({success: 1, payload: posts});
     
     }
     catch(error) {
          Log.error(error);
          return res.json({msg: 'error'})
     }
}



// exports
export { 
     GetSinglePost,
     GetAllUserPosts,
     CreatePost,
     LikePost,
     UnLikePost,
     Repost,
     UnRepost,
     GetAllPosts
}