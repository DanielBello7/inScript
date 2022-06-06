


// imports
import { DatabaseType } from '../types/Database.type';
import { Response, Request } from 'express';
import Log from "../config/bunyan.config";



// create the authentication controller
class AuthController {
     public conn;

     constructor(connection: DatabaseType) {
          this.conn = connection;
     }


     // login controller
     LoginUser(req: Request, res: Response) {}

     // logout controller
     LogoutUser(req: Request, res: Response) {}

     // current user controller
     CurrentUser(req: Request, res: Response) {}
}



// export
export default AuthController