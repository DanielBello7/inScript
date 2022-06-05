


// imports
import { GetImage, UploadImage} from '../../controllers/upload.controller';
import { authenticate } from '../../middlewares/authenticate';
import express from 'express';

const router = express.Router();



export default () => {
  


  
  
  // handles sending of image files from the server ---- [GET]
  router.get('/:img', authenticate, GetImage);

  
  
  
  
  // handles uploading of only images to the server ---- [POST]
  router.post('/upload', authenticate, UploadImage);

  
  
  
  
  
  return router;
}