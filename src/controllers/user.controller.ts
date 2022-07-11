


// imports
import { DatabaseType } from '../types/Database.type';
import { ModifyDataType, RequestInterface } from '../types/UserType.type';
import { Response } from 'express';
import { NewNotificationType } from '../types/NotificationsType.type';
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

         if (check.length > 0) return res.status(400).json({msg: 'User already registered'});

         const response = await this.conn.CreateUser(newUser);

         if (!response) return res.status(400).json({msg: 'Error creating new user'});

         const { password, ...resUser } = response;

         return res.json({payload: resUser});
      } 
      catch (error: any) {
         Log.info(error);
         return res.status(500).json({msg: error.message});
      }
   } 
   
   DeleteUser = async (req: RequestInterface, res: Response) => {
      const { email } = req.user;
      try {
         const response = await this.conn.DeleteUser(email);

         if (!response) return res.status(409).json({msg: 'User not deleted'});

         return res.json({msg: 'User deleted'});
      } 
      catch (error: any) {
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
      } 
      catch (error: any) {
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
      const { img, firstName, lastName } = req.body;

      try {
         const mainSaveData: ModifyDataType = {
            firstName: firstName,
            lastName: lastName,
            profileImg: img ? img : req.user.profileImg
         }

         const response = await this.conn.ModifyUser(req.user.email, mainSaveData);
         if (!response) return res.status(400).json({msg: 'error updating user'});
         return res.json({msg: 'user updated'});

      } catch (error: any) {
         Log.info(error);
         return res.status(500).json({msg: error.message});
      }
   }

   GetRandomConnection = async (req: RequestInterface, res: Response) => {
      try {
         const response = await this.conn.GetRandomUser(req.user.email);

         const { 
            comments, 
            createdAt,
            likedPosts,
            repostedPosts, 
            uploads, 
            updatedAt,
            posts,
            password, 
            ...responseUser 
         } = response;

         return res.json({payload: responseUser});

      } catch (error: any) {
         Log.info(error);
         return res.status(500).json({msg: error.message});
      }
   }
   
   GetUserConnections = async (req: RequestInterface, res: Response) => {
      const user = req.params.userID;
      try {
         const response = await this.conn.GetConnections(user);
         return res.json({payload: response});
      }
      catch (error: any) {
         Log.error(error);
         return res.status(500).json({msg: error.message});
      }
   }

   AddConnection = async (req: RequestInterface, res: Response) => {
      const connectionID = req.params.ID;
      const email = req.user.email; 
      try {
         const response = await this.conn.AddConnection(email, connectionID);

         if (!response) return res.status(400).json({msg: 'error adding connection'});

         const data: NewNotificationType = {
            content: `You were just followed by ${req.user.email}`,
            createdBy: req.user._id,
            for: connectionID,
            title: 'New Following'
         }

         const createNotification = await this.conn.CreateNotification(data);

         return res.json({payload: 'Connection added'});
      }
      catch (error: any) {
         Log.error(error);
         return res.status(500).json({msg: error.message});
      }
   }

   RemoveConnection = async (req: RequestInterface, res: Response) => {
      const connectionID = req.params.ID;
      const email = req.user.email;
      try {
         const response = await this.conn.RemoveConnection(email, connectionID);

         if (!response) return res.status(400).json({msg: 'error removing connection'});

         return res.json({payload: 'Connection added'});
      }
      catch (error: any) {
         Log.error(error);
         return res.status(500).json({msg: error.message});
      }
   }

   GetUserProfileImg = async (req: RequestInterface, res: Response) => {
      const email = req.params.email;
      try {
         const response = await this.conn.GetProfileImg(email);
         return res.send(response);
      }
      catch (error: any) {
         Log.error(error);
         return res.status(500).json({msg: error.message});
      }
   }
}


// main exports
export default UserController