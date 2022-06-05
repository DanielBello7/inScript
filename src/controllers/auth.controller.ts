


import { generateAccessToken } from '../middlewares/authenticate';
import { validationResult } from 'express-validator';
import { Response, Request } from 'express';
import { UserModel } from '../models/User.models';
import Log from '../config/bunyan.config';
import bcrypt from 'bcrypt'




// Function authenticating users with passport
function LoginUser(req: Request, res: Response) {
     return res.json({success: 1, payload: req.user});
}



// function authenticating user with jswt
function LoginUserV2(req: Request, res: Response) {

     const errors = validationResult(req);


     if (!errors.isEmpty()) return res.send(errors.array());


     UserModel.findOne({email: req.body.email})
          .then(async (data: any) => {
               
               if (!data) return res.json({success: 0, msg: 'invalid credentials'});

               const confirmation = await bcrypt.compare(req.body.password, data._doc.password);
               
               if (!confirmation) return res.json({success: 0, msg: 'invalid credentials'})

               const { password, createdAt, updatedAt, ...newUser } = data._doc;
               
               const accessToken = generateAccessToken(newUser);

               res.json({success: 1, payload: {newUser, accessToken}})
          })
          .catch(error => { 
               Log.error(error); 
               res.send('server error') 
          });
}



// function creating users can be used for all versions unless mode of operation changes
function CreateAccount(req: Request, res: Response) {

     const errors = validationResult(req);


     if (!errors.isEmpty()) return res.send(errors.array());


     UserModel.find({email: req.body.email})
          .then((data: any) => {

               if (data.length > 0) return res.json({success: 0, msg: 'email already in use'});
                    
               const newUser = new UserModel({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: req.body.password
               });

               newUser.save().then(() => res.json({msg: 'user saved', success: 1}));
          })
          .catch(error => { 
               Log.error(error); 
               res.send('server error');
          });
}




// function logging out users can be used for all versions
function LogoutUser(req: Request, res: Response) {

     req.logOut();

     req.user = undefined;

     return res.json({success: 1, msg: 'logged out'});

}




// function to get all users
function GetUsers(res: Response) {


     UserModel.find()
          .then(response => {
                    
                    
               const allData = response.map((item: any) => {
                    const { password, ...newItem } = item._doc;
                    return newItem;
               });

               
               return res.json({payload: allData, success: 1})
          })
          .catch(error => { 
               Log.error(error); 
               res.send('server error');
          });
}




// function to get a single user
function GetSingleUser(req: Request, res: Response) {


     const query = req.params.email;


     UserModel.findOne({email: query})
          .then((data: any) => {

               const { password, ...newUser } = data._doc;
               return res.json({success: 1, payload: newUser});
          })
          .catch(error => {
               Log.error(error); 
               return res.send('server error');
          });

}




// function to get the current user
function GetCurrentUser(req: Request, res: Response) {

     // sends the information of the current user
     return res.json({success: 1, payload: req.user});
}



// exports
export { 
     LoginUser, 
     LoginUserV2, 
     CreateAccount, 
     LogoutUser, 
     GetSingleUser, 
     GetUsers,
     GetCurrentUser
}