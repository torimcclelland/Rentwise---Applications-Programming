
class Conversation{

    constructor({
        conversationID = "",
        renterID = "",
        landlordID = "",
        messages = [],
        renterData = {},
        landlordData ={}
    } = {})
    { 
        this.conversationID = conversationID;
        this.renterID = renterID;
        this.landlordID = landlordID;
        this.messages = messages;
        this.renterData = renterData;
        this.landlordData = landlordData;
    }
}

class Message{
    constructor({
        messageText = "",
        senderID = "",
        datetime = "",
        isNew = 0
    } = {})
    {
        this.messageText = messageText;
        this.senderID = senderID;
        this.datetime = datetime;
        this.isNew = isNew;
    }
}


export { Conversation, Message }