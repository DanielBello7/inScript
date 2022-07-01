


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

               const { password, ...resUser } = response;

               return res.json({payload: resUser});

          } catch (error: any) {
               Log.info(error);
               return res.status(500).json({msg: error.message});
          }
     } 

     
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

     
     GetUser = async (req: RequestInterface, res: Response) => {

          const user = req.params.userID;

          try {

               const response = await this.conn.GetUser(user);

               if (response.length <= 0) return res.sendStatus(204);

               const { password, ...responseUser } = response[0];

               return res.json({payload: responseUser});

          } catch (error: any) {
               Log.info(error);
               return res.status(500).json({msg: error.message});
          }
     }

     
     GetUsers = async (req: RequestInterface, res: Response) => {

          const page = parseInt(req.query.page as string);
          const limit = parseInt(req.query.limit as string);
          
          try {

               const response = await this.conn.GetUsers(page?page:1, limit?limit:5);

               return res.json({payload: response});

          } catch (error: any) {
               Log.info(error);
               return res.status(500).json({msg: error.message});
          }
     }

     
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
     
     GetUserConnections = (req: RequestInterface, res: Response) => {}

     AddConnection = (req: RequestInterface, res: Response) => {}

     RemoveConnection = (req: RequestInterface, res: Response) => {}

}


// main exports
export default UserController