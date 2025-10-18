import { addDoc, collection } from 'firebase/firestore';
import { User } from '../../models/User';
import { ReturnValue } from '../../models/ReturnValue';
import { db } from '../../firebaseConfig';
import { getPropertyByID } from './GetPropertyByID';

/** 
 * @param {User} thisProperty The details of the property to update
 * @returns {ReturnValue} The results of the operation. If successful, the propertyData field contains the details of the updated property.
 */
export async function updateUser(thisProperty) {

    var result = new ReturnValue(false, "");

    // try catch to handle any errors
    try{
        // try to store property in database
        if (!thisProperty) throw new Error("thisProperty is undefined");
        
        const tempCol = collection(db, 'Properties', thisProperty.id)
        const docRef = await setDoc(tempCol, {...thisProperty});// I'm not confident in this, UNTESTED
        thisProperty.id = docRef.id
        
        // retrieve updated property details by calling the GetProperty function
        result = await getPropertyByID(thisProperty);

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