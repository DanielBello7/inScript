"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// imports 
const comments_v2_routes_1 = __importDefault(require("./comments.v2.routes"));
const imageUpload_v2_routes_1 = __importDefault(require("./imageUpload.v2.routes"));
const users_v2_routes_1 = __importDefault(require("./users.v2.routes"));
const posts_v2_routes_1 = __importDefault(require("./posts.v2.routes"));
const auth_v2_routes_1 = __importDefault(require("./auth.v2.routes"));
const express_1 = __importDefault(require("express"));
const notifications_v2_routes_1 = __importDefault(require("./notifications.v2.routes"));
// create router
const router = express_1.default.Router();
// main export
exports.default = (conn) => {
    // router for authorization
    router.use('/auth', (0, auth_v2_routes_1.default)(conn));
    // router for users
    router.use('/users', (0, users_v2_routes_1.default)(conn));
    // router for images
    router.use('/img', (0, imageUpload_v2_routes_1.default)(conn));
    // router for posts
    router.use('/posts', (0, posts_v2_routes_1.default)(conn));
    // router for comments
    router.use('/comments', (0, comments_v2_routes_1.default)(conn));
    // router for notifications
    router.use('/notifications', (0, notifications_v2_routes_1.default)(conn));
    // default return
    return router;
};
