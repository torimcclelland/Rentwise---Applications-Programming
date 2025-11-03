import { addDoc, collection } from 'firebase/firestore';
import { Conversation } from '../../models/Conversation';
import { ReturnValue } from '../../models/ReturnValue';
import { db } from '../../firebaseConfig';
import { getConversationByID } from './GetConversationByID';

/** 
 * @param {Conversation} newConversation The details of the conversation to create
 * @returns {ReturnValue} The results of the operation. If successful, the conversationData field contains the details of the newly created conversation.
 */
export async function createConversation(newConversation) {

    var result = new ReturnValue(false, "");

    // try catch to handle any errors
    try{
        // try to store user in database
        if (!newConversation) throw new Error("newConversation is undefined");
        
        const tempCol = collection(db, 'Conversations')
        const docRef = await addDoc(tempCol, {...newConversation});
        newConversation.id = docRef.id
        
        // retrieve newly made property by calling the GetProperty function
        result = await getConversationByID(newConversation.id);

    } catch(e){
        let error = ""; 
        if (e instanceof Error) {
            error = e.message // works, `e` narrowed to Error
        } else{
            error = "Had a problem with typescript error handling when adding property."
        }

        result = new ReturnValue(false, error)
    }
    
    return result;
    
}