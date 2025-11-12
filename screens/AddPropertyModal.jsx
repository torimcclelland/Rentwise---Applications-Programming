import React, {useState} from 'react'
import Icon from 'react-native-vector-icons/Feather';
import { Property } from '../models/Property'
import { GlobalValues } from '../GlobalValues'
import { createProperty } from '../database_calls/property/CreateProperty'
import {View, Text, Pressable, Modal, ScrollView} from 'react-native'
import DropDown from '../components/DropDown'
import TextField from '../components/TextField'
import PrimaryButton from '../components/PrimaryButton'
import CustomDivider from '../components/divider'
import { useTheme } from '../ThemeContext';
import TextFieldLong from '../components/TextFieldLong';
import { stylesModal } from '../styles/ModalStyle';
import { uploadImage } from '../database_calls/uploadImages';
import ImageCarousel from '../components/ImageCarousel';
import NotificationModal from '../components/NotificationModal';
import ValidateAddress from '../database_calls/api/ValidateAddress';

const AddProperty = ({visible, onClose}) =>{
    // declare variables
    const propertyID = "setLater"
    const landlordID = GlobalValues.currentUser.userID
    const renterID = "none"
    const [address, setAddress] = useState("")
    const [monthlyPrice, setMonthlyPrice] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [zipcode, setZipcode] = useState("")
    const [images, setImages] = useState(null)
    const [activeImageIndex, setActiveImageIndex] = useState(0)
    const [description, setDescription] = useState("")
    const [reviews, setReviews] = useState([])        ///// these are currently just placeholders and not actually functional yet
    const [avgRating, setAvgRating] = useState(0.0)   /////
    const [numBeds, setNumBeds] = useState("")
    const [numBath, setNumBath] = useState("")
    const [laundry, setLaundry] = useState("")
    const [parking, setParking] = useState("")
    const [typeOfHome, setTypeOfHome] = useState("")
    const [petsAllowed, setPetsAllowed] = useState("")
    const [furnished, setFurnished] = useState("")
    const theme = useTheme()
    const [isVisible, setIsVisible] = useState(false)
    const [message, setMessage] = useState("")

    // create an array to hold state values
    const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']    

    const closeModal = () => {

        // clear values for next property creation
            setAddress("")
            setCity("")
            setState("")
            setZipcode("")
            setDescription("")
            setMonthlyPrice("")
            setNumBeds("")
            setNumBath("")
            setLaundry("")
            setParking("")
            setTypeOfHome("")
            setPetsAllowed("")
            setFurnished("")
            setImages(null)

            // close the modal
            onClose()
    }

    const toggleNotifModal = () =>{
        setIsVisible(!isVisible)
    }

    const verifyInput = async() => {
        const requiredFields = {
            address, 
            city, 
            state, 
            zipcode, 
            description, 
            monthlyPrice, 
            numBath, 
            numBeds, 
            laundry, 
            parking, 
            typeOfHome, 
            petsAllowed, 
            furnished}

            const emptyFields = Object.entries(requiredFields)
            .filter(([key, value]) => !value.trim())
            .map(([key]) => key);

            if (emptyFields.length > 0) {
            setMessage("Please fill in the empty fields")
            toggleNotifModal()
            return;
            }else{
                verifyAddress()
            }
    }

    const verifyAddress = async() =>{
        
        const data = {
            address: {
                regionCode: "US",
                addressLines: [`${address}`, `${city}, ${state} ${zipcode}`],
            },
            };
        
        console.log("reached")
        const response = await ValidateAddress(data)
        console.log("done")
        
        const possibleAction = response.result.verdict.possibleNextAction
        console.log("PossibleAction: ", possibleAction)

        if (possibleAction == "ACCEPT"){
            addProperty();
        }else{
            setMessage("Address cannot be verified!")
            toggleNotifModal()
        }

    }


    // function to create the property and push to database
    const addProperty = async() =>{
        const property = new Property({
            propertyID, // we will set the propertyID for the property object in the createProperty function
            landlordID,
            renterID,
            address,
            monthlyPrice,
            city,
            state,
            zipcode,
            images,
            description,
            reviews,
            avgRating,
            numBeds,
            numBath,
            laundry,
            parking,
            typeOfHome,
            petsAllowed,
            furnished
    })

        try{
            const result = await createProperty(property)
            console.log("Property created", result.resultData)
            // close the modal after submission
            onClose() 

        }catch(e){
            console.log("Error creating property:", e)
        }

    }

    const addImage = async() => {
         
        const imageInfo = await uploadImage(true, 5) // allowsMultipleSelection = true, selectionLimit = 5

        if (imageInfo != null){
            setImages(imageInfo)
        }

    }

    const deleteImage = async() => {
        setImages(images => images.filter((_, i) => i != activeImageIndex))
    }

    return (
            <Modal
            visible={visible}
            transparent={true} // transparent background
            onRequestClose={onClose} // for Android hardware back button
            animationType= 'slide' // pop-up slides up on the screen
            >
                <View style={stylesModal.centeredView}>

                  <View style={stylesModal.contentView}>

                    <View style={stylesModal.banner}>
                        <View style={stylesModal.back}>
                            {/* Back button */}
                            <Pressable
                            onPress={closeModal}
                            >
                                <Icon name='arrow-left' size={24} color={theme.textColor.color} />
                            </Pressable>

                            <Text style={[stylesModal.text, theme.textColor, {alignSelf: 'center'}]}>Add Listing</Text>
                        </View>

                        <CustomDivider/>
                    </View>

                    <ScrollView
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled={true}
                    >
                      <View style={stylesModal.spacing}>
    
                        { /* Display the pressable image box if there are no images- 
                        otherwise display the image carousel with edit/delete functionality */}

                        { images == null || images.length == 0 ? (

                            // Add images box
                            <Pressable
                            style={[stylesModal.imageBox, theme.container]}
                            onPress={addImage}
                            >
                                <View style={stylesModal.addImage}>
                                    <Icon name="plus" size={30} color={theme.textColor.color}/>
                                    <Text style={theme.textColor}>Add images</Text>
                                </View>    
                            </Pressable>

                        ) : (
                            
                            // Image carousel + controls
                            <View>

                                <ImageCarousel 
                                images={images} 
                                imageStyle={{height: 300}}
                                onActiveImageChange={setActiveImageIndex}
                                />

                                <View style={stylesModal.editButtons}>

                                    { /* edit button */}
                                    <Pressable style={stylesModal.iconButton} onPress={addImage}>
                                        <Icon name="edit-3" size={20} />
                                    </Pressable>

                                    {/* delete button */}
                                    <Pressable style={stylesModal.iconButton} onPress={deleteImage}>
                                        <Icon name="trash-2" size={20} />
                                    </Pressable>
                                </View>

                            </View>
                        )}
                        
                          <TextField
                          placeholder="Street Address"
                          value={address}
                          onChangeText={setAddress}
                          />

                          <TextField
                          placeholder="City"
                          value={city}
                          onChangeText={setCity}
                          />

                          <DropDown
                          placeholder="Select State"
                          options={states}
                          value={state}
                          onSelect={setState}
                          />

                          <TextField
                          textType="numeric"
                          placeholder="Zipcode"
                          value={zipcode}
                          onChangeText={setZipcode}
                          />

                          <TextFieldLong
                          placeholder="Description"
                          value={description}
                          onChangeText={setDescription}
                          maxLength={200}
                          />

                          <TextField
                          textType="numeric"
                          placeholder="Rent price"
                          value={monthlyPrice}
                          onChangeText={setMonthlyPrice}
                          />

                          <TextField
                          textType="numeric"
                          placeholder="Number of Beds"
                          value={numBeds}
                          onChangeText={setNumBeds}
                          />

                          <TextField
                          textType="numeric"
                          placeholder="Number of Baths"
                          value={numBath}
                          onChangeText={setNumBath}
                          />

                          <DropDown
                          placeholder="Washer/Dryer"
                          options={["In-unit", "Shared", "None"]}
                          value={laundry}
                          onSelect={setLaundry}
                          />

                          <DropDown
                          placeholder="Parking"
                          options={["Street Parking", "On Premises", "Garage Parking"]}
                          value={parking}
                          onSelect={setParking}
                          />

                          <DropDown
                          placeholder="Housing Type"
                          options={["Home", "Apartment", "Condo", "Town House"]}
                          value={typeOfHome}
                          onSelect={setTypeOfHome}
                          />

                          <DropDown
                          placeholder="Pets Allowed?"
                          options={["Yes", "No"]}
                          value={petsAllowed}
                          onSelect={setPetsAllowed}
                          />

                          <DropDown
                          placeholder='Furnished?'
                          options={["Yes", "No"]}
                          value={furnished}
                          onSelect={setFurnished}
                          />

                          <PrimaryButton
                          onPress={verifyInput}
                          title="Submit"
                          size="small"
                          fontSize={12}
                          />

                      </View>
                    </ScrollView>
                  </View>
                </View>

                <NotificationModal
                message={message}
                visible={isVisible}
                onClose={toggleNotifModal}
                />

            </Modal>
    )
}

export default AddProperty