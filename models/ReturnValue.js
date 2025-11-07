
export class ReturnValue{
    constructor(success, errorMsg, resultData = {}, resultList = [])
    {
        this.success = success;
        this.errorMsg = errorMsg;
        this.resultData = resultData;
        this.resultList = resultList;
    }
}