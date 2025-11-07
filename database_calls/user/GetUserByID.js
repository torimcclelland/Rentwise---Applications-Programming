import { doc, getDoc } from 'firebase/firestore';
import { ReturnValue } from '../../models/ReturnValue';
import { db } from '../../firebaseConfig';
import { snapshotToUser } from '../../models/ConversionFunctions';

/**
 * 
 * @param {string} userToFind The id of the user to find by id
 * @returns {ReturnValue} The results of the operation. If successful, the resultData field contains the details of the retrieved user.
 */
export async function getUserByID(userToFind) {

    var result = new ReturnValue(false, "");
    
    if(!userToFind){
        result = new ReturnValue(false, "User ID must not be empty.")
        return result
    }

    // try catch to handle any errors
    try{
        
        // try to find user by ID
        const userRef = doc(db, 'Users', userToFind)

        const snapshot = await getDoc(userRef);

        if (snapshot.data() == undefined) {
            result = new ReturnValue(false, "No snapshots found for user with id " + userToFind);
            return result;
        } 

        const userRetrieved = snapshotToUser(snapshot);

        // success
        result = new ReturnValue(true, "")
        result.resultData = userRetrieved.resultData

    } catch(e){
        let error = ""; 
        if (e instanceof Error) {
            error = e.message + " (find user problem)" // works, `e` narrowed to Error
        } else{
            error = "Had a problem with typescript error handling when finding user."
        }

        result = new ReturnValue(false, error)
    }
    
    return result;
    
}