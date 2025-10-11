
export class User{

    constructor(
        id = "",
        email = "",
        password = "",
        firstName = "",
        lastName = "",
        displayName = "",
        isLandLord = false,
        isPremUser = false,
        properties = [],
    )
    { 
        this.email = email;
        this.password = password;
        this.isLandLord = isLandLord;
        this.isPremUser = isPremUser;
        this.properties = properties;
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.displayName = displayName;
    }
}
