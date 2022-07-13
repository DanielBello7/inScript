"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const developmentConnection_1 = __importDefault(require("../database/developmentConnection"));
const server_1 = __importDefault(require("../server"));
describe('Authentication tests', () => {
    const API = {
        login: '/api/v2/auth/login',
        user: '/api/v2/users/daniel@gmail.com',
    };
    const data = {
        email: 'daniel@gmail.com',
        password: 'daniel'
    };
    const conn = new developmentConnection_1.default();
    const app = (0, server_1.default)(conn);
    it('');
});
