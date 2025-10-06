import { addDoc, collection } from 'firebase/firestore';
import { User } from '../../models/User';
import { ReturnValue } from '../../models/ReturnValue';
import { db } from '../../firebaseConfig';

/** 
 * @param {User} newProperty The details of the property to create
 * @returns {ReturnValue} The results of the operation. If successful, the propertyData field contains the details of the newly created property.
 */
export async function createProperty(newProperty) {

    var result = new ReturnValue(false, "");

    // try catch to handle any errors
    try{
        // try to store user in database
        if (!newUser) throw new Error("newUser is undefined");
        
        const tempCol = collection(db, 'Users')
        const docRef = await addDoc(tempCol, {...newUser});
        newUser.id = docRef.id
        
        // retrieve newly made user by calling the GetUser function
        result = await getUserByID(newUser);

    } catch(e){
        let error = ""; 
        if (e instanceof Error) {
            error = e.message // works, `e` narrowed to Error
        } else{
            error = "Had a problem with typescript error handling when adding user."
        }

        result = new ReturnValue(false, error)
        console.log("After error stuff:")
        console.log(newUser)
        console.log(result)
    }
    
    return result;
    
}