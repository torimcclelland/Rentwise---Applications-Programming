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
        fixitID = "",
        userID = "",
        explanation = "",
        category = "",
        submissontime = "",
        landlordID = "",
        propertyID = ""

    } = {}){ 
        this.fixitID = fixitID;
        this.userID = userID;
        this.explanation = explanation;
        this.category = category;
        this.submissontime = submissontime;
        this.landlordID = landlordID;
        this.propertyID = propertyID;       
    }
}
