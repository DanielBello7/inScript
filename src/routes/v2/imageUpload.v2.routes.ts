


// imports
import { 
     GetImage, 
     PostImage
} from '../../controllers/image.controller';
import { __verifyUser } from '../../middlewares/authenticate';
import express from 'express';
import { DatabaseType } from '../../types/Database.type';


// create router
const router = express.Router();

// main export
export default (conn: DatabaseType) => {
    
     // route for uploading images --[POST]
     router.post('/', __verifyUser, PostImage);

     // route for sending image --[GET]
     router.get('/:img', __verifyUser, GetImage);

     // default return 
     return router;
}