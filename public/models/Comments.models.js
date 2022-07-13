"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// imports
const mongoose_1 = __importDefault(require("mongoose"));
// schema
const CommentSchema = new mongoose_1.default.Schema({
    text: {
        type: String,
        required: true
    },
    for: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'posts',
        required: true
    },
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    comments: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'comments'
        }]
}, { timestamps: true });
// model
const CommentModel = mongoose_1.default.model('comments', CommentSchema);
// main export
exports.default = CommentModel;
