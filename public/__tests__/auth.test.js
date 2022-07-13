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
const supertest_1 = __importDefault(require("supertest"));
const developmentConnection_1 = __importDefault(require("../database/developmentConnection"));
const server_1 = __importDefault(require("../server"));
const chai_1 = require("chai");
describe('Authentication tests', () => {
    const API = {
        login: '/api/v2/auth/login',
        logout: '/api/v2/auth/logout',
        user: '/api/v2/auth/user'
    };
    const data = {
        email: 'daniel@gmail.com',
        password: 'daniel'
    };
    const conn = new developmentConnection_1.default();
    const app = (0, server_1.default)(conn);
    it('should return a 200 on a successful login', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post(API.login).send(data);
        (0, chai_1.expect)(response.statusCode).to.be.equal(200);
    }));
    it('should return a 400 with a message on failed login', () => __awaiter(void 0, void 0, void 0, function* () {
        const data = {
            email: 'daniel@gmail.com',
            passowrd: 'david'
        };
        const response = yield (0, supertest_1.default)(app).post(API.login).send(data);
        (0, chai_1.expect)(response.statusCode).to.be.equal(400);
        (0, chai_1.expect)(response.body.msg).to.exist;
    }));
    it('should return the current user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post(API.login).send(data);
        const user = yield (0, supertest_1.default)(app).get(API.user).set('Authorization', `Bearer: ${response.body.payload.token}`);
        (0, chai_1.expect)(user.body.payload).to.be.an('object').that.contains.keys('email', 'firstName');
    }));
    it('should log the user out', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post(API.login).send(data);
        const logoutResponse = yield (0, supertest_1.default)(app).get(API.logout).set('Authorization', `Bearer: ${response.body.payload.token}`);
        (0, chai_1.expect)(logoutResponse.statusCode).to.be.equal(200);
    }));
    it('should check for parameters', () => __awaiter(void 0, void 0, void 0, function* () {
        const data = {
            email: 'daniel@gmail.com'
        };
        const response = yield (0, supertest_1.default)(app).post(API.login).send(data);
        (0, chai_1.expect)(response.statusCode).to.be.equal(400);
    }));
    it('should return a 401 if no token is passed', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get(API.user);
        (0, chai_1.expect)(response.statusCode).to.be.equal(401);
    }));
});
