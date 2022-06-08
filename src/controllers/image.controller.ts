


// imports
import { DatabaseType } from '../types/Database.type';
import { Response } from 'express';
import { RequestInterface } from '../types/UserType.type';
import Log from "../config/bunyan.config";



class ImageController {
     public conn;
     constructor(connection: DatabaseType) {
          this.conn = connection;
     }

     // return image
     // gets user from req.user
     // uses :img
     GetImage = (req: RequestInterface, res: Response) => {

          try {


          } catch (error: any) {
               Log.error(error);
               return res.status(500).json({msg: error.message})
          }
     }


     // post an image
     // gets user from req.user
     PostImage = (req: RequestInterface, res: Response) => {

          try {


          } catch (error: any) {
               Log.error(error);
               return res.status(500).json({msg: error.message})
          }
     }
}



export default ImageController;