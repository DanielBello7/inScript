


export type NotificationsType = {
     _id: string,
     createdAt: Date,
     updatedAt: Date,
     title: string,
     content: string,
     isRead: boolean,
     createdFrom: string,
     for: string | null
}

export type NewNotificationType = {
     title: string,
     content: string,
     for: string | null,
     createdBy: string
}