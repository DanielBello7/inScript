


// imports
import comments from './comments.v2.routes';
import img from "./imageUpload.v2.routes";
import users from './users.v2.routes';
import posts from './posts.v2.routes';
import auth from './auth.v2.routes';
import express from "express";


// create router
const router = express.Router();


// main export
export default () => {

     // router for authorization
     router.use('/auth', auth());

     // router for users
     router.use('/users', users());

     // router for images
     router.use('/imgs', img());

     // router for posts
     router.use('/posts', posts());

     // router for comments
     router.use('/comments', comments());

     // default return
     return router;
}