


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
                    password: 'daniel'
               },
               {
                    _id: '914jlaeov',
                    firstName: 'David',
                    lastName: 'Bello',
                    email: 'david@gmail.com',
                    password: 'david'
               },
               {
                    _id: '0724lbae',
                    firstName: 'Joshua',
                    lastName: 'Badmius',
                    email: 'joshua@gmail.com',
                    password: 'joshua'
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

     async ModifyUser(userData: any) {}

     async DeleteUser(email: string) {}
}

// export the class
export default DevelopmentAPI;