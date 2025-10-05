import { User } from "./User";

export class ReturnValue{
    constructor(
        public success: boolean,
        public errorMsg: string,
        public userData: User = new User("", "", false, false)
    ){}
}