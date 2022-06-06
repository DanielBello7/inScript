


// imports
import { DatabaseType } from '../types/Database.type';
import { Response, Request } from 'express';
import Log from "../config/bunyan.config";


// create the class
class UserController {

     public conn: DatabaseType;

     constructor(connection: DatabaseType) {
          this.conn = connection;
     }

     // new user controller
     CreateUser = (req: Request, res: Response) => {} 

     // delete user controller
     DeleteUser = (req: Request, res: Response) => {}

     // get single user controller
     GetUser = (req: Request, res: Response) => {}

     // get all users controller
     GetUsers = (req: Request, res: Response) => {}

     // modify user controller
     ModifyUser = (req: Request, res: Response) => {}

     // get all user connections
     GetUserConnections = (req: Request, res: Response) => {}

     // add a new connection
     AddConnection = (req: Request, res: Response) => {}

     // removes a connection
     RemoveConnection = (req: Request, res: Response) => {}

}


// main exports
export default UserController