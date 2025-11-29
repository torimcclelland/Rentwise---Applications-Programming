
export class Property{

    constructor({
        propertyID = "",
        landlordID = "",
        renterID = "",
        address = "",
        monthlyPrice = 0.0,
        city = "",
        state = "",
        zipcode = "",
        images = [],
        description = "",
        reviews = [],
        avgRating = 0.0,
        numBeds = "",
        numBath = "",
        laundry = "",
        parking = "",
        typeOfHome = "",
        petsAllowed = "",
        petType = "",
        furnished = ""
    })
    { 
        this.propertyID = propertyID;
        this.landlordID = landlordID;
        this.renterID = renterID;
        this.address = address;
        this.monthlyPrice = monthlyPrice;
        this.city = city;
        this.state = state;
        this.zipcode = zipcode;
        this.images = images;
        this.description = description;
        this.reviews = reviews;
        this.avgRating = avgRating;
        this.numBeds = numBeds;
        this.numBath = numBath;
        this.laundry = laundry;
        this.parking = parking;
        this.typeOfHome = typeOfHome;
        this.petsAllowed = petsAllowed;
        this.petType = petType;
        this.furnished = furnished;
    }
}
