
export class Conversation{

    constructor({
        conversationID = "",
        users = [],
        messages = []
    })
    { 
        this.conversationID = conversationID;
        this.users = users;
        this.messages = messages;
    }
}
