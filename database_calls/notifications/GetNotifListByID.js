import { doc, getDoc } from 'firebase/firestore';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { ReturnValue } from '../../models/ReturnValue';
import { db } from '../../firebaseConfig';
import { NotificationList } from '../../models/Notification';
import { snapshotToNotif } from '../../models/ConversionFunctions';

/**
 * 
 * @param {NotificationList} notifListToFind The id of the notification list to find
 * @returns {ReturnValue} The results of the operation. If successful, the resultData field contains the details of the retrieved notification list.
 */
export async function getNotifListByID(notifListToFind) {

    var result = new ReturnValue(false, "");
    
    if(!notifListToFind.notifID){
        result = new ReturnValue(false, "Notification list ID must not be empty.")
        return result
    }

    // try catch to handle any errors
    try{
         const notificationRef = doc(db, 'Notifications', notifListToFind.notifID)
    
         const snapshot = await getDoc(notificationRef);

        if (snapshot.data() == undefined) {
            result = new ReturnValue(false, "No snapshots found for notification with id " + notifListToFind);

            // consider adding 'create notif' call here
            return result;
        } 

        result = snapshotToNotif(snapshot);

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