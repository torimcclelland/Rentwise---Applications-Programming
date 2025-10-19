
export class User{

    constructor({
        userID = "",
        email = "",
        password = "",
        firstName = "",
        lastName = "",
        displayName = "",
        isLandLord = false,
        isPremUser = false,
        properties = [],
    } = {}){ 
        this.userID = userID;
        this.email = email;
        this.password = password;
        this.isLandLord = isLandLord;
        this.isPremUser = isPremUser;
        this.properties = properties;
        this.firstName = firstName;
        this.lastName = lastName;
        this.displayName = displayName;
    }
}
