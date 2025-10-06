import { User } from "./User";

export class ReturnValue{
    constructor(success, errorMsg, userData = new User("", "", false, false))
    {
        this.success = success;
        this.errorMsg = errorMsg;
        this.userData = userData;
    }
}