


import { 
     DeleteComment, 
     GetAllComments, 
     GetUserComments, 
     PostComment 
} from '../../controllers/comment.controller';
import { authenticateToken } from '../../middlewares/authenticate';
import express from 'express';
import { check } from 'express-validator';


const router = express.Router();


export default () => {



     // this route gives all the comments associated with a particular post
     // ---[GET]
     router.get('/all-comments/:postID', authenticateToken, GetAllComments);




     // this route gives all the comments a user has made ---[GET]
     router.get('/user-comments/:userID', authenticateToken, GetUserComments);





     // this route posts a comment ---[POST]
     router.post('/new-comment', 
     [
          check('postID').trim().isString().escape().withMessage('post id required'),
          check('message').trim().isString().escape().withMessage('comment required')
     ], 
     authenticateToken, 
     PostComment);





     // this route handles deleting a comment ---[DELETE]
     // i dont think this route should even exist
     // router.delete('/delete-comment/:commentID', authenticateToken, DeleteComment);





     return router;
}