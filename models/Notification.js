
class Notification{

    constructor({
        datetime = "",
        message = "",
        isNew = 0,
    })
    { 
        this.datetime = datetime;
        this.message = message;
        this.isNew = isNew;
    }
}

class NotificationList{
    
    constructor({
        notifID = "",
        userID = "",
        notifications = [],
    })
    { 
        this.notifID = notifID;
        this.userID = userID;
        this.notifications = notifications;
    }
}

export { Notification, NotificationList }