import { doc, getDoc } from 'firebase/firestore';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { ReturnValue } from '../../models/ReturnValue';
import { db } from '../../firebaseConfig';
import { Conversation } from '../../models/Conversation';
import { snapshotToConversation } from '../../models/ConversionFunctions';

/**
 * 
 * @param {string} conversationToFind The id of the conversation to find
 * @returns {ReturnValue} The results of the operation. If successful, the resultData field contains the details of the retrieved conversation.
 */
export async function getConversationByID(conversationToFind) {

    var result = new ReturnValue(false, "");
    
    if(!conversationToFind){
        result = new ReturnValue(false, "Conversation ID must not be empty.")
        return result
    }

    // try catch to handle any errors
    try{
         const conversationRef = doc(db, 'Conversations', conversationToFind)
    
         const snapshot = await getDoc(conversationRef);

        if (snapshot.data() == undefined) {
            result = new ReturnValue(false, "No snapshots found for conversation with id " + conversationToFind);
            return result;
        } 

        result = snapshotToConversation(snapshot);

    } catch(e){
        let error = ""; 
        if (e instanceof Error) {
            error = e.message + " (retrieve conversation problem)" // works, `e` narrowed to Error
        } else{
            error = "Had a problem with typescript error handling when finding conversation."
        }

        result = new ReturnValue(false, error)
    }
    
    return result;
    
}