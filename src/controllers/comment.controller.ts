


// imports
import { DatabaseType } from '../types/Database.type';
import { Response } from 'express';
import { RequestInterface } from '../types/UserType.type';
import Log from "../config/bunyan.config";



class CommentController {
     public conn;
     constructor(connection: DatabaseType) {
          this.conn = connection;
     } 

     // new comment
     // gets postID and message from body
     // gets user from req.user
     PostComment = (req: RequestInterface, res: Response) => {}


     // retrieve a particular comment
     // uses :commentID
     GetComment = (req: RequestInterface, res: Response) => {}


     // get all the comments from a user
     // uses :userID
     GetUserComments = (req: RequestInterface, res: Response) => {}


     // get comments for a particuar post
     // uses :postID
     GetPostComments = (req: RequestInterface, res: Response) => {}


     // delete a particular comment
     // uses :commentID
     DeleteComment = (req: RequestInterface, res: Response) => {}


     // like a comment
     // gets user from req.user
     // uses :commentID
     LikeComment = (req: RequestInterface, res: Response) => {}


     // unlike a comment
     // gets user from req.user
     // uses :commentID
     UnlikeComment = (req: RequestInterface, res: Response) => {}


     // repost a comment
     // gets user from req.user
     // uses :commentID
     RepostComment = (req: RequestInterface, res: Response) => {}


     // un-repost a comment
     // gets user from req.user
     // uses :commentID
     UnRepostComment = (req: RequestInterface, res: Response) => {}


}



// main exports
export default CommentController