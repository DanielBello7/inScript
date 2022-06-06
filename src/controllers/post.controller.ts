


// imports
import { DatabaseType } from '../types/Database.type';
import { Request, Response } from 'express';
import Log from '../config/bunyan.config';


class PostController {
     public conn;
     constructor(connection: DatabaseType) {
          this.conn = connection;
     }

     // create post
     NewPost = (req: Request, res: Response) => {}


     // delete post
     DeletePost = (req: Request, res: Response) => {}


     // get a single post
     GetSinglePost = (req: Request, res: Response) => {}


     // get a all post
     GetAllPosts = (req: Request, res: Response) => {}


     // get all the post for a user
     GetUserPosts = (req: Request, res: Response) => {}


     // like a post
     LikePost = (req: Request, res: Response) => {}


     // unlike a post
     UnlikePost = (req: Request, res: Response) => {}


     // repost a post
     RepostPost = (req: Request, res: Response) => {}


     // un-repost a post
     UnRepostPost = (req: Request, res: Response) => {}

}


// main export
export default PostController