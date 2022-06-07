


// imports
import { DatabaseType } from '../types/Database.type';
import { RequestInterface } from '../types/UserType.type'; 
import { Response } from 'express';
import Log from "../config/bunyan.config";
import bcrypt from 'bcrypt';
import { generateToken } from '../middlewares/authenticate';



// create the authentication controller
class AuthController {
     public conn;

     constructor(connection: DatabaseType) {
          this.conn = connection;
     }


     // login controller
     // gets email and password from body
     LoginUser = async (req: RequestInterface, res: Response) => {
          const { email } = req.body;

          try {

               const response = await this.conn.GetUser(email);

               if (response.length <= 0) return res.status(400).json({msg: 'user not registered'});

               const confirmation = await bcrypt.compare(req.body.password, response[0].password);

               if (!confirmation) return res.status(400).json({msg: 'invalid credentials'});

               const { 
                    password,
                    uploads, 
                    comments, 
                    connections, 
                    likedPosts, 
                    posts, 
                    repostedPosts,
                    ...responseUser
               } = response[0];

               const token = generateToken(responseUser);

               const payload = {
                    responseUser,
                    token
               }

               return res.json({payload});

          } catch (error: any) {
               Log.info(error);
               return res.status(500).json({msg: error.message});
          }
     }

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