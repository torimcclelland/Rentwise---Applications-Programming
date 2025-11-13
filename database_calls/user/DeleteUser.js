import { ReturnValue } from '../../models/ReturnValue';
import { db } from '../../firebaseConfig';
import { getUserByID } from './GetUserByID';
import { DocumentReference, deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { User } from '../../models/User';


/** 
 * @param {User} thisUser The details of the user to update
 * @returns {ReturnValue} The results of the operation. If successful, the resultData field contains the details of the updated user.
 */
export async function deleteUser(thisUser) {

    var result = new ReturnValue(false, "");

    // try catch to handle any errors
    try{
        // try to store user in database
        if (!thisUser) throw new Error("thisUser is undefined");
        
        const userRef = doc(db, 'Users', thisUser.userID)
        thisUser.userID = userRef.id

        await deleteDoc(userRef).then(() => {
            console.log("Document successfully deleted!");
          })
          .catch((error) => {
            console.error("Error deleting document: ", error);
          });
        // error here

        result = new ReturnValue(true, "")

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

