import { ReturnValue } from '../../models/ReturnValue';
import { db } from '../../firebaseConfig';
import { getUserByID } from './GetUserByID';
import { doc, setDoc } from 'firebase/firestore';

/**
 * Update a user in Firestore.
 * @param {User} thisUser The details of the user to update
 * @returns {ReturnValue} Result of the operation. If successful, resultData contains the updated user.
 */
export async function updateUser(thisUser) {
  let result = new ReturnValue(false, "");

  try {
    if (!thisUser) throw new Error("thisUser is undefined");

    const userRef = doc(db, 'Users', thisUser.userID);
    await setDoc(userRef, { ...thisUser });
    thisUser.userID = userRef.id;

    result = await getUserByID(thisUser.userID);
  } catch (e) {
    const error = e instanceof Error ? e.message : "Unknown error updating user.";
    result = new ReturnValue(false, error);
  }

  return result;
}
