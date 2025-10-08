import { User } from "./User";

export class ReturnValue{
    constructor(success, errorMsg, userData = new User(), propertyData = new Property())
    {
        this.success = success;
        this.errorMsg = errorMsg;
        this.userData = userData;
        this.propertyData = propertyData;
    }
}