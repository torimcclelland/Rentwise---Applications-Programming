import { FieldValue, addDoc, arrayUnion, collection, doc, updateDoc } from 'firebase/firestore';
import { ReturnValue } from '../../models/ReturnValue';
import { db } from '../../firebaseConfig';
import { Notification } from '../../models/Notification';
import { getNotifListByUserID } from './GetNotifListByUserID';
import { User } from '../../models/User';

/** 
 * @param {Notification} newNotification The details of the notification to create
 * @param {string} userID The id of the user to add this notification to
 * @returns {ReturnValue} The results of the operation. NO data fields contain a value upon success
 */

export async function addNotifToList(newNotification, userID) {

    var result = new ReturnValue(false, "");

    // try catch to handle any errors
    try{
        // try to store notification in database
        if (!newNotification) throw new Error("newNotification is undefined");
        
        // get the notification list for this user
        const tempUser = new User({userID:userID})
        const tempNotifList = await getNotifListByUserID(tempUser)
        if(!tempNotifList.success){
            return tempNotifList;
        }

        //const tempCol = collection(db, 'Notifications')
        const docRef = doc(db, 'Notifications', tempNotifList.resultData.notifID);

        await updateDoc(docRef, {
            notifications: arrayUnion({'datetime':newNotification.datetime, 'message':newNotification.message, 'isNew': newNotification.isNew})
        })

        // here the notificationID is set as the document id just in the notification object, it is still "setLater" in the database
        newNotification.notificationID = docRef.id
        
        
        result = new ReturnValue(true, "")

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