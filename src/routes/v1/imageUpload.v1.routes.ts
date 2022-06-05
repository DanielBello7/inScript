


// imports
import { 
     GetImage, 
     UploadImage 
} from '../../controllers/upload.controller';
import { authenticate } from '../../middlewares/authenticate';
import express from 'express';

// create router
const router = express.Router();


// main export
export default () => {
     
     // route for getting images ---[GET]
     router.get('/:img', authenticate, GetImage);   
     
     
     // route for uploading ---[POST]
     router.post('/upload', authenticate, UploadImage);


     return router;
}