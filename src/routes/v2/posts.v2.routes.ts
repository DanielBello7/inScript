


// imports
import { 
     CreatePost, 
     GetAllUserPosts, 
     GetSinglePost, 
     LikePost,
     Repost,
     UnLikePost,
     UnRepost,
     GetAllPosts
} from '../../controllers/posts.controller';
import { authenticateToken } from '../../middlewares/authenticate';
import { check } from 'express-validator';
import express from 'express';



// create a router
const router = express.Router();




export default () => {



     // this gets a single post of any user from the id --- [GET]
     router.get('/get-post/:id', authenticateToken, GetSinglePost);




     // this gets all the posts of a user and returns --- [GET]
     router.get('/user-posts/:id', authenticateToken, GetAllUserPosts);



     
     // this creats a new post --- [POST]
     router.post('/create-text-post', 
     [ check('message').trim().escape() ], 
     authenticateToken,
     CreatePost);



     
     // this handles liking posts
     router.get('/like/post/:postID', authenticateToken, LikePost);




     // this handles unlikeing a post
     router.get('/unlike/post/:postID', authenticateToken, UnLikePost);




     // this handles reposting
     router.get('/repost/:postID', authenticateToken, Repost);



     
     // this handles un reposting
     router.get('/un-repost/:postID', authenticateToken, UnRepost);



     
     // this handles getting all the posts from all users
     router.get('/all/posts', authenticateToken, GetAllPosts);




     return router;
}