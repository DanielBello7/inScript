


// imports
import { DatabaseType } from '../types/Database.type';
import { Request, Response } from 'express';
import Log from "../config/bunyan.config";



class CommentController {
     public conn;
     constructor(connection: DatabaseType) {
          this.conn = connection;
     }

     // new comment
     PostComment(req: Request, res: Response) {}


     // retrieve a particular comment
     GetComment(req: Request, res: Response) {}


     // get all the comments from a user
     GetUserComments(req: Request, res: Response) {}


     // get comments for a particuar post
     GetPostComments(req: Request, res: Response) {}


     // delete a particular comment
     DeleteComment(req: Request, res: Response) {}


     // like a comment
     LikeComment(req: Request, res: Response) {}


     // unlike a comment
     UnlikeComment(req: Request, res: Response) {}


     // repost a comment
     RepostComment(req: Request, res: Response) {}


     // un-repost a comment
     UnRepostComment(req: Request, res: Response) {}


}



// main exports
export default CommentController