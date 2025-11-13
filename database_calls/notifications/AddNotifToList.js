import { addDoc, arrayUnion, collection, doc, updateDoc } from 'firebase/firestore';
import { ReturnValue } from '../../models/ReturnValue';
import { db } from '../../firebaseConfig';
import { getNotificationByID } from './GetNotificationByID';
import { Notification } from '../../models/Notification';

/** 
 * @param {Notification} newNotification The details of the notification to create
 * @param {string} userID The id of the user to add this notification to
 * @returns {ReturnValue} The results of the operation. If successful, the resultData field contains the details of the newly created notification.
 */

export async function addNotifToList(newNotification, userID) {

    var result = new ReturnValue(false, "");

    // try catch to handle any errors
    try{
        // try to store notification in database
        if (!newNotification) throw new Error("newNotification is undefined");
        
        //const tempCol = collection(db, 'Notifications')
        const docRef = doc(db, 'Notifications', newNotification.listID);

        await updateDoc(docRef, {
            ['notifications']: arrayUnion(newNotification)
        })

        // here the notificationID is set as the document id just in the notification object, it is still "setLater" in the database
        newNotification.notificationID = docRef.id
        
        // retrieve newly made notification by calling the getNotificationByID function
        result = await getNotificationByID(newNotification.notificationID);

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