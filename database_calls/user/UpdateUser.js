import { addDoc, collection } from 'firebase/firestore';
import { User } from '../../models/User';
import { ReturnValue } from '../../models/ReturnValue';
import { db } from '../../firebaseConfig';
import { getUserByID } from './GetUserByID';

/** 
 * @param {User} thisUser The details of the user to update
 * @returns {ReturnValue} The results of the operation. If successful, the userData field contains the details of the updated user.
 */
export async function updateUser(thisUser) {

    var result = new ReturnValue(false, "");

    // try catch to handle any errors
    try{
        // try to store user in database
        if (!thisUser) throw new Error("thisUser is undefined");
        
        const tempCol = collection(db, 'Users', thisUser.userID)
        const docRef = await setDoc(tempCol, {...thisUser});// I'm not confident in this, UNTESTED
        thisUser.userID = docRef.id
        
        // retrieve updated user details by calling the GetUser function
        result = await getUserByID(thisUser.userID);

    } catch(e){
        let error = ""; 
        if (e instanceof Error) {
            error = e.message // works, `e` narrowed to Error
        } else{
            error = "Had a problem with typescript error handling when updating user."
        }

        result = new ReturnValue(false, error)
    }
    
    return result;
    
}