


import { DatabaseType } from '../types/Database.type';
import { RequestInterface } from '../types/UserType.type';
import { Request, Response } from 'express';
import { NewPostType } from '../types/PostType.type';
import Log from '../config/bunyan.config';


class PostController {
     public conn;
     constructor(connection: DatabaseType) {
          this.conn = connection;
     }

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

     GetSinglePost = async (req: RequestInterface, res: Response) => {

          const postID = req.params.postID;

          try {

               const response = await this.conn.GetPost(postID);

               return res.json({payload: response});

          } catch (error: any) {
               Log.error(error);
               return res.status(500).json({msg: error.message});
          }
     }

     GetAllPosts = async (req: RequestInterface, res: Response) => {

          const page = parseInt(req.query.page as string);
          const limit = parseInt(req.query.limit as string);

          try {

               const response = await this.conn.GetAllPost(page?page:1, limit?limit:1);

               return res.json({payload: response});

          } catch (error: any) {
               Log.error(error);
               return res.status(500).json({msg: error.message});
          }
     }

     GetUserPosts = async (req: RequestInterface, res: Response) => {

          const user = req.params.userID;

          const page = parseInt(req.query.page as string);

          const limit = parseInt(req.query.limit as string);

          if (!user) return res.status(400).json({msg: 'user id required'});

          try {

               const response = await this.conn.GetUserPosts(user, page?page:1, limit?limit:1)

               return res.json({payload: response});

          } catch (error: any) {
               Log.error(error);
               return res.status(500).json({msg: error.message});
          }
     }

     DeletePost = (req: RequestInterface, res: Response) => {}

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