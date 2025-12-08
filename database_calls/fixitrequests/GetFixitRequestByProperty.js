import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { ReturnValue } from '../../models/ReturnValue';
import { FixitRequest } from '../../models/FixitRequest';

/**
 * @param {string} landlordID The ID of the landlord responsible for the property
 * @returns {ReturnValue} The result of the operation. If successful, resultData contains an array of FixitRequest objects.
 */
export async function getFixitRequestsByPropertyID(propertyID) {
    let result = new ReturnValue(false, "");

    try {
        if (!propertyID) throw new Error("propertyID is undefined");
        const requestsRef = collection(db, 'FixitRequests');
        const q = query(requestsRef, where('propertyID', '==', propertyID));
        const querySnapshot = await getDocs(q);

        const requests = querySnapshot.docs.map(doc => {
            return new FixitRequest({ ...doc.data(), requestID: doc.id });
        });

        result = new ReturnValue(true, "", requests);
    } catch (e) {
        const error = e instanceof Error ? e.message : "Unexpected error when retrieving FixitRequests by propertyID.";
        result = new ReturnValue(false, error);
    }

    return result;
}
