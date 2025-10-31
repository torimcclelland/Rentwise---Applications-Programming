import { User } from "./User";
import { Property } from './Property';

export class ReturnValue{
    constructor(success, errorMsg, userData = {}, propertyData = {}, propertyList = [], applicationData = {})
    {
        this.success = success;
        this.errorMsg = errorMsg;
        this.userData = userData;
        this.propertyData = propertyData;
        this.propertyList = propertyList;
        this.applicationData = applicationData
    }
}