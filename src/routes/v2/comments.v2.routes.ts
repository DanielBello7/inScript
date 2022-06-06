


// imports
import CommentController from '../../controllers/comment.controller';
import { __verifyUser } from '../../middlewares/authenticate';
import { ValidateRequest } from '../../middlewares/ErrorHandlers';
import { check } from 'express-validator';
import express from 'express';
import { DatabaseType } from '../../types/Database.type';

// create router
const router = express.Router();


// main export
export default (conn: DatabaseType) => {

     const comment = new CommentController(conn);

     // route posts a comment ---[POST]
     router.post('/', 
     [
          check('postID').trim().isString().escape().withMessage('post id required'),
          check('message').trim().isString().escape().withMessage('comment required')
     ], 
     ValidateRequest,
     __verifyUser, 
     comment.PostComment);

     // route to get a particular comment --[GET]
     router.get('/:commentID', __verifyUser, comment.GetComment);

     // route for all comments of a particular post --[GET]
     router.get('/post/:postID', __verifyUser, comment.GetPostComments);

     // route for all single user comments ---[GET]
     router.get('/user/:userID', __verifyUser, comment.GetUserComments);

     // route to like a comment --[PUT]
     router.put('/like/:commentID', __verifyUser, comment.LikeComment);

     // route to repost a comment --[PUT]
     router.put('/repost/:commentID', __verifyUser, comment.RepostComment);

     // route to unlike a comment --[PATCH]
     router.patch('/unlike/:commentID', __verifyUser, comment.UnlikeComment);

     // route to un repost a comment --[PATCH]
     router.patch('/unrepost/:commentID', __verifyUser, comment.UnRepostComment);

     // route to delete a comment --[DELETE]
     router.delete('/:commentID', __verifyUser, comment.DeleteComment);

     // default return
     return router;
}