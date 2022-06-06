


// imports
import express from "express";
import v2 from './v2/index.v2.routes';
import { 
     HandleGeneralError
} from '../middlewares/ErrorHandlers'

// create router
const router = express.Router();



// routes handles
export default () => {

     // this makes use of the jswt version of authentication
     router.use('/v2', v2());

     // route for catching errors
     router.get('/error', HandleGeneralError);

     // route for catching errors with a message
     router.get('/error/:errorMsg', HandleGeneralError);

     // main return
     return router;
}