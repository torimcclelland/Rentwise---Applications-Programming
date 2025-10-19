import { DocumentSnapshot } from "firebase/firestore";
import { ReturnValue } from "./ReturnValue";
import { User } from "./User";
import { Property } from "./Property";

function snapshotToUser(snapshot){

    let result = new ReturnValue
    let convertedUser; 

    try{
        
        convertedUser = new User({
            userID: snapshot.id,
            email: snapshot.email,
            password: snapshot.password,
            firstName: snapshot.firstName,
            lastName: snapshot.lastName,
            displayName: snapshot.displayName,
            isLandLord: snapshot.isLandLord,
            isPremUser: snapshot.isPremUser,
            properties: snapshot.properties,
    })
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
    return convertedUser
}

/**
 * 
 * @param {DocumentSnapshot} snapshot The snapshot to convert to a property
 * @returns {ReturnValue} The results of the conversion
 */
function snapshotToProperty(snapshot){

    let result = new ReturnValue()
    let convertedProp

    try{
        
        convertedProp = {
            propertyID: snapshot.propertyID,
            landlordID: snapshot.landlordID,
            address : snapshot.address,
            monthlyPrice: snapshot.monthlyPrice,
            city: snapshot.city,
            state: snapshot.state,
            zipcode: snapshot.zipcode,
            images: snapshot.images,
            description: snapshot.description,
            reviews: snapshot.reviews,
            avgRating: snapshot.avgRating,
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
    return convertedProp
}

export {snapshotToUser, snapshotToProperty}