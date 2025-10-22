import { collection, getDocs, query, where } from 'firebase/firestore';
import { User } from '../../models/User';
import { ReturnValue } from '../../models/ReturnValue';
import { db } from '../../firebaseConfig';
import { Property } from '../../models/Property';
import { snapshotToProperty } from '../../models/ConversionFunctions';

/**
 * 
 * @param {User} landlord The details of the property to find by landlord id (must not be empty)
 * @returns {ReturnValue} The results of the operation. If successful, the propertyList field contains the details of the retrieved properties.
 */
export async function getPropertyByLandlord(landlord) {

    var result = new ReturnValue(false, "");
    let propList;
    
    if(landlord.userID == ""){
        result = new ReturnValue(false, "Landlord ID must not be empty.")
        return result
    }

    // try catch to handle any errors
    try{
        
        // try to find user by ID
        const propertyRef = collection(db, 'Properties')
        
        // query
        const newQuery = query(propertyRef, where("landlordID", "==", landlord.userID))
        
        const snapshot = await getDocs(newQuery);
        
        if (snapshot.docs.length == 0) {
            result = new ReturnValue(true, "");
            return result;
        }

        propList = [];
        snapshot.forEach((doc) => {
            const property = snapshotToProperty(doc);
            if(!property.success){
                console.log(property.errorMsg)
                return;
            }
            property.propertyData.propertyID = doc.id;
            propList.push(property.propertyData);
        });

        // success
        result = new ReturnValue(true, "", {}, {}, propList)

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