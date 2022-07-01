


import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
     title: {
          type: String,
          required: true
     },
     content: { 
          type: String,
          required: true
     },
     isRead: {
          type: Boolean,
          required: true,
          default: false
     },
     createdFrom: {
          type: mongoose.Schema.Types.ObjectId,
          refs: 'users',
          required: true
     },
     for: {
          type: String,
          required: false
     }
}, {timestamps: true});

const NotificationModel = mongoose.model('notifications', NotificationSchema);

export default NotificationModel;