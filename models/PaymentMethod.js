export class PaymentMethod{

    constructor({
        paymentMethodID = "",
        userID = "",
        name = ""
    } = {}){ 
        this.paymentMethodID = paymentMethodID;
        this.userID = userID;
        this.name = name;
 
    }
}
