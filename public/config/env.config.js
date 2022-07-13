"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// imports
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// setting the env variables
const envPath = process.env.NODE_ENV === 'dev' ? 'dev.env' : 'prod.env';
exports.default = () => dotenv_1.default.config({
    path: path_1.default.join(__dirname, `../env/${envPath}`)
});