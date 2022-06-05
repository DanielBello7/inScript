


// imports
import express from "express";
import img from "./imageUpload.v1.routes";
import auth from './auth.v1.routes';




const router = express.Router();




// routes handles
export default () => {

     router.use('/auth', auth());


     router.use('/img', img());


     return router;
}