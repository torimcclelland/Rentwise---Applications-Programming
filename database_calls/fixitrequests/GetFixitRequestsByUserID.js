import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { ReturnValue } from '../../models/ReturnValue';
import { FixitRequest } from '../../models/FixitRequest';

/**
 * @param {string} userID The ID of the user who submitted the requests
 * @returns {ReturnValue} The result of the operation. If successful, resultData contains an array of FixitRequest objects.
 */
export async function getFixitRequestsByUserID(userID) {
    let result = new ReturnValue(false, "");

    try {
        if (!userID) throw new Error("userID is undefined");

        const requestsRef = collection(db, 'FixitRequests');
        const q = query(requestsRef, where('userID', '==', userID));
        const querySnapshot = await getDocs(q);

        const requests = querySnapshot.docs.map(doc => {
            return new FixitRequest({ ...doc.data(), requestID: doc.id });
        });

        result = new ReturnValue(true, "", requests);
    } catch (e) {
        const error = e instanceof Error ? e.message : "Unexpected error when retrieving FixitRequests by userID.";
        result = new ReturnValue(false, error);
    }

    return result;
}
