


// imports
import mongoose from "mongoose";


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
    type: String,
    required: true
  }
}, {timestamps: true});




const ImageModel = mongoose.model('images', ImageSchema);



// exports
export { ImageModel }