


// imports
import { DatabaseType } from '../types/Database.type';
import { RequestInterface } from '../types/UserType.type';
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
     CreateUser = (req: RequestInterface, res: Response) => {} 

     // delete user controller
     // gets id from req.user
     DeleteUser = (req: RequestInterface, res: Response) => {}

     // get single user controller
     // uses :userID
     GetUser = (req: RequestInterface, res: Response) => {}

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
     ModifyUser = (req: RequestInterface, res: Response) => {}

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