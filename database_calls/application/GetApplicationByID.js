import { doc, getDoc } from 'firebase/firestore';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { ReturnValue } from '../../models/ReturnValue';
import { db } from '../../firebaseConfig';
import { Application } from '../../models/Application';
import { snapshotToApplication } from '../../models/ConversionFunctions';

/**
 * 
 * @param {string} applicationToFind The id of the application to find
 * @returns {ReturnValue} The results of the operation. If successful, the resultData field contains the details of the retrieved user.
 */
export async function getApplicationByID(applicationToFind) {

    var result = new ReturnValue(false, "");
    
    if(!applicationToFind){
        result = new ReturnValue(false, "Application ID must not be empty.")
        return result
    }

    // try catch to handle any errors
    try{
         const applicationRef = doc(db, 'Applications', applicationToFind)
    
         const snapshot = await getDoc(applicationRef);

        if (snapshot.data() == undefined) {
            result = new ReturnValue(false, "No snapshots found for application with id " + applicationToFind);
            return result;
        } 

        // TODO: make a conversion function
        const applicationRetrieved = snapshotToApplication(snapshot);

        // success
        result = new ReturnValue(true, "")
        result.applicationData = applicationRetrieved.applicationData
        // console.log(result.applicationData)
        // we can prob remove


    } catch(e){
        let error = ""; 
        if (e instanceof Error) {
            error = e.message + " (find application problem)" // works, `e` narrowed to Error
        } else{
            error = "Had a problem with typescript error handling when finding application."
        }

        result = new ReturnValue(false, error)
    }
    
    return result;
    
}