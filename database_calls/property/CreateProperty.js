import { addDoc, collection } from 'firebase/firestore';
import { ReturnValue } from '../../models/ReturnValue';
import { db } from '../../firebaseConfig';
import { getPropertyByID } from './GetPropertyByID';

/** 
 * @param {Property} newProperty The details of the property to create
 * @returns {ReturnValue} The results of the operation. If successful, the resultData field contains the details of the newly created property.
 */

export async function createProperty(newProperty) {

    var result = new ReturnValue(false, "");

    // bad data handling
    if(!newProperty.address.trim()
        || !newProperty.monthlyPrice.trim()
        || !newProperty.city.trim()
        || !newProperty.state.trim()
        || !newProperty.zipcode.trim()
        || !newProperty.description.trim()
        || !newProperty.numBeds.trim()
        || !newProperty.numBath.trim()
        || !newProperty.laundry.trim()
        || !newProperty.parking.trim()
        || !newProperty.typeOfHome.trim()
        || !newProperty.petsAllowed.trim()
        || !newProperty.petType.trim()
        || !newProperty.furnished.trim()
        ){
        result = new ReturnValue(false, "All data fields must have a value.")
        return result;
    }

    // if(!Number.isInteger(newProperty.monthlyPrice)
    //     ||!Number.isInteger(newProperty.numBeds)
    //     ||!Number.isInteger(newProperty.numBath)
    // ){
    //     result = new ReturnValue(false, "All data fields must contain valid values.")
    //     return result;
    // }

    if(!newProperty.images){
        result = new ReturnValue(false, "At least one image must be provided.")
        return result;
    }
    if(!newProperty.landlordID){
        result = new ReturnValue(false, "A landlord must be provided.")
        return result;
    }

    // try catch to handle any errors
    try{
        // try to store property in database
        if (!newProperty) throw new Error("newProperty is undefined");
        
        const tempCol = collection(db, 'Properties')
        const docRef = await addDoc(tempCol, {...newProperty});

        // here the propertyID is set as the document id just in the property object, it is still "setLater" in the database
        newProperty.propertyID = docRef.id
        
        // retrieve newly made property by calling the getPropertyByID function
        result = await getPropertyByID(newProperty.propertyID);

    } catch(e){
        let error = ""; 
        if (e instanceof Error) {
            error = e.message // works, `e` narrowed to Error
        } else{
            error = "Had a problem with typescript error handling when adding property."
        }

        result = new ReturnValue(false, error)
    }
    
    return result;
    
}