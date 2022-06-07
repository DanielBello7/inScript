


// imports
import { DatabaseType } from '../types/Database.type';
import { RequestInterface, UserType } from '../types/UserType.type';
import { Response } from 'express';
import Log from "../config/bunyan.config";


// create the class
class UserController {
 
     public conn: DatabaseType;

     constructor(connection: DatabaseType) {
          this.conn = connection;
     }

     // new user controller
     // expects UserType data
     CreateUser = async (req: RequestInterface, res: Response) => {

          const newUser = {
               firstName: req.body.firstName,
               lastName: req.body.lastName,
               email: req.body.email,
               password: req.body.password,
          }

          try {

               const check = await this.conn.GetUser(newUser.email);

               if (check.length > 0) return res.status(400).json({msg: 'user exists'});

               const response = await this.conn.CreateUser(newUser);

               if (!response) return res.status(400).json({msg: 'error creating new user'});

               return res.json({payload: response});

          } catch (error: any) {
               Log.info(error);
               return res.status(500).json({msg: error.message});
          }
     } 

     // delete user controller
     // gets id from req.user
     DeleteUser = async (req: RequestInterface, res: Response) => {
          const { email } = req.user;

          try {

               const response = await this.conn.DeleteUser(email);

               if (!response) return res.status(409).json({msg: 'user not deleted'});

               return res.json({msg: 'user deleted'});

          } catch (error: any) {
               Log.info(error);
               return res.status(500).json({msg: error.message});
          }
     }

     // get single user controller
     // uses :userID
     GetUser = async (req: RequestInterface, res: Response) => {

          const user = req.params.userID;

          try {

               const response = await this.conn.GetUser(user);

               if (response.length <= 0) return res.sendStatus(204);

               return res.json({payload: response[0]});

          } catch (error: any) {
               Log.info(error);
               return res.status(500).json({msg: error.message});
          }
     }

     // get all users controller
     GetUsers = async (req: RequestInterface, res: Response) => {
          try {

               const response = await this.conn.GetUsers();
               return res.json({payload: response});

          } catch (error: any) {
               Log.info(error);
               return res.status(500).json({msg: error.message});
          }
     }

     // modify user controller
     // gets user id from req.user
     // gets "modifyData"
     ModifyUser = async (req: RequestInterface, res: Response) => {

          const { modifyData } = req.body;

          try {

               const response = await this.conn.ModifyUser(req.user.email, modifyData);

               if (!response) return res.status(400).json({msg: 'error updating user'});

               return res.json({msg: 'user updated'});

          } catch (error: any) {
               Log.info(error);
               return res.status(500).json({msg: error.message});
          }
     }

     // get all user connections
     // gets user id from req.user
     GetUserConnections = (req: RequestInterface, res: Response) => {}

     // add a new connection
     // gets user id from req.user
     // uses :ID
     AddConnection = (req: RequestInterface, res: Response) => {}

     // removes a connection
     // gets user id from req.user
     // uses :ID
     RemoveConnection = (req: RequestInterface, res: Response) => {}

}


// main exports
export default UserController