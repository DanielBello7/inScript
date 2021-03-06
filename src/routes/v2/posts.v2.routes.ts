


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
          check('text').trim().isString(),
          check('media').isString().trim(),
          check('postType').isString().trim().escape(),
          check('createdBy').isString().trim().escape()
     ], 
     ValidateRequest,
     __verifyUser,
     post.NewPost);

     // route for all posts --[GET]
     router.get('/', __verifyUser, post.GetAllPosts);

     // route for getting a random post
     router.get('/preference', __verifyUser, post.GetRandomPost);

     // route for getting single post --[GET]
     router.get('/:postID', __verifyUser, post.GetSinglePost);

     // route for all posts of a user --[GET]
     router.get('/user/:userID', __verifyUser, post.GetUserPosts);

     // route for all liked posts of a user --[GET]
     router.get('/user/liked/:userID', __verifyUser, post.GetUserLikedPosts);

     // route for all reposted posts of a user --[GET]
     router.get('/user/reposted/:userID', __verifyUser, post.GetUserRepostedPosts);

     // route for liking posts --[PUT]
     router.put('/like/:postID', __verifyUser, post.LikePost);

     // route for unliking a post --[PUT]
     router.put('/unlike/:postID', __verifyUser, post.UnlikePost);

     // route for reposting --[PUT]
     router.put('/repost/:postID', __verifyUser, post.RepostPost);
     
     // route for un-reposting --[PUT]
     router.put('/unrepost/:postID', __verifyUser, post.UnRepostPost);

     // default return
     return router;
}