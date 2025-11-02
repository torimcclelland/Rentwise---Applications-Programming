import { addDoc, collection } from 'firebase/firestore';
import { ReturnValue } from '../../models/ReturnValue';
import { db } from '../../firebaseConfig';
// import { getNotificationByID } from './GetNotificationByID';
import { Notification } from '../../models/Notification';

/** 
 * @param {Notification} newNotification The details of the notification to create
 * @returns {ReturnValue} The results of the operation. If successful, the notificationData field contains the details of the newly created notification.
 */

export async function createNotification(newNotification) {

    var result = new ReturnValue(false, "");

    // try catch to handle any errors
    try{
        // try to store notification in database
        if (!newNotification) throw new Error("newNotification is undefined");
        
        const tempCol = collection(db, 'Notifications')
        const docRef = await addDoc(tempCol, {...newNotification});

        // here the notificationID is set as the document id just in the notification object, it is still "setLater" in the database
        newNotification.notificationID = docRef.id
        
        // retrieve newly made notification by calling the getNotificationByID function
        // result = await getNotificationByID(newNotification.notificationID);
        result = new ReturnValue(true)

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