


// imports
import { Request, Response } from 'express';
import Log from '../config/bunyan.config';


// create post
function NewPost(req: Request, res: Response) {}


// delete post
function DeletePost(req: Request, res: Response) {}


// get a single post
function GetSinglePost(req: Request, res: Response) {}


// get all the post for a user
function GetUserPosts(req: Request, res: Response) {}


// like a post
function LikePost(req: Request, res: Response) {}


// unlike a post
function UnlikePost(req: Request, res: Response) {}


// repost a post
function RepostPost(req: Request, res: Response) {}


// un-repost a post
function UnRepostPost(req: Request, res: Response) {}


// main export
export {
     NewPost,
     DeletePost,
     GetSinglePost,
     GetUserPosts,
     LikePost,
     UnlikePost,
     RepostPost,
     UnRepostPost
}