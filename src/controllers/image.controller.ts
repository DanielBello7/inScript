


// imports
import { DatabaseType } from '../types/Database.type';
import { Response } from 'express';
import { RequestInterface } from '../types/UserType.type';
import Log from "../config/bunyan.config";
import { NewImage } from '../types/ImageType.type';
import fileUpload from 'express-fileupload';
import extensionTruncate from '../lib/extensionTrauncate';
import path from 'path';
import CloudinaryImageSave from '../lib/cloudinaryImageSave';



class ImageController {
     public conn;
     constructor(connection: DatabaseType) {
          this.conn = connection;
     }

     GetImage = async (req: RequestInterface, res: Response) => {
          const imageID = req.params.img;

          try {

               const response = await this.conn.GetImage(imageID);

               return res.json({payload: response});

          } catch (error: any) {
               Log.error(error);
               return res.status(500).json({msg: error.message})
          }
     }

     PostImage = async (req: RequestInterface, res: Response) => {

          if (!req.files) return res.status(400).json({msg: 'no file'});

          const check = req.files.image_file as fileUpload.UploadedFile[]

          if (check.length > 1) return res.status(413).json({msg: 'max 1 file'});

          const file = req.files?.image_file as fileUpload.UploadedFile;



          const newImage: NewImage = {
               createdBy: '',
               data: '',
               extension: extensionTruncate(file.mimetype),
               name: file.name,
               size: file.size
          }


          try {

               file.mv(path.join(__dirname, `../img/${file.name}`), async (error) => {

                    if (error) return res.status(400).json({msg: 'error saving file'});

                    const response = await this.conn.NewUpload(newImage);

                    return res.json({payload: response});

               });

          } catch (error: any) {
               Log.error(error);
               return res.status(500).json({msg: error.message})
          }
     }

     CloudinarySave = async (req: RequestInterface, res: Response) => {

          try {

               const saveImg = await CloudinaryImageSave(req.body.image_file);

               const newImage: NewImage = {
                    createdBy: req.user.email,
                    data: saveImg.url,
                    extension: req.body.extension,
                    name: req.body.name,
                    size: req.body.size
               }

               const response = await this.conn.NewUpload(newImage);

               return res.json({msg: response});

          } catch (error: any) {
               Log.error(error);
               return res.status(500).json({msg: error.message});
          }
     }
}



export default ImageController;