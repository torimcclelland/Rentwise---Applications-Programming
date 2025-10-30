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
            email: snapshot.data().email,
            password: snapshot.data().password,
            firstName: snapshot.data().firstName,
            lastName: snapshot.data().lastName,
            isLandlord: snapshot.data().isLandlord,
            isPremUser: snapshot.data().isPremUser,
            properties: snapshot.data().properties,
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
    return result
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
        
        convertedProp = new Property({
            propertyID: snapshot.id,
            landlordID: snapshot.data().landlordID,
            renterID: snapshot.data().renterID,
            address: snapshot.data().address,
            monthlyPrice: snapshot.data().monthlyPrice,
            city: snapshot.data().city,
            state: snapshot.data().state,
            zipcode: snapshot.data().zipcode,
            images: snapshot.data().images,
            description: snapshot.data().description,
            reviews: snapshot.data().reviews,
            avgRating: snapshot.data().avgRating,
        })
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