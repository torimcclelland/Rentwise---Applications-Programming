import { Conversation } from "./models/Conversation";
import { User } from "./models/User";

export class GlobalValues {
    static currentUser = new User();
    static conversationData = new Conversation();
}