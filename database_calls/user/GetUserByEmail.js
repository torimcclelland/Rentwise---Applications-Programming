import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { User } from '../../models/User';
import { ReturnValue } from '../../models/ReturnValue';
import { db } from '../../firebaseConfig';

/**
 * 
 * @param {User} userToFind The details of the user to find by email (email field must not be empty)
 * @returns {ReturnValue} The results of the operation. If successful, the userData field contains the details of the retrieved user.
 */
/*
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
        const newQuery = query(userRef, where("email", "==", userToFind.email), limit(1))

        const snapshot = await getDocs(newQuery);

       
        // TODO: make a conversion function
        const userRetrieved = new User(
            snapshot.docs[0].data().email,
            snapshot.docs[0].data().password,
            snapshot.docs[0].data().isLandLord,
            snapshot.docs[0].data().isPremiumUser,
            snapshot.docs[0].data().properties,
            userToFind.id,
            snapshot.docs[0].data().firstName,
            snapshot.docs[0].data().lastName,
            snapshot.docs[0].data().displayName
        )

    } catch(e){
        let error = ""; 
        if (e instanceof Error) {
            error = e.message // works, `e` narrowed to Error
        } else{
            error = "Had a problem with typescript error handling when adding user."
        }

        result = new ReturnValue(false, error)
    }
    
    return result;
    
}
*/