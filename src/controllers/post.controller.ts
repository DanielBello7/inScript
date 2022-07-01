


import { DatabaseType } from '../types/Database.type';
import { RequestInterface } from '../types/UserType.type';
import { Response } from 'express';
import { NewPostType } from '../types/PostType.type';
import Log from '../config/bunyan.config';


class PostController {
     public conn;
     constructor(connection: DatabaseType) {
          this.conn = connection;
     }

     NewPost = async (req: RequestInterface, res: Response) => {

          const newPost: NewPostType = {
               createdBy: req.user._id,
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

               const response = await this.conn.GetAllPost(page?page:1, limit?limit:5);

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

          try {

               const response = await this.conn.GetUserPosts(user, page?page:1, limit?limit:1)

               return res.json({payload: response});

          } catch (error: any) {
               Log.error(error);
               return res.status(500).json({msg: error.message});
          }
     }

     DeletePost = async (req: RequestInterface, res: Response) => {

          const postID = req.params.postID;

          try {

               const response = await this.conn.DeletePost(postID, req.user._id);

               if (!response) return res.status(400).json({msg: 'error deleting post'});

               return res.json({msg: 'post deleted', success: 1});
               
          } catch (error: any) {
               Log.error(error);
               return res.status(500).json({msg: error.message});
          }
     }

     LikePost = async (req: RequestInterface, res: Response) => {

          const postID = req.params.postID;

          try {

               const response = await this.conn.LikePost(postID, req.user._id);

               if (!response) return res.status(400).json({msg: 'error liking post'});

               return res.json({msg: 'successful', success: 1});
               
          } catch (error: any) {
               Log.error(error);
               return res.status(500).json({msg: error.message});
          }
     }

     UnlikePost = async (req: RequestInterface, res: Response) => {

          const postID = req.params.postID;

          try {

               const response = await this.conn.UnlikePost(postID, req.user._id);

               if (!response) return res.status(400).json({msg: 'error unliking post'});

               return res.json({msg: 'successful', success: 1});
               
          } catch (error: any) {
               Log.error(error);
               return res.status(500).json({msg: error.message});
          }
     }

     RepostPost = async (req: RequestInterface, res: Response) => {

          const postID = req.params.postID;

          try {

               const response = await this.conn.RepostPost(postID, req.user._id);

               if (!response) return res.status(400).json({msg: 'error reposting'});

               return res.json({msg: 'repost successful', success: 1});
               
          } catch (error: any) {
               Log.error(error);
               return res.status(500).json({msg: error.message});
          }
     }

     UnRepostPost = async (req: RequestInterface, res: Response) => {

          const postID = req.params.postID;

          try {

               const response = await this.conn.UnRepostPost(postID, req.user._id);

               if (!response) return res.status(400).json({msg: 'error unreposting'});

               return res.json({msg: 'successful', success: 1});
               
          } catch (error: any) {
               Log.error(error);
               return res.status(500).json({msg: error.message});
          }
     }

}


// main export
export default PostController