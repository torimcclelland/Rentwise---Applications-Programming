import { collection, getDocs, query, where } from 'firebase/firestore';
import { User } from '../../models/User';
import { ReturnValue } from '../../models/ReturnValue';
import { db } from '../../firebaseConfig';
import { Property } from '../../models/Property';

/**
 * 
 * @param {User} landlord The details of the property to find by landlord id (must not be empty)
 * @returns {ReturnValue} The results of the operation. If successful, the propertyList field contains the details of the retrieved properties.
 */
export async function getPropertyByLandlord(landlord) {

    var result = new ReturnValue(false, "");
    
    if(landlord.id == ""){
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

//        listOfDocs = snapshot.docs.map(doc => doc.data())

        const propList = [];
        snapshot.forEach((doc) => {
            const data = doc.data();
            const property = new Property(
                doc.id,
                data.landlordID,
                data.address,
                data.monthlyPrice,
                data.city,
                data.state,
                data.zipcode,
                data.images,
                data.description,
                data.reviews,
                data.avgRating
            );
            propList.push(property);
        });

        console.log(propList)

        // success
        result = new ReturnValue(true, "")
        //result.propertyList = listOfDocs

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