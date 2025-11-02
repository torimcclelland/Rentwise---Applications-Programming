import { addDoc, collection } from 'firebase/firestore';
import { ReturnValue } from '../../models/ReturnValue';
import { db } from '../../firebaseConfig';
import { getApplicationByID } from './GetApplicationByID';
import { Application } from '../../models/Application';

/** 
 * @param {Application} newApplication The details of the application to create
 * @returns {ReturnValue} The results of the operation. If successful, the applicationData field contains the details of the newly created application.
 */

export async function createApplication(newApplication) {

    var result = new ReturnValue(false, "");

    // try catch to handle any errors
    try{
        // try to store application in database
        if (!newApplication) throw new Error("newApplication is undefined");
        
        const tempCol = collection(db, 'Applications')
        const docRef = await addDoc(tempCol, {...newApplication});

        // here the applicationID is set as the document id just in the application object, it is still "setLater" in the database
        newApplication.applicationID = docRef.id
        
        // retrieve newly made application by calling the getApplicationByID function
        result = await getApplicationByID(newApplication.applicationID);

    } catch(e){
        let error = ""; 
        if (e instanceof Error) {
            error = e.message // works, `e` narrowed to Error
        } else{
            error = "Had a problem with typescript error handling when adding application."
        }

        result = new ReturnValue(false, error)
    }
    
    return result;
    
}