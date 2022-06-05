


// imports
import MediaFileService from '../services/MediaFileService.service';
import FeedbackService from '../services/FileService.service';
import { ImageType } from '../types/DataType.type';
import { UploadedFile } from 'express-fileupload';
import { UserType } from '../types/UserType.type';
import { ImageModel } from '../models/Image.models';
import { Request, Response } from 'express';
import Log from '../config/bunyan.config';
import path from 'path';





// contants
const ImgFeedbackService = new FeedbackService<ImageType>(path.join(__dirname, "../temp/imgData.json"));



const MediaService = new MediaFileService('./src/img/', 'jpg');


// .env type
const type = process.env.DEPLOYMENT_TYPE;







// controller functions
function GetImage(req: Request, res: Response) {

     const img = req.params.img;

     ImageModel.find({name: img})
          .then((data: any) => {

               if(data.length <= 0) return res.json({success: 0, msg: 'file not found'});

               res.type('png');

               const imageFile = MediaService.getFilePath(img);
               return res.sendFile(imageFile);
          })
          .catch(error => {
               Log.error(error);
               res.send('server error');
          });
}




function UploadImage(req: Request, res: Response) {

     try {

          const currentUser: UserType = req.user as UserType;


          if (!req.files) return res.json({success: 0, msg: 'no files recieved'});

          const dataFiles = req.files.img as UploadedFile[];

          if (dataFiles.length > 1) return res.json({success: 0, msg: 'max files is 1'});
          const file = req.files.img as UploadedFile;
          const filename = file.name;

          const confirmation = file.mimetype.split('/');

          if (confirmation[0] !== 'image')
               return res.json({success: 0, msg: 'image files only'});


          const dir = path.join(__dirname, `../img/${filename}`);



          file.mv(dir, async (error: Error) => {
               if (error) return res.json({success: 0, msg: error.message});

               const newEntry = new ImageModel({
                    name: filename,
                    extension: file.mimetype,
                    size: file.size,
                    createdBy: currentUser.email
               });


               await newEntry.save();


               return res.json({success: 1, payload: filename});
          });


     } catch (error) {

          Log.error(error);


          return res.send('server error');
     }
}




// exports
export { GetImage, UploadImage }
