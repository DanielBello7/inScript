


// imports
import {
     CurrentUser, 
     LoginUser,
     LogoutUser
} from '../../controllers/auth.controller';
import { __verifyUser } from '../../middlewares/authenticate';
import { check } from 'express-validator';
import { ValidateRequest } from '../../middlewares/ErrorHandlers';
import express from 'express';
import { DatabaseType } from '../../types/Database.type';

// create router instance
const router = express.Router();


// main export
export default (conn: DatabaseType) => {

     // log user in --[GET]
     router.post('/login', 
     [
          check('email').trim().isEmail().escape(),
          check('password').trim().escape()   
     ],
     ValidateRequest, 
     LoginUser);

     // log user out --[GET]
     router.get('/logout', __verifyUser, LogoutUser);

     // get current user --[GET]
     router.get('/current-user', __verifyUser, CurrentUser);

     // default return
     return router;
}