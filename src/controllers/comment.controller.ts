


// imports
import { DatabaseType } from '../types/Database.type';
import { Response } from 'express';
import { RequestInterface } from '../types/UserType.type';
import Log from "../config/bunyan.config";
import { NewComment } from '../types/CommentType.type';



class CommentController {
     public conn;
     constructor(connection: DatabaseType) {
          this.conn = connection;
     } 

     
     PostComment = async (req: RequestInterface, res: Response) => {

          const newComment: NewComment = {
               createdBy: req.user._id,
               for: req.body.for,
               text: req.body.text
          }

          try {

               const response = await this.conn.CreateComment(newComment, req.body.type);

               return res.json({payload: response});

          } catch (error: any) {
               Log.error(error);
               return res.status(500).json({msg: error.message})
          }
     }


     
     GetComment = async (req: RequestInterface, res: Response) => {

          const commentID = req.params.commentID;

          try {

               const response = await this.conn.GetComment(commentID);

               return res.json({payload: response});

          } catch (error: any) {
               Log.error(error);
               return res.status(500).json({msg: error.message})
          }
     }


     
     GetUserComments = async (req: RequestInterface, res: Response) => {

          const user = req.params.userID;

          const page = parseInt(req.query.page as string);

          const limit = parseInt(req.query.limit as string);

          try {

               const response = await this.conn.GetUserComments(user, page?page:1, limit?limit:1);

               return res.json({payload: response});

          } catch (error: any) {
               Log.error(error);
               return res.status(500).json({msg: error.message})
          }
     }


     
     GetPostComments = async (req: RequestInterface, res: Response) => {

          const postID = req.params.postID;

          const page = parseInt(req.query.page as string);

          const limit = parseInt(req.query.limit as string);

          try {

               const response = await this.conn.GetPostComments(postID, page?page:1, limit?limit:5);

               return res.json({payload: response});


          } catch (error: any) {
               Log.error(error);
               return res.status(500).json({msg: error.message})
          }
     }


     GetAllCommentsForComment = async (req: RequestInterface, res: Response) => {
          const commentID = req.params.commentID;

          const page = parseInt(req.query.page as string);

          const limit = parseInt(req.query.limit as string);

          try {

               const response = await this.conn.GetCommentComments(commentID, page?page:1, limit?limit:5);

               return res.json({payload: response});


          } catch (error: any) {
               Log.error(error);
               return res.status(500).json({msg: error.message})
          }
     }


     // delete a particular comment
     // uses :commentID
     DeleteComment = async (req: RequestInterface, res: Response) => {

          const commentID = req.params.commentID;

          const user = req.user.email;

          try {

               const response = await this.conn.DeleteComment(commentID, user);

               if (!response) return res.status(400).json({msg: 'error deleting comment'});

               return res.json({msg: 'comment deleted', success: 1});

          } catch (error: any) {
               Log.error(error);
               return res.status(500).json({msg: error.message})
          }
     }


     // like a comment
     // gets user from req.user
     // uses :commentID
     LikeComment = async (req: RequestInterface, res: Response) => {

          const commentID = req.params.commentID;

          const user = req.user.email;

          try {

               const response = await this.conn.LikeComment(commentID, user);

               if (!response) return res.status(400).json({msg: 'error liking comment'});

               return res.json({msg: 'comment liked', success: 1});

          } catch (error: any) {
               Log.error(error);
               return res.status(500).json({msg: error.message})
          }
     }


     // unlike a comment
     // gets user from req.user
     // uses :commentID
     UnlikeComment = async (req: RequestInterface, res: Response) => {

          const commentID = req.params.commentID;

          const user = req.user.email;

          try {

               const response = await this.conn.UnLikeComment(commentID, user);

               if (!response) return res.status(400).json({msg: 'error making changes'});

               return res.json({msg: 'change successful', success: 1});


          } catch (error: any) {
               Log.error(error);
               return res.status(500).json({msg: error.message})
          }
     }


     // repost a comment
     // gets user from req.user
     // uses :commentID
     RepostComment = async (req: RequestInterface, res: Response) => {

          const commentID = req.params.commentID;

          const user = req.user.email;

          try {

               const response = await this.conn.RepostComment(commentID, user);

               if (!response) return res.status(400).json({msg: 'error reposting comment'});

               return res.json({msg: 'repost successful', success: 1});


          } catch (error: any) {
               Log.error(error);
               return res.status(500).json({msg: error.message})
          }
     }


     // un-repost a comment
     // gets user from req.user
     // uses :commentID
     UnRepostComment = async (req: RequestInterface, res: Response) => {
          
          const commentID = req.params.commentID;

          const user = req.user.email;

          try {

               const response = await this.conn.UnRepostComment(commentID, user);

               if (!response) return res.status(400).json({msg: 'error making change'});

               return res.json({msg: 'change successful', success: 1});
               

          } catch (error: any) {
               Log.error(error);
               return res.status(500).json({msg: error.message})
          }
     }

}



// main exports
export default CommentController