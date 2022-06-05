


// imports
import { 
     CreateAccount, 
     GetSingleUser, 
     GetUsers, 
     LogoutUser, 
     GetCurrentUser, 
     LoginUserV2 
} from '../../controllers/auth.controller';
import { authenticateToken } from '../../middlewares/authenticate';
import { check } from 'express-validator';
import express from 'express';



const router = express.Router();




export default () => {


     // log user in --[GET]
     router.post('/login', 
     [
          check('email').trim().isEmail().escape(),
          check('password').trim().escape()
     ], 
     LoginUserV2);





     // create user account --[POST]
     router.post('/create-account', 
     [
     check('firstName').trim().isLength({min: 3}).toLowerCase().escape(),
     check('lastName').trim().isLength({min: 3}).toLowerCase().escape(),
     check('email').trim().isEmail().isLength({min: 3}).escape(),
     check('password').trim().isLength({min: 5}).escape(),
     ], 
     CreateAccount);




     // log user out -- [GET]
     router.get('/logout', authenticateToken, LogoutUser);




     // returns a list of all the users within the system --- [GET]
     router.get('/users', authenticateToken, GetUsers);  




     // returns a particular user gotten from req params not query  --- [GET]
     router.get('/user/:email', authenticateToken, GetSingleUser);




     // get current user --- [GET]
     router.get('/current-user', authenticateToken, GetCurrentUser);




     return router;
}