import Constants from 'expo-constants';


const getAddressCoordinates = async(address) => {

    const { API_KEY } = Constants.expoConfig.extra;

    console.log("Calling API...")

    const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY.toString()}`
    )

    const data = await response.json()

    if (data.results.length > 0){
        console.log(data.results[0].geometry.location)
        return {
            latitude: data.results[0].geometry.location.lat,
            longitude: data.results[0].geometry.location.lng
        }
    }else{
        return data
    } 

}

export default getAddressCoordinates
