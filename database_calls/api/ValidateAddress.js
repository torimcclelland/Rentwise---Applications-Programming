import Constants from 'expo-constants';

const ValidateAddress = async(address) => {

    const { API_KEY } = Constants.expoConfig.extra;

    const url= `https://addressvalidation.googleapis.com/v1:validateAddress?key=${API_KEY.toString()}`

    console.log("Calling the validate address API...")

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(address)
    }
    )

    const result = await response.json()

    console.log(result)

    return result
}

export default ValidateAddress