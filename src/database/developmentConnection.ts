


// imports
import { UserType } from "../types/UserType.type";
import { DatabaseType } from "../types/Database.type";
import { LocalPaginate } from '../middlewares/Paginate';


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
     public async GetUsers(page: number = 1, limit: number = 1): Promise<any> {
          const response = await LocalPaginate(this.users, page, limit);
          return response;
     }

     // function to get a particular user
     public async GetUser(id: string): Promise<UserType[]> {
          const selectedUser = this.users.filter(user => user.email === id);
          return selectedUser;
     }

     // function to create a new user and add to the database
     public async CreateUser(user: UserType): Promise<any> {
          
          const response = this.users.filter(doc => doc.email === user.email);

          if (response.length > 0) return {msg: 'user already exists!'};

          let _id;

          if (!user._id) _id = Math.random().toString();
          else _id = user._id;

          const newUser = {...user, _id }
          this.users.push(newUser);
          return newUser
     }

     public async ModifyUser(userData: any) {}

     public async DeleteUser(email: string) {}
}


// export the class
export default DevelopmentAPI;