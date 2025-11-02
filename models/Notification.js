
export class Notification{

    constructor({
        notificationID = "",
        userID = "",
        message = ""
    })
    { 
        this.notificationID = notificationID;
        this.userID = userID;
        this.message = message;
    }
}
