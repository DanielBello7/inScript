


// imports


import sharp from "sharp";
import { v4 } from 'uuid';
import util from 'util';
import path from 'path';
import fs from 'fs';



// required
const fsunlink = util.promisify(fs.unlink);




class MediaFileService {
     public directory: string;
     public fileExtension: string;


     constructor(directory: string, fileExtension: string) {
          this.directory = directory;
          this.fileExtension = fileExtension;
     }



     private getFileName() {
          return `${v4()}.${this.fileExtension}`;
     }



     getFilePath(name: string) {
          return path.resolve(`${this.directory}/${name}`);
     }

     async storeFile(buffer: Buffer, fileName: string) {
          const filename = fileName || this.getFileName();
          const filepath = this.getFilePath(filename);

          await sharp(buffer)
               .resize(300, 300, {
                    fit: sharp.fit.inside,
                    withoutEnlargement: true
               }).toFile(filepath)

          return filename;
     }


     

     async getThumbnail(filename: string) {
          return sharp(this.getFilePath(filename)).resize(100, 100).toBuffer();
     }

     async deleteFile(filename: string) {
          return fsunlink(this.getFilePath(filename));
     }
}




// export class
export default MediaFileService;