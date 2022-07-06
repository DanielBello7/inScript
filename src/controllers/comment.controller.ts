


// imports
import { DatabaseType } from '../types/Database.type';
import { Response } from 'express';
import { RequestInterface } from '../types/UserType.type';
import { NewComment } from '../types/CommentType.type';
import Log from "../config/bunyan.config";



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

}



// main exports
export default CommentController