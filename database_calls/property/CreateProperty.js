import { addDoc, collection } from 'firebase/firestore';
import { ReturnValue } from '../../models/ReturnValue';
import { db } from '../../firebaseConfig';
import { getPropertyByID } from './GetPropertyByID';

/** 
 * @param {Property} newProperty The details of the property to create
 * @returns {ReturnValue} The results of the operation. If successful, the propertyData field contains the details of the newly created property.
 */

export async function createProperty(newProperty) {

    var result = new ReturnValue(false, "");

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