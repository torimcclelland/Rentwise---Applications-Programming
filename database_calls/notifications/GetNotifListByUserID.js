import { doc, getDoc } from 'firebase/firestore';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { ReturnValue } from '../../models/ReturnValue';
import { db } from '../../firebaseConfig';
import { Notification } from '../../models/Notification';
import { snapshotToNotifUserList } from '../../models/ConversionFunctions';
import { User } from '../../models/User';
import { createNotifList } from './CreateNotifList';

/**
 * 
 * @param {User} userToSearch The id of the user to retrieve the notifications of
 * @returns {ReturnValue} The results of the operation. If successful, the resultData field contains the details of the retrieved notification list.
 */
export async function getNotifListByUserID(userToSearch) {

    var result = new ReturnValue(false, "");
    
    if(!userToSearch){
        result = new ReturnValue(false, "userID must not be empty.")
        return result
    }

    // try catch to handle any errors
    try{
        const notifRef = collection(db, 'Notifications')

        const newQuery = query(notifRef, where("userID", "==", userToSearch.userID))

        const snapshot = await getDocs(newQuery);

        if (snapshot.docs.length == 0) {
            result = createNotifList(userToSearch.userID)
            // maybe create new notification list if this is the case

            return result;
        }

        result = snapshotToNotifUserList(snapshot.docs[0]);

    } catch(e){
        let error = ""; 
        if (e instanceof Error) {
            error = e.message + " (find notification problem)" // works, `e` narrowed to Error
        } else{
            error = "Had a problem with typescript error handling when finding notification."
        }

        result = new ReturnValue(false, error)
    }
    
    return result;
    
}