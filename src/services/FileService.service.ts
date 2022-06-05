


// imports
import { v4 } from 'uuid';
import util from 'util';
import fs from 'fs';




// required
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);




class FeedbackService<T extends {[key: string]: any}> {
     private dataFile: string;


     constructor(dataFile: string){
          this.dataFile = dataFile;
     }



     // this gets all the data from a particular fileset
     private async getAllData() {

          const data = await readFile(this.dataFile, "utf-8");
          if (!data) return [];
          const allData: T[] = JSON.parse(data);
          return allData;
     }




     // returns list to host
     async getDataList() {
          const data = await this.getAllData();
          return data;
     }



     async addEntry(data: T) {
          const allData = await this.getAllData() || [];
          const newDataSet: T[] = [...allData, {...data, _id: v4()}];
          return writeFile(this.dataFile, JSON.stringify(newDataSet, null, 3));
     }



     async getSingleData(dataKey: string, dataValue: any) {
          const allData = await this.getAllData();
          const result = allData.find(item => item[dataKey] === dataValue) as T;
          if (!result) return null;
          return result;
     }



     async removeSingleData(dataKey: string, dataValue: any) {
          const allData = await this.getAllData();
          const result = allData.filter(item => item[dataKey] !== dataValue);
          return writeFile(this.dataFile, JSON.stringify(result, null, 3));
     }


     async removeAllData() {
          return writeFile(this.dataFile, JSON.stringify([], null, 3));
     }


     async replaceAllData(data: any) {
          return await writeFile(this.dataFile, JSON.stringify(data, null, 3));
     }
}





// export class
export default FeedbackService;