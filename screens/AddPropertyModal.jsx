import React, {useState} from 'react'
import Icon from 'react-native-vector-icons/Feather';
import { Property } from '../models/Property'
import { GlobalValues } from '../GlobalValues'
import { createProperty } from '../database_calls/property/CreateProperty'
import {View, Text, Pressable, Modal, ScrollView, StyleSheet, Image} from 'react-native'
import DropDown from '../components/DropDown'
import TextField from '../components/TextField'
import PrimaryButton from '../components/PrimaryButton'
import CustomDivider from '../components/divider'
import { useTheme } from '../ThemeContext';
import TextFieldLong from '../components/TextFieldLong';
import { stylesModal } from '../styles/ModalStyle';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { uploadImage } from '../database_calls/uploadImages';

const AddProperty = ({visible, onClose}) =>{
    // declare variables
    const propertyID = "setLater"
    const landlordID = GlobalValues.currentUser.userID
    const renterID = "none"
    const [address, setAddress] = useState("")
    const [monthlyPrice, setMonthlyPrice] = ("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [zipcode, setZipcode] = useState("")
    const [images, setImages] = useState(null)
    const [uri, setUri] = useState(null)
    const [description, setDescription] = useState("")
    const [reviews, setReviews] = useState([])
    const [avgRating, setAvgRating] = useState(0.0)
    const [numBeds, setNumBeds] = useState("")
    const [numBath, setNumBath] = useState("")
    const [laundry, setLaundry] = useState("")
    const [parking, setParking] = useState("")
    const [typeOfHome, setTypeOfHome] = useState("")
    const [petsAllowed, setPetsAllowed] = useState("")
    const [furnished, setFurnished] = useState("")
    const theme = useTheme()

    // create an array to hold state values
    const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']    

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
            console.log("Property created", result.propertyData)
            // close the modal after submission
            onClose() 
        }catch(e){
            console.log("Error creating property:", e)
        }

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
    }

    const addImage = async() => {
         
        const imageInfo = await uploadImage(true, 5)

        if (imageInfo != null){
            setImages(imageInfo)
        }

    }
    
    return (
            <Modal
            visible={visible}
            transparent={true}
            onRequestClose={onClose} // for Android hardware back button
            animationType= 'slide' // pop-up slides up on the screen
            >
                <View style={stylesModal.centeredView}>
                  <View style={stylesModal.contentView}>
                    <View style={stylesModal.banner}>
                        <View style={stylesModal.back}>
                            <Pressable
                            onPress={onClose}>
                                <Icon name='arrow-left' size={24} color={theme.textColor.color}/>
                            </Pressable>
                            <Text style={[stylesModal.text, theme.textColor]}>Add Listing</Text>
                        </View>
                        <CustomDivider/>
                    </View>
                    <ScrollView
                    showsVerticalScrollIndicator={false}>
                      <View style={stylesModal.spacing}>
                          {/* for the image box */}
                          <Pressable 
                          style={[stylesModal.imageBox, theme.container]}
                          onPress={addImage}>
                              <View style={stylesModal.addImage}>
                                { images == null ? (
                                    <View>
                                        <Icon name="plus" size={30} color={theme.textColor.color}/>
                                        <Text style={theme.textColor}>Add images</Text>
                                    </View>
                                ):(
                                    <Image source={{uri: images[0]}} style={{ width: 324, height: 150, borderRadius: 10 }}/>
                                )}
                              </View>
                          </Pressable>
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
                          {/* comment */}
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
                          onPress={addProperty}
                          title="Submit"
                          size="small"
                          fontSize={12}
                          />
                      </View>
                    </ScrollView>
                  </View>
                </View>
            </Modal>
    )
}



export default AddProperty