"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// imports
const auth_controller_1 = __importDefault(require("../../controllers/auth.controller"));
const authenticate_1 = require("../../middlewares/authenticate");
const express_validator_1 = require("express-validator");
const ErrorHandlers_1 = require("../../middlewares/ErrorHandlers");
const express_1 = __importDefault(require("express"));
// create router instance
const router = express_1.default.Router();
// main export
exports.default = (conn) => {
    // create database connection
    const auth = new auth_controller_1.default(conn);
    // log user in --[GET]
    router.post('/login', [
        (0, express_validator_1.check)('email').trim().isEmail().escape(),
        (0, express_validator_1.check)('password').trim().escape()
    ], ErrorHandlers_1.ValidateRequest, auth.LoginUser);
    // log user out --[GET]
    router.get('/logout', authenticate_1.__verifyUser, auth.LogoutUser);
    // get current user --[GET]
    router.get('/user', authenticate_1.__verifyUser, auth.CurrentUser);
    // default return
    return router;
};
