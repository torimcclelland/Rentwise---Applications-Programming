import React, {useState} from 'react'
import Icon from 'react-native-vector-icons/Feather';
import { Property } from '../models/Property'
import { GlobalValues } from '../GlobalValues'
import { createProperty } from '../database_calls/property/CreateProperty'
import {View, Text, Pressable, Modal, Image, StyleSheet} from 'react-native'
import DropDown from '../components/DropDown'
import TextField from '../components/TextField'
import PrimaryButton from '../components/PrimaryButton'
import CustomDivider from '../components/divider'


const AddProperty = ({visible, onClose}) =>{
    // declare variables
    const [propertyID, setPropertyID] = useState("")
    const landlordID = GlobalValues.currentUser.userID
    const [address, setAddress] = useState("")
    const [monthlyPrice, setMonthlyPrice] = ("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [zipcode, setZipcode] = useState("")
    const [images, setImages] = useState([])
    const [description, setDescription] = useState("")
    const [reviews, setReviews] = useState([])
    const [avgRating, setAvgRating] = useState(0.0)

    // create an array to hold state values
    const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']    

    // function to create the property and push to database
    const addProperty = async() =>{
        const property = new Property(
            "setLater", // we will set the propertyID for the property object in the createProperty function
            landlordID,
            address,
            monthlyPrice,
            city,
            state,
            zipcode,
            images,
            description,
            reviews,
            avgRating 
        )

        try{
            const result = await createProperty(property)
            console.log("Property created", result.propertyData)
            // close the modal after submission
            onClose() 
        }catch(e){
            console.log("Error creating property:", e)
        }
    }
    
    return (
        <View>
            <Modal
            visible={visible}
            transparent={true}
            onRequestClose={onClose} // for Android hardware back button
            animationType= 'slide' // pop-up slides up on the screen
            >
                <View style={stylesModal.centeredView}>
                    <View style={stylesModal.modalView}>
                        <View style={stylesModal.contentView}>
                            <View style={stylesModal.banner}>
                                <View style={stylesModal.back}>
                                    <Pressable
                                    onPress={onClose}>
                                        <Image style={stylesModal.image} source={require('./backArrow.png')}/>
                                    </Pressable>
                                    <Text style={stylesModal.text}>Add Listing</Text>
                                </View>
                                <CustomDivider/>
                            </View>
                            <View style={stylesModal.spacing}>
                                {/* for the image box */}
                                <Pressable style={stylesModal.imageBox}>
                                    <View style={stylesModal.addImage}>
                                        <Icon name="plus" size={30} color="#666"/>
                                        <Text>Add images</Text>
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
                                <TextField
                                placeholder="description"
                                value={description}
                                onChangeText={setDescription}
                                />
                                <TextField
                                textType="numeric"
                                placeholder="Rent price"
                                value={monthlyPrice}
                                onChangeText={setMonthlyPrice}
                                />
                                <PrimaryButton
                                onPress={addProperty}
                                title="Submit"
                                size="small"
                                fontSize={12}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const stylesModal = StyleSheet.create({
  centeredView:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  banner:{
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 10
  },
  spacing:{
    flexDirection: 'column',
    gap: 16
  },
  modalView:{
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 5,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2}
  },
  contentView:{
    paddingHorizontal: 10
  },
  textBoxes:{
    flexDirection: 'row'
  },
  back:{
    flexDirection: 'row',
    marginBottom: 10
  },
  imageBox: {
    width: '100%',                
    height: 150,
    borderWidth: 2,
    borderColor: '#aaa',
    borderStyle: 'dashed',     
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  addImage:{
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    font: 'inter',
    fontWeight: 500,
    fontSize: 14,
  },
  image:{
    height: 24,
    width: 24
  },
})


export default AddProperty