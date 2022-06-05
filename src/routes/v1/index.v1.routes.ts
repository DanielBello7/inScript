


// imports
import img from "./imageUpload.v1.routes";
import express from "express";
import auth from './auth.v1.routes';

// create router
const router = express.Router();

// main export
export default () => {

     // route for authorization
     router.use('/auth', auth());


     // route for uploads
     router.use('/img', img());


     // return
     return router;
}