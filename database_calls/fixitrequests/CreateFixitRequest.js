import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { ReturnValue } from '../../models/ReturnValue';
import { FixitRequest } from '../../models/FixitRequest';
import { getFixitRequestByID } from './GetFixitRequestByID';

/**
 * @param {FixitRequest} newRequest The details of the maintenance request to create
 * @returns {ReturnValue} The result of the operation. If successful, resultData contains the newly created request.
 */
export async function createFixitRequest(newRequest) {
    let result = new ReturnValue(false, "");

    try {
        if (!newRequest) throw new Error("newRequest is undefined");

        const tempCol = collection(db, 'FixitRequests');
        const docRef = await addDoc(tempCol, { ...newRequest });

        newRequest.requestID = docRef.id;

        result = await getFixitRequestByID(newRequest.requestID);
    } catch (e) {
        const error = e instanceof Error ? e.message : "Unexpected error when adding FixitRequest.";
        result = new ReturnValue(false, error);
    }

    return result;
}
