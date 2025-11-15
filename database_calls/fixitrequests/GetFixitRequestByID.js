import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { ReturnValue } from '../../models/ReturnValue';
import { FixitRequest } from '../../models/FixitRequest';

/**
 * @param {string} requestID The document ID of the FixitRequest
 * @returns {ReturnValue} The result of the operation. If successful, resultData contains the FixitRequest object.
 */
export async function getFixitRequestByID(requestID) {
    let result = new ReturnValue(false, "");

    try {
        if (!requestID) throw new Error("requestID is undefined");

        const docRef = doc(db, 'FixitRequests', requestID);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) throw new Error("FixitRequest not found");

        const data = docSnap.data();
        const fixitRequest = new FixitRequest({ ...data, requestID });

        result = new ReturnValue(true, "", fixitRequest);
    } catch (e) {
        const error = e instanceof Error ? e.message : "Unexpected error when retrieving FixitRequest.";
        result = new ReturnValue(false, error);
    }

    return result;
}
