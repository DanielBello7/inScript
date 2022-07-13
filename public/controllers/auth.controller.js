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
const authenticate_1 = require("../middlewares/authenticate");
const bunyan_config_1 = __importDefault(require("../config/bunyan.config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// create the authentication controller
class AuthController {
    constructor(connection) {
        this.LoginUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            try {
                const response = yield this.conn.GetUser(email);
                if (response.length <= 0)
                    return res.status(400).json({ msg: 'User not registered' });
                const confirmation = yield bcrypt_1.default.compare(req.body.password, response[0].password);
                if (!confirmation)
                    return res.status(400).json({ msg: 'Invalid credentials' });
                const _a = response[0], { password } = _a, user = __rest(_a, ["password"]);
                const token = (0, authenticate_1.generateToken)(user);
                const payload = { user, token };
                return res.json({ payload });
            }
            catch (error) {
                bunyan_config_1.default.info(error);
                return res.status(500).json({ msg: error.message });
            }
        });
        this.LogoutUser = (req, res) => {
            req.user = null;
            return res.json({ msg: 'logged out' });
        };
        this.CurrentUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.conn.GetUser(req.user.email);
                const _b = response[0], { password } = _b, user = __rest(_b, ["password"]);
                return res.json({ payload: user });
            }
            catch (error) {
                bunyan_config_1.default.error(error);
                return res.status(500).json({ msg: error.message });
            }
        });
        this.conn = connection;
    }
}
// export
exports.default = AuthController;
