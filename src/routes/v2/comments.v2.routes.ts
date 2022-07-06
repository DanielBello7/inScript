


// imports
import CommentController from '../../controllers/comment.controller';
import { __verifyUser } from '../../middlewares/authenticate';
import { ValidateRequest } from '../../middlewares/ErrorHandlers';
import { DatabaseType } from '../../types/Database.type';
import { check } from 'express-validator';
import express from 'express';

// create router
const router = express.Router();


// main export 
export default (conn: DatabaseType) => {

     const comment = new CommentController(conn);

     // route posts a comment ---[POST]
     router.post('/', 
     [
          check('for').trim().isString().escape().withMessage('post id required'),
          check('text').trim().isString().escape().withMessage('comment required'),
          check('type').trim().isString().escape().withMessage('comment required')
     ], 
     ValidateRequest,
     __verifyUser, 
     comment.PostComment);

     // route to get a particular comment --[GET]
     router.get('/:commentID', __verifyUser, comment.GetComment);

     // route for all comments of a particular post --[GET]
     router.get('/post/:postID', __verifyUser, comment.GetPostComments);

     // route for all comments of a particular comment --[GET]
     router.get('/comment/:commentID', __verifyUser, comment.GetAllCommentsForComment);

     // default return
     return router;
}