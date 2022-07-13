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
const bunyan_config_1 = __importDefault(require("../config/bunyan.config"));
class Notifications {
    constructor(connection) {
        this.GetNotifications = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const email = req.user.email;
            try {
                const response = yield this.conn.GetNotifications(email);
                return res.json({ payload: response });
            }
            catch (error) {
                bunyan_config_1.default.error(error);
                return res.status(500).json({ msg: error.message });
            }
        });
        this.SetNotificationAsRead = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const ID = req.params.notificationID;
            const email = req.user.email;
            try {
                const response = yield this.conn.ChangeNotificationStatus(email, ID);
                if (!response)
                    return res.status(400).json({ msg: 'error' });
                return res.json({ msg: 'notification modified' });
            }
            catch (error) {
                bunyan_config_1.default.error(error);
                return res.status(500).json({ msg: error.message });
            }
        });
        this.RemoveNotification = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const ID = req.params.notificationID;
            const email = req.user.email;
            try {
                const response = yield this.conn.DeleteNotification(email, ID);
                if (!response)
                    return res.status(400).json({ msg: 'error' });
                return res.json({ msg: 'success' });
            }
            catch (error) {
                bunyan_config_1.default.error(error);
                return res.status(500).json({ msg: error.message });
            }
        });
        this.ClearNotifications = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const email = req.user.email;
            try {
                const response = yield this.conn.ClearAllNotifications(email);
                if (!response)
                    return res.status(400).json({ msg: 'error' });
                return res.json({ msg: 'success' });
            }
            catch (error) {
                bunyan_config_1.default.error(error);
                return res.status(500).json({ msg: error.message });
            }
        });
        this.conn = connection;
    }
}
exports.default = Notifications;
