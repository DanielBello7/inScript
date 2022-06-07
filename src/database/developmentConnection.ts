


// imports
import { DatabaseType } from "../types/Database.type";
import { LocalPaginate } from '../middlewares/Paginate';
import bcrypt from 'bcrypt';
import { 
     UserType, 
     NewUser, 
     ModifyDataType 
} from "../types/UserType.type";



// create the implementation of the class
class DevelopmentAPI implements DatabaseType {

     public users: UserType[];

     constructor() {
          this.users = [
               {
                    _id: '224iuvae',
                    firstName: 'Daniel',
                    lastName: 'Benson',
                    email: 'daniel@gmail.com',
                    password: '$2b$10$5EgyJZGKB3ODP//HePhLGe97p8aZvJzyG2Fw5u2H.QOW2ZcHuikPa',
                    // password: 'daniel'
               },
               {
                    _id: '914jlaeov',
                    firstName: 'David',
                    lastName: 'Bello',
                    email: 'david@gmail.com',
                    password: '$2b$10$2qTzPR0PDkL0eah4b5.4reUsp7Y0KejI7hX2IjunAksWjl5KJmLy2',
                    // password: 'david'
               },
               {
                    _id: '0724lbae',
                    firstName: 'Joshua',
                    lastName: 'Badmius',
                    email: 'joshua@gmail.com',
                    password: '$2b$10$Y2DpDOx6Q6UMqZxnzkrg5OS.64k.oJdJg4rvjEV05xuqd3qt1kvjq',
                    // password: 'joshua'
               },
          ]
     }


     // function to get users
     async GetUsers(page: number = 1, limit: number = 1): Promise<any> {
          const response = await LocalPaginate(this.users, page, limit);
          return response;
     }

     // function to get a particular user
     async GetUser(id: string): Promise<UserType[]> {
          const selectedUser = this.users.filter(user => user.email === id);
          return selectedUser;
     }

     // function to create a new user and add to the database
     async CreateUser(user: NewUser): Promise<UserType | false> {
          let _id = Math.random().toString();

          const newUser = {...user, _id }

          this.users.push(newUser);

          return newUser;
     }

     async ModifyUser(email: string, data: ModifyDataType): Promise<boolean> {

          let changed = false;

          const newData = this.users.map(user => {
               if (user.email !== email) return user

               changed = true;

               if (data.firstName) user.firstName = data.firstName;

               if (data.lastName) user.lastName = data.lastName;

               if (data.password) {
                    user.password = bcrypt.hashSync(data.password, 10);
               }

               return user;
          });

          this.users = newData;

          if (!changed) return false;

          return true;
     }

     async DeleteUser(email: string): Promise<boolean> {
          return true
     }
}


// export the class
export default DevelopmentAPI;