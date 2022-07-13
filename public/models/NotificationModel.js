"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const NotificationSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        refs: 'users',
        required: true
    },
    for: {
        type: String,
        required: false
    }
}, { timestamps: true });
const NotificationModel = mongoose_1.default.model('notifications', NotificationSchema);
exports.default = NotificationModel;
