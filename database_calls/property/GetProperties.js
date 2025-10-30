import { DocumentSnapshot, collection, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore';
import { User } from '../../models/User';
import { ReturnValue } from '../../models/ReturnValue';
import { db } from '../../firebaseConfig';
import { Property } from '../../models/Property';
import { snapshotToProperty } from '../../models/ConversionFunctions';

/**
 * 
 * @returns {ReturnValue} The results of the operation. If successful, the propertyList field contains the details of the retrieved properties.
 */
export async function getProperties() {

    var result = new ReturnValue(false, "");

    // try catch to handle any errors
    try{
        
        // get reference
        const propertyRef = collection(db, 'Properties')
        
        // query database (if no starting point, don't specify one)
        const newQuery = query(propertyRef, limit(100))
        
        const snapshot = await getDocs(newQuery);
        
        if (snapshot.docs.length == 0) {
            result = new ReturnValue(true, "");
            return result;
        }

        const propList = [];
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
            error = e.message + " (problem while fetching all properties)" // works, `e` narrowed to Error
        } else{
            error = "Had a problem with typescript error handling when fetching all properties."
        }

        result = new ReturnValue(false, error)
    }
    
    return result;
    
}