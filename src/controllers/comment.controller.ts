


// imports
import { Request, Response } from 'express';
import Log from "../config/bunyan.config";


// new comment
function PostComment(req: Request, res: Response) {}


// retrieve a particular comment
function GetComment(req: Request, res: Response) {}


// get all the comments from a user
function GetUserComments(req: Request, res: Response) {}


// get comments for a particuar post
function GetPostComments(req: Request, res: Response) {}


// delete a particular comment
function DeleteComment(req: Request, res: Response) {}


// like a comment
function LikeComment(req: Request, res: Response) {}


// unlike a comment
function UnlikeComment(req: Request, res: Response) {}


// repost a comment
function RepostComment(req: Request, res: Response) {}


// un-repost a comment
function UnRepostComment(req: Request, res: Response){}


// main exports
export {
     PostComment,
     GetComment,
     GetUserComments,
     GetPostComments,
     DeleteComment,
     LikeComment,
     UnlikeComment,
     RepostComment,
     UnRepostComment
}