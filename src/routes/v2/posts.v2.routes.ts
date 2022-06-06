


// imports
import { 
     DeletePost,
     GetSinglePost,
     GetUserPosts,
     LikePost,
     NewPost,
     GetAllPosts,
     RepostPost,
     UnRepostPost,
     UnlikePost
} from '../../controllers/post.controller';
import { __verifyUser } from '../../middlewares/authenticate';
import { ValidateRequest } from '../../middlewares/ErrorHandlers';
import { check } from 'express-validator';
import express from 'express';
import { DatabaseType } from '../../types/Database.type';


// create a router
const router = express.Router();


// default return
export default (conn: DatabaseType) => {

     // this creats a new post ---[POST]
     router.post('/', 
     [ 
          check('message').trim().escape() 
     ], 
     ValidateRequest,
     __verifyUser,
     NewPost);

     // route for all posts --[GET]
     router.get('/', __verifyUser, GetAllPosts);

     // route for getting single post --[GET]
     router.get('/:id', __verifyUser, GetSinglePost);

     // route for all posts of a user --[GET]
     router.get('/users/:id', __verifyUser, GetUserPosts);

     // route for liking posts --[PUT]
     router.put('/like/:postID', __verifyUser, LikePost);

     // route for unliking a post --[PUT]
     router.put('/unlike/:postID', __verifyUser, UnlikePost);

     // route for reposting --[PUT]
     router.put('/repost/:postID', __verifyUser, RepostPost);
     
     // route for un-reposting --[PUT]
     router.put('/unrepost/:postID', __verifyUser, UnRepostPost);

     // route for deleting post
     router.delete('/:postID', __verifyUser, DeletePost);

     // default return
     return router;
}