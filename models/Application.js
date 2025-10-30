export class Application{


    constructor({
        landlordID = "",
        renterID = "",
        firstName= "",
        lastName= "",
        email= "",
        dob = Date(),
        phoneNumber= "",
        DLNumber = "",
        maritialStatus = "",
        prevAddress = "",
        startDate = Date(),
        endDate = Date(),
        presentLandlord = "",
        landlordPhone = "",
        leaveReason = "",
        rentAmount = ""
    })
    {
        this.landlordID = landlordID,
        this.renterID = renterID,
        this.firstName= firstName,
        this.lastName= lastName,
        this.email= email,
        this.dob = dob,
        this.phoneNumber= phoneNumber,
        this.DLNumber = DLNumber,
        this.maritialStatus = DLNumber,
        this.prevAddress = prevAddress,
        this.startDate = startDate,
        this.endDate = endDate,
        this.presentLandlord = presentLandlord,
        this.landlordPhone = landlordPhone,
        this.leaveReason = leaveReason,
        this.rentAmount = rentAmount
    }
}