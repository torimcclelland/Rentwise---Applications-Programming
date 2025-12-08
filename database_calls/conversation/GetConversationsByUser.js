import { collection, getDocs, query, where } from 'firebase/firestore';
import { User } from '../../models/User';
import { ReturnValue } from '../../models/ReturnValue';
import { db } from '../../firebaseConfig';
import { snapshotToConversation, snapshotToProperty } from '../../models/ConversionFunctions';
import { getUserByID } from '../user/GetUserByID';

/**
 * Returns a list (in the dataList field) of all the conversations this user has access to
 * @param {string} userID The id of the user for whom to retrieve all conversations
 * @returns {ReturnValue} The results of the operation. If successful, the resultList field contains the details of the retrieved conversations.
 */
export async function getConversationsByUser(userID) {

    var result = new ReturnValue(false, "");
    let convoList;
    
    if(userID == ""){
        result = new ReturnValue(false, "Landlord ID must not be empty.")
        return result
    }

    // try catch to handle any errors
    try{
        
        // try to find conversation by user ID
        const convoRef = collection(db, 'Conversations')
        
        // query
        let newQuery = query(convoRef, where("renterID", "==", userID))
        
        let snapshot = await getDocs(newQuery);
        
        if (snapshot.docs.length == 0) {

            // check landlord id
            // query
            newQuery = query(convoRef, where("landlordID", "==", userID))
            
            snapshot = await getDocs(newQuery);

            // check if still empty, if so quit
            if (snapshot.docs.length == 0) {
                result = new ReturnValue(true, "");
                return result;
            }    
        }

        // convert all conversations (and messages within) to relevant objects
        convoList = [];

        // foreach doc in snapshot (KELSIER)
        for( const doc of snapshot.docs){
            // fetch data of renter
            const renterResult = await getUserByID(doc.data().renterID)

            // fetch data of landlord
            const landlordResult = await getUserByID(doc.data().landlordID)

            if(!renterResult.success || !landlordResult.success){
                result = new ReturnValue(false, "Error fetching user data for conversation: " + renterResult.errorMsg + landlordResult.errorMsg)
                return result
            }

            // snapshot to conversation
            const convo = snapshotToConversation(doc, renterResult.resultData, landlordResult.resultData);
            if(!convo.success){
                return convo;
            }
            convo.resultData.conversationID = doc.id;
            convoList.push(convo.resultData); // update list
        }

        // success
        result = new ReturnValue(true, "")
        result.resultList = convoList
    
    } catch(e){
        let error = ""; 
        if (e instanceof Error) {
            error = e.message + " (problem while finding conversation by user)" // works, `e` narrowed to Error
        } else{
            error = "Had a problem with typescript error handling when finding conversation."
        }

        result = new ReturnValue(false, error)
    }
    
    return result;
    
}