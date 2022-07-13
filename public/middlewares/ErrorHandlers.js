"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateRequest = exports.HandleGeneralError = exports.HandlePageNotFound = exports.HandleIconError = void 0;
const express_validator_1 = require("express-validator");
// main function to catch icon error
function HandleIconError(req, res, next) {
    if (req.url === '/favicon.ico')
        return res.end();
    return next();
}
exports.HandleIconError = HandleIconError;
// 404 page not found error
function HandlePageNotFound(req, res) {
    return res.status(404).json({ msg: 'Page not found' });
}
exports.HandlePageNotFound = HandlePageNotFound;
// function to get all errors and send a message along
function HandleGeneralError(req, res) {
    const errMsg = req.params.errorMsg;
    return res.status(400).json({ msg: errMsg ? errMsg : 'error' });
}
exports.HandleGeneralError = HandleGeneralError;
// function that checks for the completion of the validation result
function ValidateRequest(req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).json({ msg: errors.array() });
    return next();
}
exports.ValidateRequest = ValidateRequest;
