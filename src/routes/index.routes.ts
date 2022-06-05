


// imports
import express from "express";
import v1 from './v1/index.v1.routes';
import v2 from './v2/index.v2.routes';
import { Handle404, HandleGeneralError } from '../controllers/error.controller';




const router = express.Router();




// routes handles
export default () => {


     // this makes use of the regular paspport login system with express
     router.use('/v1', v1());



     // this makes use of the jswt version of authentication
     router.use('/v2', v2());



     router.get('/error/:info', HandleGeneralError);
     


     router.use(Handle404);


  return router;
}