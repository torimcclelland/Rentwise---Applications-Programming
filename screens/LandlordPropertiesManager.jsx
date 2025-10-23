import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native'
import { View, Text, FlatList, ScrollView} from 'react-native';
import PropertyCard from '../components/propertyCard';
import { getPropertyByLandlord } from '../database_calls/property/GetPropertyByLandlord';
import { GlobalValues } from '../GlobalValues';
import { ReturnValue } from '../models/ReturnValue';
import PrimaryButton from '../components/PrimaryButton';
import CustomDivider from '../components/divider';
import {
    createStaticNavigation,
    useNavigation,
  } from '@react-navigation/native';
import BottomNavBar from '../components/BottomNavBar';
import AddPropertyModal from '../screens/AddPropertyModal'


export const LandlordPropertiesScreen = () =>{
  // navigation
  const navigation = useNavigation();
  const [propertiesLs, setPropertiesLs]= useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  // function to toggle modal visibility
  const toggleModal = () =>{
    setModalVisible(!modalVisible)
  }

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

        <View style={{flex: 1}}>
          {/* Bottom Navigation Bar */}
          <BottomNavBar selectedTab="home"/>
        </View>
      </View>
      
      {/* The add property modal is rendered here */}
      <AddPropertyModal visible={modalVisible} onClose={toggleModal}/>

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
  },
});

export default LandlordPropertiesScreen
