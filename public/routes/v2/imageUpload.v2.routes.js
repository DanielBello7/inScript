"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// imports
const image_controller_1 = __importDefault(require("../../controllers/image.controller"));
const authenticate_1 = require("../../middlewares/authenticate");
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const ErrorHandlers_1 = require("../../middlewares/ErrorHandlers");
// create router
const router = express_1.default.Router();
// main export
exports.default = (conn) => {
    const image = new image_controller_1.default(conn);
    // route for uploading images --[POST]
    router.post('/', authenticate_1.__verifyUser, image.PostImage);
    // route for uploading images using cloudinary --[POST]
    router.post('/cloudinary', [
        (0, express_validator_1.check)('image_file').isString(),
        (0, express_validator_1.check)('name').isString().escape(),
        (0, express_validator_1.check)('size').isNumeric().escape(),
        (0, express_validator_1.check)('extension').isString().escape()
    ], ErrorHandlers_1.ValidateRequest, authenticate_1.__verifyUser, image.CloudinarySave);
    // route for sending image --[GET]
    router.get('/:img', authenticate_1.__verifyUser, image.GetImage);
    // default return 
    return router;
};
