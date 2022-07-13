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
        users: '/api/v2/users',
        user: '/api/v2/users/daniel@gmail.com',
        modify: '/api/v2/users/modify',
        delete: '/api/v2/users/delete'
    };
    const data = {
        email: 'daniel@gmail.com',
        password: 'daniel'
    };
    const conn = new developmentConnection_1.default();
    const app = (0, server_1.default)(conn);
    it('should send a list of users', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get(API.users);
        (0, chai_1.expect)(response.statusCode).to.be.equal(200);
        (0, chai_1.expect)(response.body.payload.results).to.have.lengthOf.at.least(3);
    }));
    it('should return back a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const loginRes = yield (0, supertest_1.default)(app).post(API.login).send(data);
        const response = yield (0, supertest_1.default)(app)
            .get(API.user)
            .set('Authorization', `Bearer: ${loginRes.body.payload.token}`);
        (0, chai_1.expect)(response.statusCode).to.be.equal(200);
        (0, chai_1.expect)(response.body.payload).to.have.keys('email', 'firstName', 'lastName', '_id');
        (0, chai_1.expect)(response.body.payload).to.have.property('email').that.is.eql(data.email);
    }));
    it('should modify the user data', () => __awaiter(void 0, void 0, void 0, function* () {
        const modifyData = {
            firstName: 'joshua'
        };
        const firstRes = yield (0, supertest_1.default)(app).post(API.login).send(data);
        const response = yield (0, supertest_1.default)(app)
            .get(API.user)
            .send(modifyData)
            .set('Authorization', `Bearer: ${firstRes.body.payload.token}`);
        (0, chai_1.expect)(response.statusCode).to.be.equal(200);
        const testRes = yield (0, supertest_1.default)(app).get(API.user)
            .set('Authorization', `Bearer: ${firstRes.body.payload.token}`);
        // expect(testRes.body.payload.firstName).to.be.eql(modifyData.firstName);
    }));
    it('should delete the user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post(API.login).send(data);
        const delRes = yield (0, supertest_1.default)(app)
            .delete(API.delete)
            .set('Authorization', `Bearer: ${response.body.payload.token}`);
        (0, chai_1.expect)(delRes.statusCode).to.be.equal(200);
        const userRes = yield (0, supertest_1.default)(app)
            .get(API.user)
            .set('Authorization', `Bearer: ${response.body.payload.token}`);
        // expect(userRes.body.payload).to.be.empty;
    }));
});
