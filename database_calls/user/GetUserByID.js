import { doc, getDoc } from 'firebase/firestore';
import { User } from '../../models/User';
import { ReturnValue } from '../../models/ReturnValue';
import { db } from '../../firebaseConfig';
import { snapshotToUser } from '../../models/ConversionFunctions';

/**
 * 
 * @param {User} userToFind The details of the user to find by id (id field must not be empty)
 * @returns {ReturnValue} The results of the operation. If successful, the userData field contains the details of the retrieved user.
 */
export async function getUserByID(userToFind) {

    var result = new ReturnValue(false, "");
    
    if(userToFind.id == ""){
        result = new ReturnValue(false, "User ID must not be empty.")
        return result
    }

    // try catch to handle any errors
    try{
        
        // try to find user by ID
        const userRef = doc(db, 'Users', userToFind.id)

        const snapshot = await getDoc(userRef);

        if (snapshot.data() == undefined) {
            result = new ReturnValue(false, "No snapshots found for user with id " + userToFind.id);
            return result;
        } 

        // TODO: make a conversion function
        const userRetrieved = snapshotToUser(snapshot);

        // success
        result = new ReturnValue(true, "")
        result.userData = userRetrieved

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