"use strict";
// please keep in mind that 
// ts-node would only allow "app" 
// to run when the file you are 
// importing from is the same name or named
// server also
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bunyan_config_1 = __importDefault(require("../config/bunyan.config"));
const server_1 = __importDefault(require("../server"));
const http_1 = __importDefault(require("http"));
const env_config_1 = __importDefault(require("../config/env.config"));
const mongoConnection_1 = __importDefault(require("../database/mongoConnection"));
// import ip from 'ip';
// import DevelopmentAPI from '../database/developmentConnection';
// use the env variables
(0, env_config_1.default)();
// create instance of the database connection
const conn = new mongoConnection_1.default(process.env.URL);
// const dev = new DevelopmentAPI();
// get app from server app function
const serverApp = (0, server_1.default)(conn);
const server = http_1.default.createServer(serverApp);
// address for the ip on the public network
// const address = ip.address();
const port = process.env.PORT || 2022;
serverApp.set('port', port);
function onListening() {
    // Log.info(`server active on http://${address}:${port}`);
    bunyan_config_1.default.info(`server active on http://localhost:${port}`);
}
function onError(error) {
    switch (error.code) {
        case 'EACCES':
            bunyan_config_1.default.error(error.message);
            return process.exit(1);
        case 'EADDRINUSE':
            bunyan_config_1.default.error(error.message);
            return process.exit(1);
        default:
            throw error;
    }
}
server.on('listening', onListening);
server.on('error', onError);
// iniitate server
// this one works for opening the server on a public network
// server.listen(port, parseInt(address));
server.listen(port);
