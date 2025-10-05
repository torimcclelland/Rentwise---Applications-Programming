import { collection } from '@react-native-firebase/firestore';
import { User } from '../../models/User';
import { ReturnValue } from '../../models/ReturnValue';
import { db } from '../../firebaseConfig';
import { getUserByEmail } from './GetUserByEmail';

export function createUser(newUser:User): ReturnValue {

    var result = new ReturnValue(false, "");

    // try catch to handle any errors
    try{
        
        // try to store user in database
        const databaseOp = collection(db, 'Users').add({newUser});
        
        // retrieve newly made user by calling the GetUser function
        result = getUserByEmail(newUser);

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