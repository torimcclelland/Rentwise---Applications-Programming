import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { User } from '../../models/User';
import { ReturnValue } from '../../models/ReturnValue';
import { db } from '../../firebaseConfig';

export async function getUserByEmail(userToFind: User): Promise<ReturnValue> {

    var result = new ReturnValue(false, "");

    // try catch to handle any errors
    try{
        
        
        // try to find user by ID
        const userRef = collection(db, 'Users')

        // query
        const newQuery = query(userRef, where("email", "==", userToFind.email), limit(1))

        const snapshot = await getDocs(newQuery);

        /*
        if (snapshot.size == 0) {
            result = new ReturnValue(false, "No snapshots found for user with email " + userToFind.id);
            return result;
        } 
        // success
        result = new ReturnValue(true, "", snapshot.docs[0].data().toObject(User))
        */
       
        // TODO: make a conversion function
        const userRetrieved = new User(
            snapshot.docs[0].data()!.email,
            snapshot.docs[0].data()!.password,
            snapshot.docs[0].data()!.isLandLord,
            snapshot.docs[0].data()!.isPremiumUser,
            snapshot.docs[0].data()!.properties,
            userToFind.id,
            snapshot.docs[0].data()!.firstName,
            snapshot.docs[0].data()!.lastName,
            snapshot.docs[0].data()!.displayName
        )

    } catch(e){
        let error:string = ""; 
        if (e instanceof Error) {
            error = e.message // works, `e` narrowed to Error
        } else{
            error = "Had a problem with typescript error handling when adding user."
        }

        result = new ReturnValue(false, error)
    }
    
    return result;
    
}