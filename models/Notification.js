
class Notification{

    constructor({
        date = "",
        message = "",
        isNew = 0,
    })
    { 
        this.date = date;
        this.message = message;
        this.isNew = isNew;
    }
}

class NotificationList{
    
    constructor({
        userID = "",
        notifications = [],
    })
    { 
        this.userID = userID;
        this.notifications = notifications;
    }
}

export { Notification, NotificationList }