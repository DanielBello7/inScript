


// imports 
import { Request, Response } from 'express';
import { Comment } from '../services/CommentService.service';
import { validationResult } from 'express-validator';
import Log from '../config/bunyan.config';




const CommentComponent = new Comment();




// this function returns all the comments from a particular post
async function GetAllComments(req: Request, res: Response) {


     try {

          throw new Error('not implemented');

     }
     catch (error) {
          Log.error(error);
          return res.json({msg: 'error'});
     }


}





// this function posts a comment
async function PostComment(req: Request, res: Response) {


     try {

          // checking if there are errors
          const errors = validationResult(req);
          
          if (!errors.isEmpty()) return res.send(errors.array());

          const user = req.user as any;

          const postID = req.body.postID;

          const message = req.body.message;

          const newComment = await CommentComponent.PostCommentForPost(postID, message, user._id);


          if (!newComment) return res.json({msg: 'error adding comment'});

          return res.json({success: 1, payload: newComment});

     }
     catch (error) {
          Log.error(error);
          return res.json({msg: 'error'});
     }

}





// function delets a comment
async function DeleteComment(req: Request, res: Response) {
     
     
     try {

          throw new Error('not implemented');

     }
     catch (error) {
          Log.error(error);
          return res.json({msg: 'error'});
     }

}





// function handles returning all the comments from a particualr user
async function GetUserComments(req: Request, res: Response) {


     try {

          throw new Error('not implemented');

     }
     catch (error) {
          Log.error(error);
          return res.json({msg: 'error'});
     }


}







export {
     GetAllComments,
     PostComment,
     DeleteComment,
     GetUserComments
}
