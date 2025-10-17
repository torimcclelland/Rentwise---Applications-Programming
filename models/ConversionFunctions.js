import { ReturnValue } from "./ReturnValue";

export function snapshotToUser(snapshot){

    let result = new ReturnValue

    try{
        
        const convertedUser = {
            userID: snapshot.id,
            email: snapshot.get("email"),
            password : snapshot.get("password"),
            firstName: snapshot.get("firstName"),
            lastName: snapshot.get("lastName"),
            displayName: snapshot.get("displayName"),
            isLandLord: snapshot.get("isLandLord"),
            isPremUser: snapshot.get("isPremUser"),
            properties: snapshot.get("properties"),
        }
        result = new ReturnValue(true, "", convertedUser)

    } catch (e){
        let error = ""; 
        if (e instanceof Error) {
            error = e.message // works, `e` narrowed to Error
        } else{
            error = "Had a problem with typescript error handling when converting snapshot to user."
        }

        result = new ReturnValue(false, error)
    }
    return result
}