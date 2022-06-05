


// imports
import { CreateAccount, GetSingleUser, GetUsers, LoginUser, LogoutUser, GetCurrentUser } from '../../controllers/auth.controller';
import { authenticate } from '../../middlewares/authenticate';
import { check } from 'express-validator';
import passport from 'passport';
import express from 'express';



const router = express.Router();






export default () => {


  // log user in --[GET]
  router.post('/login', passport.authenticate('local', {failureRedirect: '/error/invalid credentials'}), LoginUser);





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
  router.get('/logout', authenticate, LogoutUser);




  // returns a list of all the users within the system --- [GET]
  router.get('/users', authenticate, GetUsers);  




  // returns a particular user gotten from req params not query  --- [GET]
  router.get('/user/:email', authenticate, GetSingleUser);




  // get current user --- [GET]
  router.get('/current-user', authenticate, GetCurrentUser);



  return router;
}