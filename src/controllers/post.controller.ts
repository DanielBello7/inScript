


// imports
import { DatabaseType } from '../types/Database.type';
import { RequestInterface } from '../types/UserType.type';
import { Request, Response } from 'express';
import Log from '../config/bunyan.config';


class PostController {
     public conn;
     constructor(connection: DatabaseType) {
          this.conn = connection;
     }

     // create post 
     // gets message from body
     // gets user from req.user
     NewPost = (req: RequestInterface, res: Response) => {}


     // delete post
     // gets user from req.user
     // uses :postID
     DeletePost = (req: RequestInterface, res: Response) => {}


     // get a single post
     // gets user from req.user
     // uses :postID
     GetSinglePost = (req: RequestInterface, res: Response) => {}


     // get a all post
     GetAllPosts = (req: RequestInterface, res: Response) => {}


     // get all the post for a user
     // gets user from req.user
     // uses :userID
     GetUserPosts = (req: RequestInterface, res: Response) => {}


     // like a post
     // gets user from req.user
     // uses :postID
     LikePost = (req: RequestInterface, res: Response) => {}


     // unlike a post
     // uses :postID
     UnlikePost = (req: RequestInterface, res: Response) => {}


     // repost a post
     // gets user from req.user
     // uses :postID
     RepostPost = (req: RequestInterface, res: Response) => {}


     // un-repost a post
     // gets user from req.user
     // uses :postID
     UnRepostPost = (req: Request, res: Response) => {}

}


// main export
export default PostController