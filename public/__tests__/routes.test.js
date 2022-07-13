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
const server_1 = __importDefault(require("../server"));
const supertest_1 = __importDefault(require("supertest"));
const chai_1 = require("chai");
const developmentConnection_1 = __importDefault(require("../database/developmentConnection"));
// tests for general error routes
describe('General error routes', () => {
    const conn = new developmentConnection_1.default();
    const app = (0, server_1.default)(conn);
    it('should have a general error route', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/api/error');
        (0, chai_1.expect)(response.statusCode).to.be.equal(400);
        (0, chai_1.expect)(response.body.msg).to.exist;
    }));
    it('should return error messages', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/api/error/test-case');
        (0, chai_1.expect)(response.statusCode).to.be.equal(400);
        (0, chai_1.expect)(response.body.msg).to.be.eql('test-case');
    }));
});
describe('running error pages test', () => {
    const conn = new developmentConnection_1.default();
    const app = (0, server_1.default)(conn);
    const testCases = ['/test', '/api/test', '/api/v2/test'];
    testCases.forEach((test) => {
        it('should return true', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).get(test);
            (0, chai_1.expect)(response.statusCode).to.be.equal(404);
        }));
        it('should return exists', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).get(test);
            (0, chai_1.expect)(response.body.msg).to.not.be.undefined;
        }));
    });
});
// test for authentication routes
describe.skip('Authentication routes', () => { });
