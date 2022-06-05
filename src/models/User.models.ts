


// imports
import bcrypt from 'bcrypt';
import mongoose from "mongoose";
import Log from "../config/bunyan.config";
import { UserType } from '../types/UserType.type';




const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  posts: [{
     type: mongoose.Schema.Types.ObjectId,
     ref: 'posts'
  }],
  likedPosts: [{
     type: mongoose.Schema.Types.ObjectId,
     ref: 'posts'  
  }],
  repostedPosts: [{
     type: mongoose.Schema.Types.ObjectId,
     ref: 'posts'
  }],
  comments: [{
       type: mongoose.Schema.Types.ObjectId,
       ref: 'comments'
  }]
}, {timestamps: true});



UserSchema.pre('save', async function preSave(next: any) {
     try {
          const user: UserType = this;
          const hash = await bcrypt.hash(user.password, 10);
          user.password = hash;
          return next();
     }
     catch(error) {
          Log.error(error);
          return next(error);
     }
});





// password encryption
UserSchema.methods.comparePassword = async function comparePassword(userPassword: string) {
  return bcrypt.compare(userPassword, this.password);
}




// create user-model
const UserModel = mongoose.model('users', UserSchema);




// exports 
export { UserModel }