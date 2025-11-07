import {collection, getDocs, query, where} from 'firebase/firestore'
import { Notification } from '../../models/Notification'
import { ReturnValue } from '../../models/ReturnValue'
import { db } from '../../firebaseConfig'
import { snapshotToNotification } from '../../models/ConversionFunctions'


/**
 * 
 * @param {Notification}
 * @returns {ReturnValue}
 * 
 */

export async function getNotificationByUser(userID) {

    var result = new ReturnValue(false, "")
    let notificationList

    if (userID == ""){
        result= new ReturnValue(false, "userID must not be empty.")
        return result
    }

    // try catch to handle any errors
    try{

        //try to find notification by userID
        const notificationRef = collection(db, 'Notifications')

        //query
        const newQuery = query(notificationRef, where("userID", "==", userID))

        const snapshot = await getDocs(newQuery)

        if (snapshot.docs.length == 0){
            result = new ReturnValue(true, "")
            return result;
        }

        notificationList = [];
        snapshot.forEach((doc) => {
            const notification = snapshotToNotification(doc);
            if (!notification.success){
                console.log(notification.errorMsg)
                return;
            }
            notificationList.push(notification.resultData);
        })

        // success FIX HERE
        result = new ReturnValue(true, "")
        result.resultList = notificationList;
    }catch(e){
        let error = "";
        if (e instanceof Error){
            error = e.message + " (problem while finding notificaton)"
        }else{
            error = "Had a problem with typescript error handling when finding notification."
        }

        result = new ReturnValue(false, error)
    }
    
    return result;
}