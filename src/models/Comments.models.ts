


import mongoose from "mongoose";


const CommentSchema = new mongoose.Schema({
     text: {
          type: String,
          required: true
     },
     for: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'posts',
          required: true
     },
     createdBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'users',
          required: true
     },
     comments: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'comments'
     }]
}, {timestamps: true});


const CommentModel = mongoose.model('comments', CommentSchema);

export { CommentModel }
