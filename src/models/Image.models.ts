


// imports
import mongoose from "mongoose";


// schema
const ImageSchema = new mongoose.Schema({
     name: {
          type: String,
          required: true,
          trim: true
     },
     extension: {
          type: String,
          required: true,
          trim: true
     },
     size: {
          type: Number,
          required: true,
     },
     createdBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'users',
          required: true
     },
     data: {
          type: String,
          required: false
     }
}, {timestamps: true});


// model
const ImageModel = mongoose.model('images', ImageSchema);


// exports
export default ImageModel;