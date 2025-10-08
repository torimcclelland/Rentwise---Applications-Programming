
export class Property{

    constructor(
        id = "",
        landlordID = "",
        address = "",
        monthlyPrice = 0.0,
        city = "",
        state = "",
        zipcode = "",
        images = [],
        description = "",
        reviews = [],
        avgRating = 0.0,
    )
    { 
        this.id = id;
        this.landlordID = landlordID;
        this.address = address;
        this.monthlyPrice = monthlyPrice;
        this.city = city;
        this.state = state;
        this.zipccode = zipcode;
        this.images = images;
        this.description = description;
        this.reviews = reviews;
        this.avgRating = avgRating;
    }
}
