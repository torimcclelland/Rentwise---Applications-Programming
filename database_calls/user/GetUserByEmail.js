import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { User } from '../../models/User';
import { ReturnValue } from '../../models/ReturnValue';
import { db } from '../../firebaseConfig';
import { snapshotToUser } from '../../models/ConversionFunctions';

/**
 * 
 * @param {User} userToFind The details of the user to find by email (email field must not be empty)
 * @returns {ReturnValue} The results of the operation. If successful, the userData field contains the details of the retrieved user.
 **/

export async function getUserByEmail(userToFind){

    var result = new ReturnValue(false, "");

    if(userToFind.email == ""){
        result = new ReturnValue(false, "Email must not be empty.")
        return result
    }

    // try catch to handle any errors
    try{
        
        // try to find user by ID
        const userRef = collection(db, 'Users')

        // query
        //console.log("User we're searching with: " + userToFind.email)
        const newQuery = query(userRef, where("email", "==", userToFind.email), limit(1))
        //console.log(newQuery) // added print statements for debugging

        const snapshot = await getDocs(newQuery);

        if(snapshot.docs.length == 0){
            result = new ReturnValue(true, "User not found.", null);
            return result
        }
       
        const snapshotSingle = snapshot.docs[0]
        
        // success
        result = snapshotToUser(snapshotSingle)

    } catch(e){
        let error = ""; 
        if (e instanceof Error) {
            error = e.message // works, `e` narrowed to Error
        } else{
            error = "Had a problem with typescript error handling when adding user."
        }

        // result = new ReturnValue(false, error)
    }
    return result
    
}
