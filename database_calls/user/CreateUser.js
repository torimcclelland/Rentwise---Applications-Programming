import { addDoc, collection } from 'firebase/firestore';
import { User } from '../../models/User';
import { ReturnValue } from '../../models/ReturnValue';
import { db } from '../../firebaseConfig';
import { getUserByID } from './GetUserByID';

/** 
 * @param {User} newUser The details of the user to create
 * @returns {ReturnValue} The results of the operation. If successful, the resultData field contains the details of the newly created user.
 */
export async function createUser(newUser) {

    var result = new ReturnValue(false, "");

    // bad data error handling
    if(!newUser.email
        || !newUser.password
        || !newUser.firstName
        || !newUser.lastName){
        result = new ReturnValue(false, "All data fields must have a value.")
        return result;
    }

    // try catch to handle any errors
    try{
        // try to store user in database
        if (!newUser) throw new Error("newUser is undefined");
        
        const tempCol = collection(db, 'Users')
        const docRef = await addDoc(tempCol, {...newUser});
        newUser.userID = docRef.id
        
        // retrieve newly made user by calling the GetUser function
        result = await getUserByID(newUser.userID);

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