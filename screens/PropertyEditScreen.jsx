import React, {useEffect, useState} from 'react'
import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native'
import TextField from '../components/TextField'
import { useNavigation, useRoute } from '@react-navigation/native'
import { getPropertyByID } from '../database_calls/property/GetPropertyByID'
import Icon from 'react-native-vector-icons/Feather'
import PrimaryButton from '../components/PrimaryButton'
import DropDown from '../components/DropDown'
import { Property } from '../models/Property'
import { updateProperty } from '../database_calls/property/UpdateProperty'
import { useTheme } from '../ThemeContext'
import TextFieldLong from '../components/TextFieldLong'
import ImageCarousel from '../components/ImageCarousel'
import { stylesModal } from '../styles/ModalStyle'
import { uploadImage } from '../database_calls/uploadImages'
import ValidateAddress from '../database_calls/api/ValidateAddress'
import NotificationModal from '../components/NotificationModal'


export const PropertyEditScreen = () =>{
    
    const route = useRoute();
    const {propertyID} = route.params
    const theme = useTheme()    
    const [activeImageIndex, setActiveImageIndex] = useState(0)
    const [message, setMessage] = useState("")
    const [visible, setVisible] = useState(false)
    const [renterVisible, setRenterVisible] = useState(false)

    // variables
    const [property, setProperty] = useState(new Property({})) // initialize property to empty
    // create an array to hold state values
    const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']    

    // navigation
    const navigation = useNavigation();

    useEffect(()=>{
        getPropertyInfo();
      }, [])

    const getPropertyInfo = async() =>{
        const result = await getPropertyByID(propertyID)
        setProperty(result.resultData)
    }

    const toggleNotifModal = () => {
        setVisible(!visible)
    }

    const toggleRentalModal = () => {
        setRenterVisible(!renterVisible)
    }

    const updateThisProperty = async() => {
        console.log(property)
        const result = await updateProperty(property)

        if(!result.success){
            console.log(result.errorMsg)
            return;
        }

        navigation.navigate('Landlord Dashboard');
    }

    const verifyAddress = async() =>{

        const data = {
            address: {
                regionCode: "US",
                addressLines: [`${property.address}`, `${property.city}, ${property.state}, ${property.zipcode}`]
            }
            };

        const response = await ValidateAddress(data)

        const possibleAction = response.result.verdict.possibleNextAction
        console.log("PossibleNextAction:", possibleAction)

        if (possibleAction == "ACCEPT"){
            updateThisProperty();
        }else{
            setMessage("Address cannot be verified!")
            toggleNotifModal()
        }

    }

    const addImage = async() => {
             
        const imageInfo = await uploadImage(true, 5) // allowsMultipleSelection = true, selectionLimit = 5

        if (imageInfo != null){
            setProperty({...property, images: imageInfo})
        }
    
    }
    
    const deleteImage = async() => {
        setProperty(prevProperty => ({
        ...prevProperty,
        images: prevProperty.images.filter((_, i) => i !== activeImageIndex),
        }));
    }

    const addRenter = () => {
        setMessage("Enter the renter's email address to send an invite")
        toggleRentalModal()

    }

    return (
        <View style={[styles.component, theme.container]}>

            <ScrollView
            showsVerticalScrollIndicator={false}
            >

                <View style={styles.spacing}>

                <PrimaryButton
                title="Add Renter"
                size="small"
                onPress={() => addRenter()}
                customStyle={{alignSelf: 'flex-end'}}
                />

                { property.images == null || property.images.length == 0 ? (
                
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
                    <View>
                        <ImageCarousel 
                        images={property.images} 
                        imageStyle={{height: 300, borderRadius: 8}}
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
            
            <View>
                <Text>Street Address</Text>
                <TextField
                placeholder={property.address}
                value={property.address}
                onChangeText={(text) => setProperty({ ...property, address: text })}
                />
            </View>
            <View style={styles.cityStateZip}>
                <View style={{ flex: 1, marginRight: 6 }}>
                    <Text>City</Text>
                    <TextField
                    placeholder={property.city}
                    value={property.city}
                    onChangeText={(text) => setProperty({ ...property, city: text })}
                    />
                </View>

                <View style={{ flex: 0.5, marginRight: 6 }}>
                    <Text>State</Text>
                    <DropDown
                    placeholder={property.state}
                    options={states}
                    value={property.state}
                    onSelect={(text) => setProperty({ ...property, state: text })}
                    />
                </View>

                <View style={{ flex: 0.8 }}>
                    <Text>Zip Code</Text>
                    <TextField
                    placeholder={property.zipcode}
                    value={property.zipcode}
                    maxLength={15}
                    onChangeText={(text) => setProperty({ ...property, zipcode: text })}
                    />
                </View>
            </View>

            <View>
                <Text>Rent Price</Text>
                <TextField
                placeholder={String(property.monthlyPrice)}
                value={String(property.monthlyPrice)}
                onChangeText={(text) => setProperty({ ...property, monthlyPrice: text })}
                />
            </View>

            <View>
                <Text>Description</Text>
                <TextFieldLong
                  placeholder={property.description}
                  value={property.description}
                  onChangeText={(text) => setProperty({ ...property, description: text })}
                  maxLength={200}
                  />
            </View>

            <View>
                <Text>Number of Beds</Text>
                <TextField
                placeholder={property.numBeds}
                value={property.numBeds}
                onChangeText={(text) => setProperty({...property, numBeds: text})}
                />
            </View>

            <View>
                <Text>Number of Baths</Text>
                <TextField
                placeholder={property.numBath}
                value={property.numBath}
                onChangeText={(text) => setProperty({...property, numBath: text})}
                />
            </View>

            <View>
                <Text>Washer/Dryer</Text>
                <TextField
                placeholder={property.laundry}
                value={property.laundry}
                onChangeText={(text) => setProperty({...property, laundry: text})}
                />
            </View>

            <View>
                <Text>Parking Options</Text>
                <TextField
                placeholder={property.parking}
                value={property.parking}
                onChangeText={(text) => setProperty({...property, parking: text})}
                />
            </View>

            <View>
                <Text>Housing Type</Text>
                <TextField
                placeholder={property.typeOfHome}
                value={property.typeOfHome}
                onChangeText={(text) => setProperty({...property, typeOfHome: text})}
                />
            </View>

            <View>
                <Text>Are Pets Allowed</Text>
                <TextField 
                placeholder={property.petsAllowed}
                value={property.petsAllowed}
                onChangeText={(text) => setProperty({...property, petsAllowed: text})}
                />
            </View>

            <View>
                <Text>Is this property furnished?</Text>
                <TextField
                placeholder={property.furnished}
                value={property.furnished}
                onChangeText={(text) => setProperty({...property, furnished: text})}
                />
            </View>

            <PrimaryButton
            title="Save"
            size="small"
            onPress={verifyAddress}
            />

            </View>
            </ScrollView>

            {visible && (
            <NotificationModal 
                visible={visible}
                message={message}
                onClose={toggleNotifModal}
            />
            )}

            {renterVisible && (
            <NotificationModal
                visible={renterVisible}
                message={message}
                onClose={toggleRentalModal}
                dynamic={true}
                textMessage={"Renter's Email Address"}
            />
            )}


        </View>
    );
}

const styles = StyleSheet.create({
    component:{
        width: '100%',
        justifyContent: 'center',
        paddingHorizontal: 10,
        flex: 1
    },
    fieldContainer: {
    marginBottom: 10, 
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
    marginBottom: 10,
    marginTop: 10
  },
  addImage:{
    alignItems: 'center',
    justifyContent: 'center'
  },
  spacing:{
    flexDirection: 'column',
    gap: 8
  },
  cityStateZip:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
}
})

export default PropertyEditScreen;