


// imports
import bcrypt from 'bcrypt';
import mongoose from "mongoose";
import Log from "../config/bunyan.config";
import { UserType } from '../types/UserType.type';


// schema
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
     profileImg: {
          type: String,
          required: false,
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
     }],
     connections: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'users'
     }],
     uploads: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'images'
     }]
}, {timestamps: true});


// password encryption
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


// create user-model
const UserModel = mongoose.model('users', UserSchema);


// exports 
export default UserModel;