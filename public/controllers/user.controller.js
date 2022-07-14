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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bunyan_config_1 = __importDefault(require("../config/bunyan.config"));
// create the class
class UserController {
    constructor(connection) {
        this.CreateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const newUser = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
            };
            try {
                const check = yield this.conn.GetUser(newUser.email);
                if (check.length > 0)
                    return res.status(400).json({ msg: 'User already registered' });
                const response = yield this.conn.CreateUser(newUser);
                if (!response)
                    return res.status(400).json({ msg: 'Error creating new user' });
                const { password } = response, resUser = __rest(response, ["password"]);
                return res.json({ payload: resUser });
            }
            catch (error) {
                bunyan_config_1.default.info(error);
                return res.status(500).json({ msg: error.message });
            }
        });
        this.DeleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email } = req.user;
            try {
                const response = yield this.conn.DeleteUser(email);
                if (!response)
                    return res.status(409).json({ msg: 'User not deleted' });
                return res.json({ msg: 'User deleted' });
            }
            catch (error) {
                bunyan_config_1.default.info(error);
                return res.status(500).json({ msg: error.message });
            }
        });
        this.GetUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.params.userID;
            try {
                const response = yield this.conn.GetUser(user);
                if (response.length <= 0)
                    return res.sendStatus(204);
                const _a = response[0], { password } = _a, responseUser = __rest(_a, ["password"]);
                return res.json({ payload: responseUser });
            }
            catch (error) {
                bunyan_config_1.default.info(error);
                return res.status(500).json({ msg: error.message });
            }
        });
        this.GetUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);
            try {
                const response = yield this.conn.GetUsers(page ? page : 1, limit ? limit : 5);
                return res.json({ payload: response });
            }
            catch (error) {
                bunyan_config_1.default.info(error);
                return res.status(500).json({ msg: error.message });
            }
        });
        this.ModifyUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { img, firstName, lastName } = req.body;
            try {
                const mainSaveData = {
                    firstName: firstName,
                    lastName: lastName,
                    profileImg: img ? img : req.user.profileImg
                };
                const response = yield this.conn.ModifyUser(req.user.email, mainSaveData);
                if (!response)
                    return res.status(400).json({ msg: 'error updating user' });
                return res.json({ msg: 'user updated' });
            }
            catch (error) {
                bunyan_config_1.default.info(error);
                return res.status(500).json({ msg: error.message });
            }
        });
        this.GetRandomConnection = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const limit = parseInt(req.query.limit);
            try {
                const response = yield this.conn.GetRandomUser(req.user.email, limit ? limit : 1);
                const result = response.map((user) => {
                    const { comments, createdAt, likedPosts, repostedPosts, uploads, updatedAt, posts, password } = user, responseUser = __rest(user, ["comments", "createdAt", "likedPosts", "repostedPosts", "uploads", "updatedAt", "posts", "password"]);
                    return responseUser;
                });
                return res.json({ payload: result });
            }
            catch (error) {
                bunyan_config_1.default.info(error);
                return res.status(500).json({ msg: error.message });
            }
        });
        this.GetUserConnections = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.params.userID;
            try {
                const response = yield this.conn.GetConnections(user);
                return res.json({ payload: response });
            }
            catch (error) {
                bunyan_config_1.default.error(error);
                return res.status(500).json({ msg: error.message });
            }
        });
        this.AddConnection = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const connectionID = req.params.ID;
            const email = req.user.email;
            try {
                const response = yield this.conn.AddConnection(email, connectionID);
                if (!response)
                    return res.status(400).json({ msg: 'error adding connection' });
                const data = {
                    content: `You were just followed by ${req.user.email}`,
                    createdBy: req.user._id,
                    for: connectionID,
                    title: 'New Following'
                };
                const createNotification = yield this.conn.CreateNotification(data);
                return res.json({ payload: 'Connection added' });
            }
            catch (error) {
                bunyan_config_1.default.error(error);
                return res.status(500).json({ msg: error.message });
            }
        });
        this.RemoveConnection = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const connectionID = req.params.ID;
            const email = req.user.email;
            try {
                const response = yield this.conn.RemoveConnection(email, connectionID);
                if (!response)
                    return res.status(400).json({ msg: 'error removing connection' });
                return res.json({ payload: 'Connection added' });
            }
            catch (error) {
                bunyan_config_1.default.error(error);
                return res.status(500).json({ msg: error.message });
            }
        });
        this.GetUserProfileImg = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const email = req.params.email;
            try {
                const response = yield this.conn.GetProfileImg(email);
                return res.send(response);
            }
            catch (error) {
                bunyan_config_1.default.error(error);
                return res.status(500).json({ msg: error.message });
            }
        });
        this.conn = connection;
    }
}
// main exports
exports.default = UserController;
