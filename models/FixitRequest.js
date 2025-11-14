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
        this.explanation = explanation;
        this.category = category;
        this.submissontime = submissontime;
       
    }
}
