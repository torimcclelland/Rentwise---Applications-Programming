import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native'
import { View, Text, FlatList, TouchableOpacity, Image, Modal, ScrollView, Pressable} from 'react-native';
import PropertyCard from '../components/propertyCard';
import { getPropertyByLandlord } from '../database_calls/property/GetPropertyByLandlord';
import { GlobalValues } from '../GlobalValues';
import { ReturnValue } from '../models/ReturnValue';
import PrimaryButton from '../components/PrimaryButton';
import TextField from '../components/TextField';
import CustomDivider from '../components/divider';
import { createProperty } from '../database_calls/property/CreateProperty';
import Icon from 'react-native-vector-icons/Feather';
import DropDown from '../components/DropDown';
import {
    createStaticNavigation,
    useNavigation,
  } from '@react-navigation/native';
import { Property } from '../models/Property';
import TextFieldLong from '../components/TextFieldLong';


export const LandlordPropertiesScreen = () =>{

  const [modalVisible, setModalVisible] = useState(false);
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [rentPrice, setRentPrice] = useState("");
  const [description, setDescription] = useState("");

  // create an array to hold state values
  const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']

  // navigation
  const navigation = useNavigation();

  // function to toggle modal visibility
  const toggleModal = () =>{
    setModalVisible(!modalVisible)
  }
  
  const addProperty = async () => {
    const property = new Property({
      propertyID: "",
      landlordID: GlobalValues.currentUser.userID, // landlordId
      address: streetAddress,  
      monthlyPrice: rentPrice || 100,  
      city: city,
      state: state,
      zipcode: zip,
      description: description
    });

    try {
      const result = await createProperty(property);

      if(!result.success){
        console.log(result.errorMsg)
        return
      }

      // add the property to our list of properties
      setPropertiesLs(propertiesLs => [...propertiesLs, result.propertyData]);
      toggleModal(); // close modal if success
    } catch (e) {
      console.log("Error creating property:", e);
    }

    // clear values for next property creation
    setStreetAddress("")
    setCity("")
    setState("")
    setZip("")
    setRentPrice("")
    setDescription("")
  };


  const [propertiesLs, setPropertiesLs]= useState([]);  

  // called when this window opened, use to call property update
  useEffect(()=>{
    getProperties();
  }, [])

  const getProperties = async () => {

    let result = new ReturnValue();
    
    result = await getPropertyByLandlord(GlobalValues.currentUser)
    console.log(result)

    setPropertiesLs(result.propertyList) // set the landlords properties from result
    
  }

  const editProperty = async(propertyID) => {
    navigation.navigate('Property Edit', {'propertyID': propertyID}); // pass the property ID to the screen
  }

  return (
    <View style={styles.main}>
        <View style={styles.pageContent}>
          <View style={styles.pageArea}>
            <Text style={[styles.text, {alignSelf: 'flex-start'}]}>My Listings</Text>
            <PrimaryButton
            title= "+ Add"
            fontWeight= {500}
            fontSize={12}
            size='small'
            customStyle={styles.addButton}
            onPress={toggleModal}
            />
          {propertiesLs.length > 0  ? (
            <FlatList
            data={propertiesLs}
            keyExtractor={(item) => item.propertyID?.toString()}
            contentContainerStyle={{ gap: 16 }}
            renderItem={({item}) => (
              <PropertyCard
                address={item.address}
                onPress={() => editProperty(item.propertyID)} // if the button is pressed move to edit page
                />
                )}
                />
                ) : (
                  <Text style={styles.text}>No properties listed yet</Text>
          )}
          </View>
          {/* nav bar divider */}
          <CustomDivider
          customStyles={{marginBottom: 20, marginTop: 20}}
          />
          <View style={styles.pageArea}>

            <Text style={[styles.text, {alignSelf: 'flex-start'}]}>Leased Properties</Text>
          </View>
        </View>


      <Modal
      visible={modalVisible}
      transparent={true}
      onRequestClose={toggleModal} // for Android hardware back button
      animationType= 'slide' // pop-up slides up on the screen
      >
        <View style={stylesModal.centeredView}>
              <View style={stylesModal.modalView}>
                <View style={stylesModal.contentView}>

              <View style={stylesModal.banner}>
                <View style={stylesModal.back}>
                  <Pressable
                  onPress={toggleModal}>
                    <Image style={styles.image} source={require('./backArrow.png')}/>
                  </Pressable>
                  <Text style={styles.text}>Add Listing</Text>
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
                  value={streetAddress}
                  onChangeText={setStreetAddress}
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
                  value={zip}
                  onChangeText={setZip}
                  />
                  <TextField
                  textType="numeric"
                  placeholder="Enter a rent price"
                  value={rentPrice}
                  onChangeText={setRentPrice}
                  />
                  <TextFieldLong
                  placeholder="Enter a description (200 characters max)"
                  value={description}
                  onChangeText={setDescription}
                  maxLength={200}
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
  );
};

const styles = StyleSheet.create ({
  main:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  topComponent:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pageContent:{
    width: '100%',
    height: '100%',
    padding: '10px',
  },
  pageArea:{
    justifyContent: 'top'
  },
  addButton: {
    height: 32,
    width: 71,
    alignSelf: 'flex-end'
  },
  text: {
    font: 'inter',
    fontWeight: 500,
    fontSize: 14,
  },
  image:{
    height: 24,
    width: 24
  }
});

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
})

export default LandlordPropertiesScreen
