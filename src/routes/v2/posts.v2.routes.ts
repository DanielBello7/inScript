


// imports
import { ValidateRequest } from '../../middlewares/ErrorHandlers';
import PostController from '../../controllers/post.controller';
import { __verifyUser } from '../../middlewares/authenticate';
import { DatabaseType } from '../../types/Database.type';
import { check } from 'express-validator';
import express from 'express';


// create a router
const router = express.Router();


// default return
export default (conn: DatabaseType) => { 

     const post = new PostController(conn);

     // this creats a new post ---[POST]
     router.post('/', 
     [ 
          check('message').trim().escape() 
     ], 
     ValidateRequest,
     __verifyUser,
     post.NewPost);

     // route for all posts --[GET]
     router.get('/', __verifyUser, post.GetAllPosts);

     // route for getting single post --[GET]
     router.get('/:postID', __verifyUser, post.GetSinglePost);

     // route for all posts of a user --[GET]
     router.get('/users/:userID', __verifyUser, post.GetUserPosts);

     // route for liking posts --[PUT]
     router.put('/like/:postID', __verifyUser, post.LikePost);

     // route for unliking a post --[PUT]
     router.put('/unlike/:postID', __verifyUser, post.UnlikePost);

     // route for reposting --[PUT]
     router.put('/repost/:postID', __verifyUser, post.RepostPost);
     
     // route for un-reposting --[PUT]
     router.put('/unrepost/:postID', __verifyUser, post.UnRepostPost);

     // route for deleting post
     router.delete('/:postID', __verifyUser, post.DeletePost);

     // default return
     return router;
}