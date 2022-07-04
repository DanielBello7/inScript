


// imports
import ImageController from '../../controllers/image.controller';
import { __verifyUser } from '../../middlewares/authenticate';
import express from 'express';
import { DatabaseType } from '../../types/Database.type';
import { check } from 'express-validator';
import { ValidateRequest } from '../../middlewares/ErrorHandlers';


// create router
const router = express.Router();
 
// main export
export default (conn: DatabaseType) => {

     const image = new ImageController(conn);
    
     // route for uploading images --[POST]
     router.post('/', __verifyUser, image.PostImage);

     // route for uploading images using cloudinary --[POST]
     router.post('/cloudinary', 
     [
          check('image_file').isString(),
          check('name').isString().escape(),
          check('size').isNumeric().escape(),
          check('extension').isString().escape()
     ], 
     ValidateRequest,
     __verifyUser, 
     image.CloudinarySave);

     // route for sending image --[GET]
     router.get('/:img', __verifyUser, image.GetImage);

     // default return 
     return router;
}