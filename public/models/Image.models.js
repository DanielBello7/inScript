"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// imports
const mongoose_1 = __importDefault(require("mongoose"));
// schema
const ImageSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    data: {
        type: String,
        required: false
    }
}, { timestamps: true });
// model
const ImageModel = mongoose_1.default.model('images', ImageSchema);
// exports
exports.default = ImageModel;
