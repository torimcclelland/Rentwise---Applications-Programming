import React, {useState} from 'react';
import { StyleSheet } from 'react-native'
import { View, Text, FlatList, TouchableOpacity, Image, Modal, ScrollView, Pressable} from 'react-native';
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
                    placeholder="description"
                    value={description}
                    onChangeText={setDescription}
                    />
                    <TextField
                    textType="number-pad"
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