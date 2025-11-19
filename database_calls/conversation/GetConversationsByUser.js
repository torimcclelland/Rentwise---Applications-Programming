import { collection, getDocs, query, where } from 'firebase/firestore';
import { User } from '../../models/User';
import { ReturnValue } from '../../models/ReturnValue';
import { db } from '../../firebaseConfig';
import { snapshotToConversation, snapshotToProperty } from '../../models/ConversionFunctions';

/**
 * Returns a list (in the dataList field) of all the conversations this user has access to
 * @param {string} userID The id of the user for whom to retrieve all conversations
 * @returns {ReturnValue} The results of the operation. If successful, the resultList field contains the details of the retrieved conversations.
 */
export async function getConversationsByLandlord(userID) {

    var result = new ReturnValue(false, "");
    let convoList;
    
    if(userID == ""){
        result = new ReturnValue(false, "Landlord ID must not be empty.")
        return result
    }

    // try catch to handle any errors
    try{
        
        result = snapshotToConversation(snapshot.docs[0]);
        
        // try to find conversation by user ID
        const convoRef = collection(db, 'Conversations')
        
        // query
        const newQuery = query(convoRef, where("renterID", "==", userID), where("landlordID", "==", userID))
        
        const snapshot = await getDocs(newQuery);
        
        if (snapshot.docs.length == 0) {
            result = new ReturnValue(true, "");
            return result;
        }

        convoList = [];
        snapshot.forEach((doc) => {
            const convo = snapshotToConversation(doc);
            if(!convo.success){
                return convo;
            }
            //convo.resultData.conversationID = doc.id; SAM maybe need to add this back in
            convoList.push(convo.resultData);
        })

        // success
        result = new ReturnValue(true, "")
        result.resultList = convoList
    
    } catch(e){
        let error = ""; 
        if (e instanceof Error) {
            error = e.message + " (problem while finding property)" // works, `e` narrowed to Error
        } else{
            error = "Had a problem with typescript error handling when finding conversation."
        }

        result = new ReturnValue(false, error)
    }
    
    return result;
    
}