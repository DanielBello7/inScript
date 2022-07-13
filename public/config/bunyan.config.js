"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// imports
const bunyan_1 = __importDefault(require("bunyan"));
const path_1 = __importDefault(require("path"));
// create logger
const Log = bunyan_1.default.createLogger({
    name: 'dev',
    level: 'debug',
    src: true,
    streams: [
        {
            // this enables that you can have the logs shown on the console
            level: 'info',
            stream: process.stdout
        },
        {
            // this saves all the informtion to a log file
            level: 'info',
            path: path_1.default.join(__dirname, '../logs/bunyan.log')
        },
        {
            level: 'error',
            path: path_1.default.join(__dirname, '../logs/bunyan-errors.log')
        }
    ]
});
// main export
exports.default = Log;
