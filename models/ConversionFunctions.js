import { DocumentSnapshot } from "firebase/firestore";
import { ReturnValue } from "./ReturnValue";
import { User } from "./User";
import { Property } from "./Property";
import { Application } from "./Application";
import { Notification, NotificationList } from "./Notification";
import { Conversation } from "./Conversation";

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
            profilePicture: snapshot.data().profilePicture,
            propertyId: snapshot.data().propertyId || undefined
    })
        result = new ReturnValue(true, "")
        result.resultData = convertedUser

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
            numBeds: snapshot.data().numBeds,
            numBath: snapshot.data().numBath,
            laundry: snapshot.data().laundry,
            parking: snapshot.data().parking,
            typeOfHome: snapshot.data().typeOfHome,
            petsAllowed: snapshot.data().petsAllowed,
            furnished: snapshot.data().furnished
        })
        result = new ReturnValue(true, "")
        result.resultData = convertedProp

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

/**
 * 
 * @param {DocumentSnapshot} snapshot The snapshot to convert to an application
 * @return {ReturnValue} The results of the conversion (stored in the resultData value)
 */
function snapshotToApplication(snapshot){
    let result = new ReturnValue()
    let convertedApp

    try{
        
        convertedApp = new Application({
            applicationID: snapshot.id,
            landlordID: snapshot.data().landlordID,
            renterID: snapshot.data().renterID,
            propertyID: snapshot.data().propertyID,
            firstName: snapshot.data().firstName,
            lastName: snapshot.data().lastName,
            email: snapshot.data().email,
            dob: snapshot.data().dob,
            phoneNumber: snapshot.data().phoneNumber,
            DLNumber: snapshot.data().DLNumber,
            maritalStatus: snapshot.data().maritalStatus,
            prevAddress: snapshot.data().prevAddress,
            startDate: snapshot.data().startDate,
            endDate: snapshot.data().endDate,
            presentLandlord: snapshot.data().presentLandlord,
            landlordPhone: snapshot.data().landlordPhone,
            leaveReason: snapshot.data().leaveReason,
            rentAmount: snapshot.data().rentAmount,
        })
        result = new ReturnValue("true")
        result.resultData = convertedApp

    } catch (e){
        let error = ""; 
        if (e instanceof Error) {
            error = e.message // works, `e` narrowed to Error
        } else{
            error = "Had a problem with typescript error handling when converting snapshot to application."
        }

        result = new ReturnValue(false, error)
    }
    return result
}

/**
 * 
 * @param {DocumentSnapshot} snapshot The snapshot to convert to a list of notifications under a specific user
 * @return {ReturnValue} The results of the conversion (stored in the resultData value)
 */
function snapshotToNotifUserList(snapshot){
    let result = new ReturnValue()
    let convertedNotifList
    let allNotifs

    try{
        
        allNotifs = []

        snapshot.data().notifications.forEach((notification) => {
            const notif = snapshotToNotif(notification);
            if(!notif.success){
                console.log(notif.errorMsg)
                return;
            }
            allNotifs.push(notif.resultData);
        });
        convertedNotifList = new NotificationList({
            notifID: snapshot.id,
            userID: snapshot.data().userID,
            notifications: allNotifs
        })
        result = new ReturnValue(true, "")
        result.resultData = convertedNotifList

    } catch (e){
        let error = ""; 
        if (e instanceof Error) {
            error = e.message // works, `e` narrowed to Error
        } else{
            error = "Had a problem with typescript error handling when converting snapshot to notification."
        }

        result = new ReturnValue(false, error)
    }
    return result
}


/**
 * 
 * @param {} inputObject The snapshot to convert to a notification object
 * @return {ReturnValue} The results of the conversion (stored in the resultData value)
 */
function snapshotToNotif(inputObject){
    let result = new ReturnValue()
    let convertedNotif

    try{
        
        convertedNotif = new Notification({
            message: inputObject.message,
            datetime: inputObject.datetime,
            isNew: inputObject.isNew,
        })
        result = new ReturnValue(true, "")
        result.resultData = convertedNotif

    } catch (e){
        let error = ""; 
        if (e instanceof Error) {
            error = e.message // works, `e` narrowed to Error
        } else{
            error = "Had a problem with typescript error handling when converting snapshot to notification."
        }

        result = new ReturnValue(false, error)
    }
    return result
}




/**
 * Converts a snapshot to a conversation object.
 * @param {DocumentSnapshot} snapshot The snapshot to convert to a conversation
 * @return {ReturnValue} The results of the conversion (stored in the resultData value)
 */
function snapshotToConversation(snapshot){

    let result = new ReturnValue()
    let convertedConv

    try{
        
        convertedConv = new Conversation({
            conversationID: snapshot.id,
            users: snapshot.data().users,
            messages: snapshot.data().messages,
        })
        result = new ReturnValue(true, "")
        result.resultData = convertedConv

    } catch (e){
        let error = ""; 
        if (e instanceof Error) {
            error = e.message // works, `e` narrowed to Error
        } else{
            error = "Had a problem with typescript error handling when converting snapshot to notification."
        }

        result = new ReturnValue(false, error)
    }
    return result
}

export {snapshotToUser, snapshotToProperty, snapshotToApplication, snapshotToNotifUserList, snapshotToNotif, snapshotToConversation}