
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
    }
}
