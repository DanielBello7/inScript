"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticate_1 = require("../../middlewares/authenticate");
const notifications_controller_1 = __importDefault(require("../../controllers/notifications.controller"));
const router = express_1.default.Router();
exports.default = (conn) => {
    const notification = new notifications_controller_1.default(conn);
    router.get('/', authenticate_1.__verifyUser, notification.GetNotifications);
    router.patch('/:notificationID', authenticate_1.__verifyUser, notification.SetNotificationAsRead);
    router.delete('/', authenticate_1.__verifyUser, notification.ClearNotifications);
    router.delete('/:notificationID', authenticate_1.__verifyUser, notification.RemoveNotification);
    return router;
};
