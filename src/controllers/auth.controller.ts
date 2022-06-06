


// imports
import { DatabaseType } from '../types/Database.type';
import { RequestInterface } from '../types/UserType.type'; 
import { Response } from 'express';
import Log from "../config/bunyan.config";



// create the authentication controller
class AuthController {
     public conn;

     constructor(connection: DatabaseType) {
          this.conn = connection;
     }


     // login controller
     // gets email and password from body
     LoginUser = (req: RequestInterface, res: Response) => {}

     // logout controller
     // gets user id from req.user
     LogoutUser = (req: RequestInterface, res: Response) => {}

     // current user controller
     // sends the current user
     // gets user from req.user
     CurrentUser = (req: RequestInterface, res: Response) => {}
}



// export
export default AuthController