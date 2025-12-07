import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import { User } from '../../models/User';
import { ReturnValue } from '../../models/ReturnValue';
import { db } from '../../firebaseConfig';
import { snapshotToConversation, snapshotToProperty } from '../../models/ConversionFunctions';
import { getUserByID } from '../user/GetUserByID';

/**
 * Returns the conversation between a specific renter and specific landlord
 * @param {string} user1 The id of the landlord of the conversation
 * @param {string} user2 The id of the renter of the conversation
 * @returns {ReturnValue} The results of the operation. If successful, the resultList field contains the details of the retrieved conversation.
 */
export async function getConversationsByBothUsers(user1, user2) {

    var result = new ReturnValue(false, "");
    
    if(user1 == "" || user2 == ""){
        result = new ReturnValue(false, "User IDs must not be empty.")
        return result
    } else if(user1 == user2){
        result = new ReturnValue(false, "Conversations must be between two separate users.");
        return result;
    }

    // try catch to handle any errors
    try{
        
        // try to find conversation by user ID
        const convoRef = collection(db, 'Conversations')
        
        // query
        let newQuery = query(convoRef, where("renterID", "==", user1), where("landlordID", "==", user2))
        
        let snapshot = await getDocs(newQuery);
        
        // check inverse (if landlord and renter are swapped)
        if (snapshot.docs.length == 0) {
            // query
            newQuery = query(convoRef, where("landlordID", "==", user1), where("renterID", "==", user2))
            
            snapshot = await getDocs(newQuery);

            // check if still empty, if so quit
            if (snapshot.docs.length == 0) {
                result = new ReturnValue(true, "", {});
                return result;
            }    
        }
        // get users data
        const renterResult = await getUserByID(snapshot.docs[0].data().renterID)
        const landlordResult = await getUserByID(snapshot.docs[0].data().landlordID)

        if(!renterResult.success || !landlordResult.success){
            result = new ReturnValue(false, "Error fetching user data for conversation: " + renterResult.errorMsg + landlordResult.errorMsg)
            return result
        }

        result = snapshotToConversation(snapshot.docs[0], renterResult.resultData, landlordResult.resultData);

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