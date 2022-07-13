"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// main secret function
function ExpressSecret(req, res, next) {
    req.secret = process.env.SECRET;
    return next();
}
exports.default = ExpressSecret;
