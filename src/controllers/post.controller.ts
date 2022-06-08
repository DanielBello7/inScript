


// imports
import { DatabaseType } from '../types/Database.type';
import { RequestInterface } from '../types/UserType.type';
import { Request, Response } from 'express';
import Log from '../config/bunyan.config';
import { NewPostType } from '../types/PostType.type';


class PostController {
     public conn;
     constructor(connection: DatabaseType) {
          this.conn = connection;
     }

     // create post 
     // gets message from body
     // gets user from req.user
     NewPost = async (req: RequestInterface, res: Response) => {

          const newPost: NewPostType = {
               createdBy: req.user.email,
               postType: req.body.postType,
               text: req.body.text,
               likes: 0,
               reposts: 0
          }

          try {

               const response = await this.conn.NewPost(newPost);

               if (!response) return res.status(400).json({msg: 'error making post'});

               return res.json({payload: response});

          } catch (error: any) {
               Log.error(error);
               return res.status(500).json({msg: error.message});
          }
     }


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