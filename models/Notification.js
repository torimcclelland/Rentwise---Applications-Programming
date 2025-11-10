
class Notification{

    constructor({
        date = "",
        message = "",
        listID = "",
        isNew = 0,
    })
    { 
        this.date = date;
        this.message = message;
        this.listID = listID;
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