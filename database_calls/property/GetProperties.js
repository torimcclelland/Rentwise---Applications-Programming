import { DocumentSnapshot, collection, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore';
import { User } from '../../models/User';
import { ReturnValue } from '../../models/ReturnValue';
import { db } from '../../firebaseConfig';
import { Property } from '../../models/Property';
import { snapshotToProperty } from '../../models/ConversionFunctions';

/**
 * 
 * @param {int} batch The number of properties to retrieve.
 * @param {DocumentSnapshot} startingPoint The document to start after when retrieving data.
 * @param {string} orderingField The field to order searches by.
 * @returns {ReturnValue} The results of the operation. If successful, the propertyList field contains the details of the retrieved properties.
 */
export async function getProperties(batch = 10, startingPoint = null, orderingField = "") {

    var result = new ReturnValue(false, "");
    
    if(batch <= 0){
        result = new ReturnValue(false, "Batch must be greater than 0.")
        return result
    }
    if(orderingField === ""){
        orderingField = "avgRating"
    }

    // try catch to handle any errors
    try{
        
        // get reference
        const propertyRef = collection(db, 'Properties')
        let newQuery = query()

        if(startingPoint == null){
            // query database (if no starting point, don't specify one)
            newQuery = query(propertyRef, orderBy(orderingField), limit(batch))
        } else {
            // query database with starting point
            newQuery = query(propertyRef, orderBy(orderingField), limit(batch), startAfter(startingPoint))
        }
        
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
            error = e.message + " (problem while fetching all properties)" // works, `e` narrowed to Error
        } else{
            error = "Had a problem with typescript error handling when fetching all properties."
        }

        result = new ReturnValue(false, error)
    }
    
    return result;
    
}