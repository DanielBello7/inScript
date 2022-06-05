


// imports
import { 
     GetImage, 
     PostImage
} from '../../controllers/image.controller';
import { __verifyUser } from '../../middlewares/authenticate';
import express from 'express';


// create router
const router = express.Router();

// main export
export default () => {
    
     // route for uploading images ---[POST]
     router.post('/', __verifyUser, PostImage);

     // route for sending image ---[GET]
     router.get('/:img', __verifyUser, GetImage);

     // default return 
     return router;
}