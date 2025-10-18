import { DocumentSnapshot } from "firebase/firestore";
import { ReturnValue } from "./ReturnValue";

function snapshotToUser(snapshot){

    let result = new ReturnValue

    try{
        
        const convertedUser = {
            userID: snapshot.id,
            email: snapshot.get("email"),
            password : snapshot.get("password"),
            firstName: snapshot.get("firstName"),
            lastName: snapshot.get("lastName"),
            displayName: snapshot.get("displayName"),
            isLandLord: snapshot.get("isLandLord"),
            isPremUser: snapshot.get("isPremUser"),
            properties: snapshot.get("properties"),
        }
        result = new ReturnValue(true, "", convertedUser)

    } catch (e){
        let error = ""; 
        if (e instanceof Error) {
            error = e.message // works, `e` narrowed to Error
        } else{
            error = "Had a problem with typescript error handling when converting snapshot to user."
        }

        result = new ReturnValue(false, error)
    }
    return result
}

/**
 * 
 * @param {DocumentSnapshot} snapshot The snapshot to convert to a property
 * @returns {ReturnValue} The results of the conversion
 */
function snapshotToProperty(snapshot){

    let result = new ReturnValue

    try{
        
        const convertedProp = {
            propertyID: snapshot.id,
            landlordID: snapshot.get("landlordID"),
            address : snapshot.get("address"),
            monthlyPrice: snapshot.get("monthlyPrice"),
            city: snapshot.get("city"),
            state: snapshot.get("state"),
            zipcode: snapshot.get("zipcode"),
            images: snapshot.get("images"),
            description: snapshot.get("description"),
            reviews: snapshot.get("reviews"),
            avgRating: snapshot.get("avgRating"),
        }
        result = new ReturnValue(true, "", {}, convertedProp)

    } catch (e){
        let error = ""; 
        if (e instanceof Error) {
            error = e.message // works, `e` narrowed to Error
        } else{
            error = "Had a problem with typescript error handling when converting snapshot to property."
        }

        result = new ReturnValue(false, error)
    }
    return result
}

export {snapshotToUser, snapshotToProperty}