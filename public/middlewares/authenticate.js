"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.__verifyUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_config_1 = __importDefault(require("../config/env.config"));
// using env variables
(0, env_config_1.default)();
// authenticats a user with jswt
function __verifyUser(req, res, next) {
    const authorizationHeader = req.headers['authorization'];
    const token = authorizationHeader && authorizationHeader.split(' ')[1];
    if (token == null)
        return res.status(401).json({ msg: 'Invalid credentials' });
    jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if (error)
            return res.status(400).json({ msg: 'Session invalid' });
        req.user = user;
        return next();
    });
}
exports.__verifyUser = __verifyUser;
// function to generate token
function generateToken(user) {
    return jsonwebtoken_1.default.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
}
exports.generateToken = generateToken;
