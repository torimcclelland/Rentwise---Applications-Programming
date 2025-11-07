import { ReturnValue } from '../../models/ReturnValue';
import { db } from '../../firebaseConfig';
import { getPropertyByID } from './GetPropertyByID';
import { doc, setDoc } from 'firebase/firestore';


/** 
 * @param {Property} thisProperty The details of the property to update
 * @returns {ReturnValue} The results of the operation. If successful, the resultData field contains the details of the updated property.
 */
export async function updateProperty(thisProperty) {

    var result = new ReturnValue(false, "");

    // try catch to handle any errors
    try{
        // try to store property in database
        if (!thisProperty) throw new Error("thisProperty is undefined");
        
        const propertyRef = doc(db, 'Properties', thisProperty.propertyID)
        const docRef = await setDoc(propertyRef, {...thisProperty})
        thisProperty.propertyID = propertyRef.id
        

        // retrieve updated property details by calling the GetProperty function
        result = await getPropertyByID(thisProperty.propertyID);

    } catch(e){
        let error = ""; 
        if (e instanceof Error) {
            error = e.message // works, `e` narrowed to Error
        } else{
            error = "Had a problem with typescript error handling when updating property."
        }

        result = new ReturnValue(false, error)
    }
    
    return result;
    
}

