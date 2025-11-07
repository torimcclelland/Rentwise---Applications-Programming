import { doc, getDoc } from 'firebase/firestore';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { ReturnValue } from '../../models/ReturnValue';
import { db } from '../../firebaseConfig';
import { Property } from '../../models/Property';
import { snapshotToProperty } from '../../models/ConversionFunctions';

/**
 * 
 * @param {string} propertyToFind The id of the property to find
 * @returns {ReturnValue} The results of the operation. If successful, the resultData field contains the details of the retrieved property.
 */
export async function getPropertyByID(propertyToFind) {

    var result = new ReturnValue(false, "");
    
    if(!propertyToFind){
        result = new ReturnValue(false, "Property ID must not be empty.")
        return result
    }

    // try catch to handle any errors
    try{
         const propertyRef = doc(db, 'Properties', propertyToFind)
    
         const snapshot = await getDoc(propertyRef);

        if (snapshot.data() == undefined) {
            result = new ReturnValue(false, "No snapshots found for property with id " + propertyToFind);
            return result;
        } 

        const propertyRetrieved = snapshotToProperty(snapshot);

        // success
        result = new ReturnValue(true, "")
        result.resultData = propertyRetrieved.resultData

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