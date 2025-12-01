import { addDoc, arrayUnion, collection, doc, updateDoc } from 'firebase/firestore';
import { ReturnValue } from '../../models/ReturnValue';
import { db } from '../../firebaseConfig';
import { Conversation } from '../../models/Conversation';
import { getConversationByID } from './GetConversationByID';

/** 
 * @param {string} renterID The id of the renter to create the conversation for (a user id)
 * @param {string} landlordID The id of the landlord to create the conversation for (a user id)
 * @returns {ReturnValue} The results of the operation. If successful, the resultData field contains the details of the newly created conversation.
 */

export async function createConversation(renterID, landlordID) {

    var result = new ReturnValue(false, "");

    // try catch to handle any errors
    try{
        // try to store conversation in database
        if (!renterID || !landlordID) {
            result = new ReturnValue(false, "renterID and landlordID must be defined")
            return result;
        }

        const convo = new Conversation({conversationID:"", renterID: renterID, landlordID:landlordID, messages: []})

        const tempCol = collection(db, 'Conversations')
        const docRef = await addDoc(tempCol, {...convo});

        convo.conversationID = docRef.id;

        // retrieve newly made conversation by calling the getConversationID function
        result = await getConversationByID(convo);

    } catch(e){
        let error = ""; 
        if (e instanceof Error) {
            error = e.message // works, `e` narrowed to Error
        } else{
            error = "Had a problem with typescript error handling when adding conversation."
        }

        result = new ReturnValue(false, error)
    }
    
    return result;
    
}