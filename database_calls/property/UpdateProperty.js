import { addDoc } from 'firebase/firestore';
import { User } from '../../models/User';
import { ReturnValue } from '../../models/ReturnValue';
import { db } from '../../firebaseConfig';
import { getPropertyByID } from './GetPropertyByID';
import { collection, query, where, getDocs, limit, doc, updateDoc } from 'firebase/firestore';

/** 
 * @param {Property} thisProperty The details of the property to update
 * @returns {ReturnValue} The results of the operation. If successful, the propertyData field contains the details of the updated property.
 */
export async function updateProperty(thisProperty) {

    var result = new ReturnValue(false, "");

    // try catch to handle any errors
    try{
        // try to store property in database
        if (!thisProperty) throw new Error("thisProperty is undefined");
        
        const propertyRef = collection(db, 'Properties')
        const newQuery = query(propertyRef, where("propertyID", "==", thisProperty.propertyID))
        const snapshot = await getDocs(newQuery)
        
        const docRef = doc(db, "Properties", snapshot.docs[0].id);

        // Update the document
        await updateDoc(docRef, {
            address: thisProperty.address,
            city: thisProperty.city,
            state: thisProperty.state,
            zipcode: thisProperty.zipcode,
            monthlyPrice: thisProperty.monthlyPrice,
            description: thisProperty.description,
        });

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

