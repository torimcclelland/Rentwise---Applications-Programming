import { collection } from '@react-native-firebase/firestore';
import { User } from '../../models/User';
import { ReturnValue } from '../../models/ReturnValue';
import { db } from '../../firebaseConfig';

export function getUserByEmail(userToFind: User): ReturnValue {

    var result = new ReturnValue(false, "");

    // try catch to handle any errors
    try{
        
        // try to find user by ID
        const userRef = collection(db, 'Users')
        const snapshot = userRef.where('email', '==', userToFind.email).get();
        if (snapshot.empty) {
            result = new ReturnValue(false, "No snapshots found for user with email " + userToFind.email);
            return result;
        } 

        // success
        result = new ReturnValue(true, "", snapshot.toObject(User))

    } catch(e){
        let error:string = ""; 
        if (e instanceof Error) {
            error = e.message // works, `e` narrowed to Error
        } else{
            error = "Had a problem with typescript error handling when adding user."
        }

        result = new ReturnValue(false, error)
    }
    
    return result;
    
}