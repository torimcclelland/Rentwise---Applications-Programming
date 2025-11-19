export class Payment{

    constructor({
        paymentID = "",
        userID = "",
        date = "",
        description = "",
        amount = 0.0,
        status = ""
    } = {}){ 
        this.paymentID = paymentID;
        this.userID = userID;
        this.date = date;
        this.description = description;
        this.amount = amount;
        this.status = status;     
    }
}
