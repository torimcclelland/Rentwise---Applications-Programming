import { collection, getDocs, query, where } from 'firebase/firestore';
import { User } from '../../models/User';
import { ReturnValue } from '../../models/ReturnValue';
import { db } from '../../firebaseConfig';
import { Property } from '../../models/Property';
import { snapshotToProperty } from '../../models/ConversionFunctions';

/**
 * 
 * @param {User} user The user for whom to retrieve all conversations
 * @returns {ReturnValue} The results of the operation. If successful, the resultData field contains the details of the retrieved conversations.
 */
export async function getConversationByUser(user) {

    var result = new ReturnValue(false, "");
    let propList;
    
    if(user.userID == ""){
        result = new ReturnValue(false, "User ID must not be empty.")
        return result
    }

    // try catch to handle any errors
    try{
        
        // try to find user by ID
        const propertyRef = collection(db, 'Conversations')
        
        // query
        const newQuery = query(propertyRef, where('users', 'array-contains', user.userID))
        
        const snapshot = await getDocs(newQuery);
        
        if (snapshot.docs.length == 0) {
            result = new ReturnValue(true, "");
            return result;
        }

        // ALERT SAM CHANGE THIS!!!
        propList = [];
        snapshot.forEach((doc) => {
            const property = snapshotToProperty(doc);
            if(!property.success){
                console.log(property.errorMsg)
                return;
            }
            property.resultData.propertyID = doc.id;
            propList.push(property.resultData);
        });

        // success
        result = new ReturnValue(true, "")
        result.resultList = propList
    
    } catch(e){
        let error = ""; 
        if (e instanceof Error) {
            error = e.message + " (problem while finding property)" // works, `e` narrowed to Error
        } else{
            error = "Had a problem with typescript error handling when finding property."
        }

        result = new ReturnValue(false, error)
    }
    
    return result;
    
}