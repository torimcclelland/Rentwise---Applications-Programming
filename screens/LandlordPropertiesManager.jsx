import React, {useState} from 'react';
import { StyleSheet } from 'react-native'
import { View, Text, FlatList, TouchableOpacity, Image, Modal, ScrollView} from 'react-native';
import PropertyCard from '../components/propertyCard';
import PrimaryButton from '../components/PrimaryButton';
import TextField from '../components/TextField';
import CustomDivider from '../components/divider';



const LandlordPropertiesScreen = () =>{

  const [modalVisible, setModalVisible] = useState(false);
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [rentPrice, setRentPrice] = useState("");
  const [petsAllowed, setPetsAllowed] = useState(""); // need to create radio button
  const [numBed, setNumBed] = useState(0);
  const [numBath, setNumBath] = useState(0);
  const [description, setDescription] = useState("");
  // possibly add more check with group

  // function to toggle modal visibility
  const toggleModal = () =>{
    setModalVisible(!modalVisible)
  }

  return (
    <View style={styles.main}>
      <View style={styles.topComponent}>
        <Text style={styles.text}>My Listings</Text>
        <PrimaryButton
        title= "+ Add"
        fontWeight= {500}
        customStyle={styles.addButton}
        onPress={toggleModal}
        />
      </View>
      <PropertyCard
      address="4119 Nancy Ave"
      />

      <Modal
      visible={modalVisible}
      onRequestClose={toggleModal} // for Android hardware back button
      animationType='fade' // pop-up slides up on the screen
      >
        <View style={stylesModal.centeredView}>
          <ScrollView>
              <View style={stylesModal.modalView}>
                <View style={stylesModal.banner}>
                  <Text style={[styles.text, {marginBottom: 10}]}>Add Listing</Text>
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
                  placeholder="description"
                  value={description}
                  onChangeText={setDescription}
                  />
                  <TextField
                  placeholder="Number Bed"
                  value={numBed}
                  onChangeText={setNumBed}
                  />
                  <TextField
                  placeholder="Number Bath"
                  value={numBath}
                  onChangeText={setNumBath}
                  />
                </View>
              </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create ({
  main:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  topComponent:{
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    paddingHorizontal: 25
  },
  addButton: {
    height: 28,
    width: 71
  },
  text: {
    font: 'inter',
    fontWeight: 500,
    fontSize: 14
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
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    // width: '80%',
    paddingHorizontal: 35,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2}
  },
  textBoxes:{
    flexDirection: 'row'
  },
  textbox:{
    flex: 1
  }
})

export default LandlordPropertiesScreen