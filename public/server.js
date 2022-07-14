"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// imports
const express_1 = __importDefault(require("express"));
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const compression_1 = __importDefault(require("compression"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const secret_config_1 = __importDefault(require("./config/secret.config"));
const ErrorHandlers_1 = require("./middlewares/ErrorHandlers");
// main server application
function ServerApp(conn) {
    // create express app
    const app = (0, express_1.default)();
    // list of accepted domain names
    const whiteList = ["https://inscript-connect.web.app"];
    // middlewares
    app.use((0, cors_1.default)({
        credentials: true,
        origin: whiteList
    }));
    app.use((0, compression_1.default)());
    app.use(express_1.default.json());
    app.use((0, express_fileupload_1.default)());
    app.use('/static', express_1.default.static(path_1.default.join(__dirname, 'static')));
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(secret_config_1.default);
    app.use(ErrorHandlers_1.HandleIconError);
    app.use('/api', (0, index_routes_1.default)(conn));
    app.use(ErrorHandlers_1.HandlePageNotFound);
    // return the app
    return app;
}
// export express app to server
exports.default = ServerApp;
