


// imports
import { DatabaseType } from '../types/Database.type';
import { Request, Response } from 'express';
import Log from "../config/bunyan.config";



class ImageController {
     public conn;
     constructor(connection: DatabaseType) {
          this.conn = connection;
     }

     // return image
     GetImage(req: Request, res: Response) {}


     // post an image
     PostImage(req: Request, res: Response) {}


     // send an image
     SendImage(req: Request, res: Response) {}
}



export default ImageController;