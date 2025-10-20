import { doc, getDoc } from 'firebase/firestore';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { User } from '../../models/User';
import { ReturnValue } from '../../models/ReturnValue';
import { db } from '../../firebaseConfig';
import { Property } from '../../models/Property';
import { snapshotToProperty } from '../../models/ConversionFunctions';

/**
 * 
 * @param {Property} propertyToFind The details of the user to find by id (id field must not be empty)
 * @returns {ReturnValue} The results of the operation. If successful, the userData field contains the details of the retrieved user.
 */
export async function getPropertyByID(propertyToFind) {

    var result = new ReturnValue(false, "");
    let propertyRetrieved
    
    if(propertyToFind == ""){
        result = new ReturnValue(false, "Property ID must not be empty.")
        return result
    }

    // try catch to handle any errors
    try{
         const propertyRef = collection(db, 'Properties', propertyToFind.propertyID)
        // try to find user by ID
        //const newQuery = query(propertyRef, where("propertyID", "==", propertyToFind), limit(1))
        //console.log(newQuery) // added print statements for debugging

        const snapshot = await getDoc(propertyRef);


        if (snapshot.docs.length == 0) {
            result = new ReturnValue(false, "No snapshots found for property with id " + propertyToFind.propertyID);
            return result;
        } 

        // TODO: make a conversion function
        const singleSnapshot = snapshot.docs[0]
        const data = singleSnapshot.data()
        propertyRetrieved = snapshotToProperty(data);
        // success
        // result = new ReturnValue(true, "")
        // result.propertyData = propertyRetrieved
        // console.log(result.propertyData)
        // we can prob remove


    } catch(e){
        let error = ""; 
        if (e instanceof Error) {
            error = e.message + " (find property problem)" // works, `e` narrowed to Error
        } else{
            error = "Had a problem with typescript error handling when finding property."
        }

        result = new ReturnValue(false, error)
    }
    
    return propertyRetrieved;
    
}