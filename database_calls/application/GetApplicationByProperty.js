import { doc, getDoc } from 'firebase/firestore';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { ReturnValue } from '../../models/ReturnValue';
import { db } from '../../firebaseConfig';
import { Application } from '../../models/Application';
import { snapshotToApplication } from '../../models/ConversionFunctions';

/**
 * 
 * @param {Application} applicationToFind The id of the application to find
 * @returns {ReturnValue} The results of the operation. If successful, the resultData field contains the details of the retrieved user.
 */
export async function getApplicationByProperty(propertyID) {

    var result = new ReturnValue(false, "");
    let appList;
    
    if(!propertyID){
        result = new ReturnValue(false, "Landlord ID must not be empty.")
        return result
    }

    // try catch to handle any errors
    try{
        const applicationRef = collection(db, 'Applications')

        // query
        const newQuery = query(applicationRef, where("propertyID", "==", propertyID))
        
        const snapshot = await getDocs(newQuery);

        if (snapshot.docs.length == 0) {
            result = new ReturnValue(true, "");
            return result;
        }

        appList = [];
        snapshot.forEach((doc) => {
            const application = snapshotToApplication(doc);
            if(!application.success){
                console.log(application.errorMsg)
                return;
            }
            application.resultData.applicationID = doc.id;
            appList.push(application.resultData);
        });

        // success
        result = new ReturnValue(true, "")
        result.resultList = appList

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