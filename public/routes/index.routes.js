"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// imports
const express_1 = __importDefault(require("express"));
const index_v2_routes_1 = __importDefault(require("./v2/index.v2.routes"));
const ErrorHandlers_1 = require("../middlewares/ErrorHandlers");
// create router
const router = express_1.default.Router();
// routes handles
exports.default = (conn) => {
    // this makes use of the jswt version of authentication
    router.use('/v2', (0, index_v2_routes_1.default)(conn));
    // route for catching errors
    router.get('/error', ErrorHandlers_1.HandleGeneralError);
    // route for catching errors with a message
    router.get('/error/:errorMsg', ErrorHandlers_1.HandleGeneralError);
    // main return
    return router;
};
