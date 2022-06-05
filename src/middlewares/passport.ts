


// imports

import LocalStrategy from 'passport-local';
import { PassportStatic } from 'passport'
import FeedbackService from '../services/FileService.service';
import { UserType } from '../types/UserType.type';
import { UserModel } from '../models/User.models';
import bcrypt from 'bcrypt';
import Log from '../config/bunyan.config';





// using two different initialization functions because of where they get their data from




function initializeFromLocalStorage(passport: PassportStatic, userFileService: FeedbackService<UserType>) {
     
     
     const authenticateUser = async (email: string, password: string, done: Function) => {     
          try {
               const user = await userFileService.getSingleData("email", email);
               if (!user) return done(null, false, {message: 'email not found'});
               if (user.password === password) return done(null, user);
               return done(null, false, {message: 'invalid credentials'});
          }
          catch(error){
               Log.error(error);
               done(error);
          }
     }


     passport.use(
          new LocalStrategy.Strategy({
                    usernameField: 'email',
                    passwordField: 'password'
               }, 
          authenticateUser
     ));


     
     passport.serializeUser((user: any, done) => done(null, user._id));
     
     
     
     passport.deserializeUser(async (userID: string, done) => {
          try {
               const user = await userFileService.getSingleData("_id", userID);
               if (!user) return done(null, false);
               return done(null, user);
          }
          catch(error) {
               Log.error(error);
               return done(error);
          }
     });
}





function initializeFromMongoose(passport: PassportStatic) {
     const authenticateUser = (email: string, password: string, done: Function) => {

          UserModel.find({email: email})
               .then(res => {
                    if (res.length <= 0) return done(null, false);
                    const confirmation = bcrypt.compareSync(password, res[0].password);
                    if (!confirmation) return done(null, false, {message: 'invalid credentials'});
                    return done(null, res[0]);
               })
               .catch(error => {
                    Log.error(error);
                    return done(error)
               });
     }



     passport.use(
          new LocalStrategy.Strategy({
               usernameField: 'email', 
               passwordField: 'password'
          }, 
          authenticateUser
     ));



     passport.serializeUser((user: any, done) => done(null, user.id));




     passport.deserializeUser((userID: string, done) => {
          UserModel.findById(userID)
               .then(res => {
                    if (res.length <= 0) return done(null, false);
                    return done(null, res);
               })
               .catch(error => {
                    Log.error(error);
                    return done(error);
               });
     });
}




// exports
export { initializeFromLocalStorage, initializeFromMongoose } 