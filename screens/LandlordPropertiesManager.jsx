import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native'
import { View, Text, FlatList, TouchableOpacity, Image, Modal, ScrollView, Pressable} from 'react-native';
import PropertyCard from '../components/propertyCard';
import { Property } from '../models/Property';
import { getPropertyByLandlord } from '../database_calls/property/GetPropertyByLandlord';
import { GlobalValues } from '../GlobalValues';
import { ReturnValue } from '../models/ReturnValue';
import PrimaryButton from '../components/PrimaryButton';
import TextField from '../components/TextField';
import CustomDivider from '../components/divider';
import { Property } from '../models/Property';
import { createProperty } from '../database_calls/property/CreateProperty';

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
  // const [numBed, setNumBed] = useState(0);
  // const [numBath, setNumBath] = useState(0);
  const [description, setDescription] = useState("");
  const [avgRating, setAvgRating] = useState(0.0)
  // possibly add more check with group

  // function to toggle modal visibility
  const toggleModal = () =>{
    setModalVisible(!modalVisible)
  }
  
  const addProperty = async () => {
    const property = new Property(
      "1", // landlordId
      "1", // propertyId
      streetAddress,  
      rentPrice || 100,  
      city,
      state,
      zip,
      [],
      description,
      [],
      avgRating
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
    result = await getPropertyByLandlord(GlobalValues.currentUser)

    console.log(result)
  }

  return (
    <View style={styles.main}>
      <View>
      <View style={styles.topComponent}>
        <Text style={styles.text}>My Listings</Text>
        <PrimaryButton
        title= "+ Add"
        fontWeight= {500}
        fontSize={12}
        size='small'
        customStyle={styles.addButton}
        onPress={toggleModal}
        />
      </View>
      <PropertyCard
      address="4119 Nancy Ave"
      />
      </View>

      <Modal
      visible={modalVisible}
      onRequestClose={toggleModal} // for Android hardware back button
      animationType='fade' // pop-up slides up on the screen
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
                    <TextField
                    placeholder="Street Address"
                    value={streetAddress}
                    onChangeText={setStreetAddress}
                    />
                    <View style={stylesModal.textBoxes}>
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
                    </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25
  },
  addButton: {
    height: 32,
    width: 71
  },
  text: {
    font: 'inter',
    fontWeight: 500,
    fontSize: 14,
    alignSelf: 'center'
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
})

export default LandlordPropertiesScreen