


// imports
import Log from '../config/bunyan.config';
import mongoose from 'mongoose';
import { DatabaseType, PaginatedResponse } from '../types/Database.type';
import { 
     UserType, 
     NewUser, 
     ModifyDataType 
} from '../types/UserType.type';


class MongoConnection implements DatabaseType {
     constructor(url: string) {
          // connect function
          mongoose.connect(url, {}, () => {
               Log.info('connected to database');
          });
     }


     async GetUser(email: string): Promise<UserType[]> {
          let a: UserType = {
               _id: '',
               email: '',
               firstName: '',
               lastName: '',
               password: ''
          }
          return [a]
     }

     async GetUsers(): Promise<PaginatedResponse> {

          const payload: PaginatedResponse = {
               currentPage: 1,
               hasMore: false,
               limit: 1,
               results: [],
               totalFound: 1
          }
          return payload
     }

     async CreateUser(user: NewUser): Promise<UserType | false> {
          return false
     }

     async ModifyUser(email: string, data: ModifyDataType): Promise<boolean> {
          return false;
     }

     async DeleteUser(email: string): Promise<boolean> {
          return false;
     }
}




// main exports
export default MongoConnection