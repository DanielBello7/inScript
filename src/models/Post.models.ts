


// imports
import mongoose from "mongoose";

// schema
const PostSchema = new mongoose.Schema({
     text: {
          type: String,
          required: false
     },
     createdBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'users',
          required: true
     },
     likes: {
          type: Number,
          default: 0
     },
     likedBy: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'users'
     }],
     reposts: {
          type: Number,
          default: 0
     },
     repostedBy: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'users'
     }],
     postType: {
          type: String,
          required: true,
     },
     mediaType: {
          type: String
     },
     comments: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'comments'
     }],
     media: {
          type: String,
          required: false
     }

}, {timestamps: true});


// model
const PostModel = mongoose.model('posts', PostSchema);


// main export
export default PostModel;