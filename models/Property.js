
export class Property{

    constructor(
        id = "",
        address = "",
        pricePerMonth = 0.0,
        city = "",
        state = "",
        zipcode = "",
        images = [],
        description = "",
        reviews = [],
        avgRating = 0.0,
        landlord = ""
    )
    { 
        this.id = id;
        this.address = address;
        this.pricePerMonth = pricePerMonth;
        this.state = city;
        this.state = state;
        this.zipccode = zipcode;
        this.images = images;
        this.description = description;
        this.reviews = reviews;
        this.avgRating = avgRating;
        this.landlord = landlord;
    }
}
