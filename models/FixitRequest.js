export const maintenanceCategories = [
    'Plumbing',
    'Electrical',
    'Heating/Cooling',
    'Appliance Repair',
    'Pest Control',
    'General Repairs',
    'Other',
  ];

export class FixitRequest{

    constructor({
        userID = "",
        explanation = "",
        category = "",
        submissontime = "",

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
