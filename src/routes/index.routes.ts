


// imports
import express from "express";
import v2 from './v2/index.v2.routes';
import { HandleGeneralError } from '../middlewares/ErrorHandlers'
import { DatabaseType } from "../types/Database.type";

// create router
const router = express.Router();



// routes handles
export default (conn: DatabaseType) => {

     // this makes use of the jswt version of authentication
     router.use('/v2', v2(conn));

     // route for catching errors
     router.get('/error', HandleGeneralError);

     // route for catching errors with a message
     router.get('/error/:errorMsg', HandleGeneralError);

     // main return
     return router;
}