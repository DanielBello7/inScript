


// imports
import mongoose from 'mongoose';
import { DatabaseType, PaginatedResponse } from '../types/Database.type';
import { UserType } from '../types/UserType.type';
import Log from '../config/bunyan.config';


class MongoConnection implements DatabaseType {
     constructor(url: string) {
          // connect function
          mongoose.connect(url, {}, () => {
               Log.info('connected to database');
          });
     }


     async GetUser(email: string): Promise<UserType> {
          let a: UserType = {
               _id: '',
               email: '',
               firstName: '',
               lastName: '',
               password: ''
          }
          return a
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

     async CreateUser(user: UserType) {}

     async ModifyUser(userData: any) {}

     async DeleteUser(email: string) {}
}




// main exports
export default MongoConnection