


import { DatabaseType } from "../types/Database.type";
import { RequestInterface } from "../types/UserType.type";
import { Response } from "express";
import Log from "../config/bunyan.config";


class Notifications {
     public conn;

     constructor(connection: DatabaseType) {
          this.conn = connection;
     }


     GetNotifications = async (req: RequestInterface, res: Response) => {

          const email = req.user.email;

          try {

               const response = await this.conn.GetNotifications(email);

               return res.json({payload: response});


          } catch (error: any) {
               Log.error(error);
               return res.status(500).json({msg: error.message});
          }
     }

     SetNotificationAsRead = async (req: RequestInterface, res: Response) => {

          const ID = req.params.notificationID;

          const email = req.user.email;

          try {

               const response = await this.conn.ChangeNotificationStatus(email, ID);

               if (!response) return res.status(400).json({msg: 'error'});

               return res.json({msg: 'notification modified'});

          } catch (error: any) {
               Log.error(error);
               return res.status(500).json({msg: error.message});
          }
     }

     RemoveNotification = async (req: RequestInterface, res: Response) => {

          const ID = req.params.notificationID;

          const email = req.user.email;

          try {

               const response = await this.conn.DeleteNotification(email, ID);

               if (!response) return res.status(400).json({msg: 'error'});

               return res.json({msg: 'success'});

          } catch (error: any) {
               Log.error(error);
               return res.status(500).json({msg: error.message});
          }
     }

     ClearNotifications = async (req: RequestInterface, res: Response) => {

          const email = req.user.email;

          try {

               const response = await this.conn.ClearAllNotifications(email);

               if (!response) return res.status(400).json({msg: 'error'});

               return res.json({msg: 'success'});

          } catch (error: any) {
               Log.error(error);
               return res.status(500).json({msg: error.message});
          }
     }
}

export default Notifications;