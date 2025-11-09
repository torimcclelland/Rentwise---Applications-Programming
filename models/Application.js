export class Application{


    constructor({
        applicationID = "",
        landlordID = "",
        renterID = "",
        propertyID = "",
        firstName= "",
        lastName= "",
        email= "",
        dob = Date(),
        phoneNumber= "",
        DLNumber = "",
        maritalStatus = "",
        prevAddress = "",
        startDate = Date(),
        endDate = Date(),
        presentLandlord = "",
        landlordPhone = "",
        leaveReason = "",
        rentAmount = 0
    })
    {
        this.applicationID = applicationID
        this.landlordID = landlordID,
        this.renterID = renterID,
        this.propertyID = propertyID,
        this.firstName= firstName,
        this.lastName= lastName,
        this.email= email,
        this.dob = dob,
        this.phoneNumber= phoneNumber,
        this.DLNumber = DLNumber,
        this.maritalStatus = maritalStatus,
        this.prevAddress = prevAddress,
        this.startDate = startDate,
        this.endDate = endDate,
        this.presentLandlord = presentLandlord,
        this.landlordPhone = landlordPhone,
        this.leaveReason = leaveReason,
        this.rentAmount = rentAmount
    }
}