
export class ReturnValue{
    constructor(success, errorMsg, applicationData = {}, notificationData = {}, notificationList = [],
                conversationData = {}, conversationList = [], resultData = {}, resultList = [])
    {
        this.success = success;
        this.errorMsg = errorMsg;
        this.applicationData = applicationData;
        this.notificationData = notificationData;
        this.notificationList = notificationList;
        this.resultData = resultData;
        this.resultList = resultList;
    }
}