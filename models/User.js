
export class User{

    constructor({
        userID = "",
        email = "",
        password = "",
        firstName = "",
        lastName = "",
        isLandlord = false,
        isPremUser = false,
        properties = [],
        profilePicture = ""
    } = {}){ 
        this.userID = userID;
        this.email = email;
        this.password = password;
        this.isLandlord = isLandlord;
        this.isPremUser = isPremUser;
        this.properties = properties;
        this.firstName = firstName;
        this.lastName = lastName;
        this.profilePicture = profilePicture
    }
}
