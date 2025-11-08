
class Notification{

    constructor({
        date = "",
        message = "",
        image = ""
    })
    { 
    }
}

class NotificationList{
    
    constructor({
        notificationID = "",
        userID = "",
        notifications = [],
        isNew = 0,
    })
    { 
        this.notificationID = notificationID;
        this.userID = userID;
        this.notifications = notifications;
    }
}

export { Notification, NotificationList }