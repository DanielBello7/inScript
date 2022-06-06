


// imports
import { 
     GetComment,
     DeleteComment,
     GetPostComments,
     GetUserComments,
     LikeComment,
     PostComment,
     RepostComment,
     UnRepostComment,
     UnlikeComment
} from '../../controllers/comment.controller';
import { __verifyUser } from '../../middlewares/authenticate';
import { ValidateRequest } from '../../middlewares/ErrorHandlers';
import { check } from 'express-validator';
import express from 'express';
import { DatabaseType } from '../../types/Database.type';

// create router
const router = express.Router();


// main export
export default (conn: DatabaseType) => {

     // route posts a comment ---[POST]
     router.post('/', 
     [
          check('postID').trim().isString().escape().withMessage('post id required'),
          check('message').trim().isString().escape().withMessage('comment required')
     ], 
     ValidateRequest,
     __verifyUser, 
     PostComment);

     // route to get a particular comment --[GET]
     router.get('/:commentID', __verifyUser, GetComment);

     // route for all comments of a particular post --[GET]
     router.get('/post/:postID', __verifyUser, GetPostComments);

     // route for all single user comments ---[GET]
     router.get('/user/:userID', __verifyUser, GetUserComments);

     // route to like a comment --[PUT]
     router.put('/like/:commentID', __verifyUser, LikeComment);

     // route to repost a comment --[PUT]
     router.put('/repost/:commentID', __verifyUser, RepostComment);

     // route to unlike a comment --[PATCH]
     router.patch('/unlike/:commentID', __verifyUser, UnlikeComment);

     // route to un repost a comment --[PATCH]
     router.patch('/unrepost/:commentID', __verifyUser, UnRepostComment);

     // route to delete a comment --[DELETE]
     router.delete('/:commentID', __verifyUser, DeleteComment);

     // default return
     return router;
}