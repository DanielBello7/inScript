"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// imports
const ErrorHandlers_1 = require("../../middlewares/ErrorHandlers");
const post_controller_1 = __importDefault(require("../../controllers/post.controller"));
const authenticate_1 = require("../../middlewares/authenticate");
const express_validator_1 = require("express-validator");
const express_1 = __importDefault(require("express"));
// create a router
const router = express_1.default.Router();
// default return
exports.default = (conn) => {
    const post = new post_controller_1.default(conn);
    // this creats a new post ---[POST]
    router.post('/', [
        (0, express_validator_1.check)('text').trim().isString(),
        (0, express_validator_1.check)('media').isString().trim(),
        (0, express_validator_1.check)('postType').isString().trim().escape(),
        (0, express_validator_1.check)('createdBy').isString().trim().escape()
    ], ErrorHandlers_1.ValidateRequest, authenticate_1.__verifyUser, post.NewPost);
    // route for all posts --[GET]
    router.get('/', authenticate_1.__verifyUser, post.GetAllPosts);
    // route for getting a random post
    router.get('/preference', authenticate_1.__verifyUser, post.GetRandomPost);
    // route for getting single post --[GET]
    router.get('/:postID', authenticate_1.__verifyUser, post.GetSinglePost);
    // route for all posts of a user --[GET]
    router.get('/user/:userID', authenticate_1.__verifyUser, post.GetUserPosts);
    // route for all liked posts of a user --[GET]
    router.get('/user/liked/:userID', authenticate_1.__verifyUser, post.GetUserLikedPosts);
    // route for all reposted posts of a user --[GET]
    router.get('/user/reposted/:userID', authenticate_1.__verifyUser, post.GetUserRepostedPosts);
    // route for liking posts --[PUT]
    router.put('/like/:postID', authenticate_1.__verifyUser, post.LikePost);
    // route for unliking a post --[PUT]
    router.put('/unlike/:postID', authenticate_1.__verifyUser, post.UnlikePost);
    // route for reposting --[PUT]
    router.put('/repost/:postID', authenticate_1.__verifyUser, post.RepostPost);
    // route for un-reposting --[PUT]
    router.put('/unrepost/:postID', authenticate_1.__verifyUser, post.UnRepostPost);
    // default return
    return router;
};
