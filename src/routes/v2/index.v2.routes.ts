


// imports
import comments from './comments.v2.routes';
import img from "./imageUpload.v2.routes";
import users from './users.v2.routes';
import posts from './posts.v2.routes';
import auth from './auth.v2.routes';
import express from "express";
import { DatabaseType } from '../../types/Database.type';


// create router
const router = express.Router();


// main export
export default (conn: DatabaseType) => {

     // router for authorization
     router.use('/auth', auth(conn));

     // router for users
     router.use('/users', users(conn));

     // router for images
     router.use('/imgs', img(conn));

     // router for posts
     router.use('/posts', posts(conn));

     // router for comments
     router.use('/comments', comments(conn));

     // default return
     return router;
}