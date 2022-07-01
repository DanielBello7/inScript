


// imports
import { DatabaseType } from '../types/Database.type';
import { RequestInterface } from '../types/UserType.type'; 
import { Response } from 'express';
import { generateToken } from '../middlewares/authenticate';
import Log from "../config/bunyan.config";
import bcrypt from 'bcrypt';



// create the authentication controller
class AuthController {
     public conn;

     constructor(connection: DatabaseType) {
          this.conn = connection;
     }


     LoginUser = async (req: RequestInterface, res: Response) => {
          const { email } = req.body;

          try {

               const response = await this.conn.GetUser(email);

               if (response.length <= 0) return res.status(400).json({msg: 'user not registered'});

               const confirmation = await bcrypt.compare(req.body.password, response[0].password);

               if (!confirmation) return res.status(400).json({msg: 'invalid credentials'});

               const { password, ...user } = response[0];

               const token = generateToken(user);

               const payload = { user, token }

               return res.json({payload});

          } catch (error: any) {
               Log.info(error);
               return res.status(500).json({msg: error.message});
          }
     }


     LogoutUser = (req: RequestInterface, res: Response) => {
          req.user = null;
          return res.json({msg: 'logged out'});
     }


     CurrentUser = async (req: RequestInterface, res: Response) => {
          try {
               const response = await this.conn.GetUser(req.user.email);

               const { password, ...user } = response[0];

               return res.json({payload: user});
          }
          catch (error: any) {
               Log.error(error);
               return res.status(500).json({msg: error.message});
          }
     }
}



// export
export default AuthController