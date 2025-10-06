
export class User{

    constructor(email, password, isLandLord, isPremiumUser, properties = [], id = "", firstName = "", lastName = "", displayName = "")
    { 
        this.email = email;
        this.password = password;
        this.isLandLord = isLandLord;
        this.isPremiumUser = isPremiumUser;
        this.properties = properties;
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.displayName = displayName;
    }
}
