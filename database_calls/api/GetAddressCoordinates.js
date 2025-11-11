
const getAddressCoordinates = async(address) => {

    const api_key =  // ENCRYPT THIS


    console.log("Calling API..")

    const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${api_key}`
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


getAddressCoordinates()