


import express from 'express';
import { __verifyUser } from '../../middlewares/authenticate';
import { DatabaseType } from '../../types/Database.type';
import Notifications from '../../controllers/notifications.controller';


const router = express.Router();

export default (conn: DatabaseType) => {

     const notification = new Notifications(conn);

     router.get('/', __verifyUser, notification.GetNotifications);

     router.patch('/:notificationID', __verifyUser, notification.SetNotificationAsRead);

     router.delete('/', __verifyUser, notification.ClearNotifications);

     router.delete('/:notificationID', __verifyUser, notification.RemoveNotification);

     return router;
}