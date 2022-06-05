


// imports
import express from "express";
import img from "./imageUpload.v2.routes";
import auth from './auth.v2.routes';
import posts from './posts.v2.routes';
import comments from './comments.v2.routes';


const router = express.Router();




// routes handles
export default () => {


     router.use('/auth', auth());


     router.use('/img', img());


     router.use('/posts', posts());


     router.use('/comments', comments());


  return router;
}