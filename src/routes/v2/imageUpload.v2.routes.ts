


// imports
import ImageController from '../../controllers/image.controller';
import { __verifyUser } from '../../middlewares/authenticate';
import express from 'express';
import { DatabaseType } from '../../types/Database.type';


// create router
const router = express.Router();

// main export
export default (conn: DatabaseType) => {

     const image = new ImageController(conn);
    
     // route for uploading images --[POST]
     router.post('/', __verifyUser, image.PostImage);

     // route for sending image --[GET]
     router.get('/:img', __verifyUser, image.GetImage);

     // default return 
     return router;
}