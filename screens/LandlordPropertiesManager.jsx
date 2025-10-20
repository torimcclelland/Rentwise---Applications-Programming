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
import {
    createStaticNavigation,
    useNavigation,
  } from '@react-navigation/native';
import { Property } from '../models/Property';


//         id = "",
//         landlordID = "",
//         address = "",
//         monthlyPrice = 0.0,
//         city = "",
//         state = "",
//         zipcode = "",
//         images = [],
//         description = "",
//         reviews = [],
//         avgRating = 0.0,

export const LandlordPropertiesScreen = () =>{

  const [modalVisible, setModalVisible] = useState(false);
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [rentPrice, setRentPrice] = useState("");
  const [description, setDescription] = useState("");
  const [avgRating, setAvgRating] = useState(0.0)
  // possibly add more check with group
  // navigation
  const navigation = useNavigation();

  // function to toggle modal visibility
  const toggleModal = () =>{
    setModalVisible(!modalVisible)
  }
  
  const addProperty = async () => {
    const property = new Property(
      GlobalValues.currentUser.userID, // landlordId
      "1", // propertyId
      streetAddress,  
      rentPrice || 100,  
      city,
      state,
      zip,
      description
    );

    try {
      const result = await createProperty(property);
      console.log("Property created!");
      toggleModal(); // close modal if success
    } catch (e) {
      console.log("Error creating property:", e);
    }
  };


  const [propertiesLs, setPropertiesLs]= useState([]);  

  // called when this window opened, use to call property update
  useEffect(()=>{
    getProperties();
  }, [])

  const getProperties = async () => {
    let result = new ReturnValue();
    console.log(GlobalValues.currentUser)
    result = await getPropertyByLandlord(GlobalValues.currentUser)
    console.log(result)
    setPropertiesLs(result.propertyList) // set the landlords properties from result
    //console.log(propertiesLs)

    //console.log("properties found:", propertiesLs)
  }

  const editProperty = async(propertyID) => {
    navigation.navigate('Property Edit', {'propertyID': propertyID}); // pass the property ID to the screen
  }

  return (
    <View style={styles.main}>
      <View>
      <View style={styles.topComponent}>
        <Text style={[styles.text, {alignSelf: 'flex-start'}]}>My Listings</Text>
        <PrimaryButton
        title= "+ Add"
        fontWeight= {500}
        fontSize={12}
        size='small'
        customStyle={styles.addButton}
        onPress={toggleModal}
        />
      </View>
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
        <Text>No properties listed yet</Text>
      )}
      {/* nav bar divider */}
      <CustomDivider
      customStyles={{marginBottom: 20, marginTop: 20}}
      />
      <Text style={[styles.text, {alignSelf: 'flex-start'}]}>Leased Properties</Text>
      </View>


      <Modal
      visible={modalVisible}
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
                        <Icon name="plus" size={30} color="#666" />
                        <Text>Add images</Text>
                      </View>
                    </Pressable>
                    <TextField
                    placeholder="Street Address"
                    value={streetAddress}
                    onChangeText={setStreetAddress}
                    />
                    <TextField
                    style={styles.textbox}
                    placeholder="City"
                    value={city}
                    onChangeText={setCity}
                    />
                    <TextField
                    style={styles.textbox}
                    placeholder="Zipcode"
                    value={zip}
                    onChangeText={setZip}
                    />
                    <TextField
                    style={styles.textbox}
                    placeholder="State"
                    value={state}
                    onChangeText={setState}
                    />
                    <TextField
                    placeholder="description"
                    value={description}
                    onChangeText={setDescription}
                    />
                    <TextField
                    placeholder="Rent price"
                    value={rentPrice}
                    onChangeText={setRentPrice}
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
    // paddingHorizontal: 25
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
    // alignSelf: 'center'
  },
  image:{
    height: 24,
    width: 24
  },
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
  textbox:{
    flex: 1
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
  }
})

export default LandlordPropertiesScreen
