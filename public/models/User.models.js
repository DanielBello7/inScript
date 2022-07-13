"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// imports
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = __importDefault(require("mongoose"));
const bunyan_config_1 = __importDefault(require("../config/bunyan.config"));
// schema
const UserSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    profileImg: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    posts: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'posts'
        }],
    likedPosts: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'posts'
        }],
    repostedPosts: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'posts'
        }],
    comments: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'comments'
        }],
    connections: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'users'
        }],
    uploads: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'images'
        }],
    notifications: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'notifications'
        }]
}, { timestamps: true });
// password encryption
UserSchema.pre('save', function preSave(next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = this;
            const hash = yield bcrypt_1.default.hash(user.password, 10);
            user.password = hash;
            return next();
        }
        catch (error) {
            bunyan_config_1.default.error(error);
            return next(error);
        }
    });
});
// create user-model
const UserModel = mongoose_1.default.model('users', UserSchema);
// exports 
exports.default = UserModel;
