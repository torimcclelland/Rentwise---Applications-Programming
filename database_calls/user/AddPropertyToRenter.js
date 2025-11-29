import React, {useState} from 'react'
import {db} from '../../firebaseConfig';
import { GlobalValues } from '../../GlobalValues';
import { ReturnValue } from '../../models/ReturnValue';
import {doc, setDoc} from 'firebase/firestore'

export async function AddPropertyToRenter(propertyID) {


    const user = GlobalValues.currentUser;
    user.propertyId = propertyID; // set the user's new propertyID
    var result = new ReturnValue(false, "");

    if(!propertyID || propertyID.trim() === ""){
        result = new ReturnValue(false, " A valid propertyID must be provided.")
        return result;
    }

    try{
        // grab the current renter's document reference
        const userRef = doc(db, 'Users', user.userID)

        await setDoc(userRef, {...user})

        // retrieve uodated user details by calling the GetUserByID function


    }catch(e){
        let error = "";
        if (e instanceof Error){
            error = e.message // works, 'e' narrowed to error
        } else {
            error = "Had a problem with typescript error handling when updating the user"
        }

        result = new ReturnValue(false, error)
    }

    return result;

}