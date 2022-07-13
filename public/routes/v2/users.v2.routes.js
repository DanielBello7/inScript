"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// imports
const express_1 = __importDefault(require("express"));
const ErrorHandlers_1 = require("../../middlewares/ErrorHandlers");
const authenticate_1 = require("../../middlewares/authenticate");
const express_validator_1 = require("express-validator");
const user_controller_1 = __importDefault(require("../../controllers/user.controller"));
// create the router
const router = express_1.default.Router();
// main export
exports.default = (conn) => {
    // create an instance of the user controller
    const user = new user_controller_1.default(conn);
    // route for creating new user --[POST]
    router.post('/', [
        (0, express_validator_1.check)('firstName').isString().escape(),
        (0, express_validator_1.check)('lastName').isString().escape(),
        (0, express_validator_1.check)('email').isString().escape(),
        (0, express_validator_1.check)('password').isString().escape()
    ], ErrorHandlers_1.ValidateRequest, user.CreateUser);
    // route to get all users --[GET]
    router.get('/', authenticate_1.__verifyUser, user.GetUsers);
    // route to get user profile img --[GET]
    router.get('/profileImg/:email', user.GetUserProfileImg);
    // route to get a singleUser --[GET]
    router.get('/:userID', authenticate_1.__verifyUser, user.GetUser);
    // route to modify user --[PATCH]
    router.patch('/modify', [
        (0, express_validator_1.check)('firstName').trim().escape(),
        (0, express_validator_1.check)('lastName').trim().escape(),
        (0, express_validator_1.check)('img').trim().isString(),
    ], ErrorHandlers_1.ValidateRequest, authenticate_1.__verifyUser, user.ModifyUser);
    // route to delete user --[DELETE]
    router.delete('/delete', authenticate_1.__verifyUser, user.DeleteUser);
    // route to get user connections --[GET]
    router.get('/connections/preference', authenticate_1.__verifyUser, user.GetRandomConnection);
    // route to get user connections --[GET]
    router.get('/connections/:userID', authenticate_1.__verifyUser, user.GetUserConnections);
    // route to add connections --[PUT]
    router.put('/connections/connect/:ID', authenticate_1.__verifyUser, user.AddConnection);
    // route remove connections --[PATCH]
    router.patch('/connections/disconnect/:ID', authenticate_1.__verifyUser, user.RemoveConnection);
    // default return
    return router;
};
