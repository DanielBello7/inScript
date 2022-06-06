


// imports
import express from 'express';
import { ValidateRequest } from '../../middlewares/ErrorHandlers';
import { check } from 'express-validator';
import { 
     AddConnection, 
     CreateUser,
     DeleteUser,
     GetUser,
     GetUserConnections,
     GetUsers,
     ModifyUser,
     RemoveConnection
} from '../../controllers/user.controller';
import { __verifyUser } from '../../middlewares/authenticate';
import { DatabaseType } from '../../types/Database.type';

// create the router
const router = express.Router();


// main export
export default (conn: DatabaseType) => {

     // route for creating new user --[POST]
     router.post('/', 
     [
          check('firstName').isString()
     ], 
     ValidateRequest, CreateUser);

     // route to get all users --[GET]
     router.get('/', __verifyUser, GetUsers);

     // route to get a singleUser --[GET]
     router.get('/:userID', __verifyUser, GetUser);

     // route to get user connections --[GET]
     router.get('/connections', __verifyUser, GetUserConnections);

     // route to add connections --[PUT]
     router.put('/connections/:ID', __verifyUser, AddConnection);

     // route remove connections --[PATCH]
     router.patch('/connections/remove/:ID', __verifyUser, RemoveConnection);

     // route to modify user
     router.put('/modify', __verifyUser, ModifyUser);

     // route to delete user
     router.delete('/', __verifyUser, DeleteUser);

     // default return
     return router;
}