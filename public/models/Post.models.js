"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// imports
const mongoose_1 = __importDefault(require("mongoose"));
// schema
const PostSchema = new mongoose_1.default.Schema({
    text: {
        type: String,
        required: false
    },
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    likedBy: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'users'
        }],
    reposts: {
        type: Number,
        default: 0
    },
    repostedBy: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
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
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'comments'
        }],
    media: {
        type: String,
        required: false
    }
}, { timestamps: true });
// model
const PostModel = mongoose_1.default.model('posts', PostSchema);
// main export
exports.default = PostModel;
