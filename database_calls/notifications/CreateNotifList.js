import { addDoc, arrayUnion, collection, doc, updateDoc } from 'firebase/firestore';
import { ReturnValue } from '../../models/ReturnValue';
import { db } from '../../firebaseConfig';
import { Notification, NotificationList } from '../../models/Notification';
import { getNotifListByUserID } from './GetNotifListByUserID';
import { getNotifListByID } from './GetNotifListByID';

/** 
 * @param {string} userID The details of the id to create the notification under (corresponds to a user id)
 * @returns {ReturnValue} The results of the operation. If successful, the resultData field contains the details of the newly created notification.
 */

export async function createNotifList(userID) {

    var result = new ReturnValue(false, "");

    // try catch to handle any errors
    try{
        // try to store notification in database
        if (!userID) {
            result = new ReturnValue(false, "UserID must be defined")
            return result;
        }

        const tempList = new NotificationList({userID:userID, notifications:[]})

        const tempCol = collection(db, 'Notifications')
        const docRef = await addDoc(tempCol, {...tempList}, userID);

        tempList.notifID = docRef.id;

        // retrieve newly made notification by calling the getNotificationByID function
        result = await getNotifListByID(tempList);

    } catch(e){
        let error = ""; 
        if (e instanceof Error) {
            error = e.message // works, `e` narrowed to Error
        } else{
            error = "Had a problem with typescript error handling when adding notification."
        }

        result = new ReturnValue(false, error)
    }
    
    return result;
    
}