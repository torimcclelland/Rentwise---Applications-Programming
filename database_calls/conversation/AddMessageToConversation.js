import { FieldValue, addDoc, arrayUnion, collection, doc, updateDoc } from 'firebase/firestore';
import { ReturnValue } from '../../models/ReturnValue';
import { db } from '../../firebaseConfig';
import { Notification } from '../../models/Notification';
import { getNotifListByUserID } from './GetNotifListByUserID';
import { User } from '../../models/User';
import { Message } from '../../models/Conversation';

/** 
 * @param {Message} newMessage The details of the message to create/add
 * @param {string} conversationID The id of the conversation to add this notification to
 * @returns {ReturnValue} The results of the operation. NO data fields contain a value upon success
 */

export async function addNotifToList(newMessage, conversationID) {

    var result = new ReturnValue(false, "");

    // try catch to handle any errors
    try{
        
        if (!newMessage) throw new Error("newMessage is undefined");

        //const tempCol = collection(db, 'Notifications')
        const docRef = doc(db, 'Conversations', conversationID);

        await updateDoc(docRef, {
            messages: arrayUnion({'messageText':newMessage.messageText, 'senderID':newMessage.senderID, 'datetime': newMessage.datetime, 'isNew': newMessage.isNew})
        })
        
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