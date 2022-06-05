


import mongoose from "mongoose";


const PostSchema = new mongoose.Schema({
     text: {
          type: String,
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
     }]

}, {timestamps: true});


const PostModel = mongoose.model('posts', PostSchema);

export { PostModel }