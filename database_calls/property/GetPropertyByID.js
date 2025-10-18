import { doc, getDoc } from 'firebase/firestore';
import { User } from '../../models/User';
import { ReturnValue } from '../../models/ReturnValue';
import { db } from '../../firebaseConfig';
import { Property } from '../../models/Property';
import { snapshotToProperty } from '../../models/ConversionFunctions';

/**
 * 
 * @param {Property} propertyToFind The details of the user to find by id (id field must not be empty)
 * @returns {ReturnValue} The results of the operation. If successful, the userData field contains the details of the retrieved user.
 */
export async function getPropertyByID(propertyToFind) {

    var result = new ReturnValue(false, "");
    
    if(propertyToFind.propertyID == ""){
        result = new ReturnValue(false, "Property ID must not be empty.")
        return result
    }

    // try catch to handle any errors
    try{
        
        // try to find user by ID
        const propertyRef = doc(db, 'Properties', propertyToFind.propertyID)

        const snapshot = await getDoc(propertyRef);

        if (snapshot.data() == undefined) {
            result = new ReturnValue(false, "No snapshots found for property with id " + propertyToFind.propertyID);
            return result;
        } 

        // TODO: make a conversion function
        const propertyRetrieved = snapshotToProperty(snapshot);
        // success
        result = new ReturnValue(true, "")
        result.propertyData = propertyRetrieved

    } catch(e){
        let error = ""; 
        if (e instanceof Error) {
            error = e.message + " (find property problem)" // works, `e` narrowed to Error
        } else{
            error = "Had a problem with typescript error handling when finding property."
        }

        result = new ReturnValue(false, error)
    }
    
    return result;
    
}