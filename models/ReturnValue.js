import { User } from "./User";
import { Property } from './Property';

export class ReturnValue{
    constructor(success, errorMsg, userData = new User())
    {
        this.success = success;
        this.errorMsg = errorMsg;
        this.userData = userData;
    }
}