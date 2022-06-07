


// imports
import express from 'express';
import { ValidateRequest } from '../../middlewares/ErrorHandlers';
import { check } from 'express-validator';
import UserController from '../../controllers/user.controller';
import { __verifyUser } from '../../middlewares/authenticate';
import { DatabaseType } from '../../types/Database.type';

// create the router
const router = express.Router();


// main export
export default (conn: DatabaseType) => {

     // create an instance of the user controller
     const user = new UserController(conn);

     // route for creating new user --[POST]
     router.post('/', 
     [
          check('firstName').isString().escape(),
          check('lastName').isString().escape(),
          check('email').isString().escape(),
          check('password').isString().escape()
     ], 
     ValidateRequest, user.CreateUser);

     // route to get all users --[GET]
     // router.get('/', __verifyUser, user.GetUsers);
     router.get('/', user.GetUsers);

     // route to get a singleUser --[GET]
     router.get('/:userID', __verifyUser, user.GetUser);

     // route to get user connections --[GET]
     router.get('/connections', __verifyUser, user.GetUserConnections);

     // route to add connections --[PUT]
     router.put('/connections/:ID', __verifyUser, user.AddConnection);

     // route remove connections --[PATCH]
     router.patch('/connections/remove/:ID', __verifyUser, user.RemoveConnection);

     // route to modify user --[PATCH]
     router.patch('/modify', 
     [
          check('modifyData').isObject().escape().withMessage('required')
     ], 
     ValidateRequest, 
     __verifyUser, 
     user.ModifyUser);

     // route to delete user --[DELETE]
     router.delete('/delete',__verifyUser, user.DeleteUser);

     // default return
     return router;
}