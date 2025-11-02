import { doc, getDoc } from 'firebase/firestore';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { ReturnValue } from '../../models/ReturnValue';
import { db } from '../../firebaseConfig';
import { Notification } from '../../models/Notification';
import { snapshotToNotification } from '../../models/ConversionFunctions';

/**
 * 
 * @param {string} notificationToFind The id of the notification to find
 * @returns {ReturnValue} The results of the operation. If successful, the userData field contains the details of the retrieved user.
 */
export async function getNotificationByID(notificationToFind) {

    var result = new ReturnValue(false, "");
    
    if(!notificationToFind){
        result = new ReturnValue(false, "Notification ID must not be empty.")
        return result
    }

    // try catch to handle any errors
    try{
         const notificationRef = doc(db, 'Notifications', notificationToFind)
    
         const snapshot = await getDoc(notificationRef);

        if (snapshot.data() == undefined) {
            result = new ReturnValue(false, "No snapshots found for notification with id " + notificationToFind);
            return result;
        } 

        // TODO: make a conversion function
        const notificationRetrieved = snapshotToNotification(snapshot);

        // success
        result = new ReturnValue(true, "")
        result.notificationData = notificationRetrieved.notificationData

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