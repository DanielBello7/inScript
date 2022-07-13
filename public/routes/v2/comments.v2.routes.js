"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// imports
const comment_controller_1 = __importDefault(require("../../controllers/comment.controller"));
const authenticate_1 = require("../../middlewares/authenticate");
const ErrorHandlers_1 = require("../../middlewares/ErrorHandlers");
const express_validator_1 = require("express-validator");
const express_1 = __importDefault(require("express"));
// create router
const router = express_1.default.Router();
// main export 
exports.default = (conn) => {
    const comment = new comment_controller_1.default(conn);
    // route posts a comment ---[POST]
    router.post('/', [
        (0, express_validator_1.check)('for').trim().isString().escape().withMessage('post id required'),
        (0, express_validator_1.check)('text').trim().isString().withMessage('comment required'),
        (0, express_validator_1.check)('type').trim().isString().escape().withMessage('comment required')
    ], ErrorHandlers_1.ValidateRequest, authenticate_1.__verifyUser, comment.PostComment);
    // route to get a particular comment --[GET]
    router.get('/:commentID', authenticate_1.__verifyUser, comment.GetComment);
    // route for all comments of a particular post --[GET]
    router.get('/post/:postID', authenticate_1.__verifyUser, comment.GetPostComments);
    // route for all comments of a particular comment --[GET]
    router.get('/comment/:commentID', authenticate_1.__verifyUser, comment.GetAllCommentsForComment);
    // default return
    return router;
};
