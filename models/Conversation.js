
export class Property{

    constructor({
        conversationID = "",
        landlordID = "",
        renterID = "",
        messages = []
    })
    { 
        this.conversationID = conversationID;
        this.landlordID = landlordID;
        this.renterID = renterID;
        this.messages = messages;
    }
}
