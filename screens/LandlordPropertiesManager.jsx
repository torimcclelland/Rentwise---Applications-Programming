import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native'
import { View, Text, FlatList, ScrollView } from 'react-native';
import PropertyCard from '../components/propertyCard';
import { getPropertyByLandlord } from '../database_calls/property/GetPropertyByLandlord';
import { GlobalValues } from '../GlobalValues';
import { ReturnValue } from '../models/ReturnValue';
import PrimaryButton from '../components/PrimaryButton';
import CustomDivider from '../components/divider';
import { useTheme } from '../ThemeContext';
import {
    createStaticNavigation,
    useNavigation,
  } from '@react-navigation/native';
import BottomNavBar from '../components/BottomNavBar';
import AddPropertyModal from '../screens/AddPropertyModal'
import { styles } from "../styles/LandlordPropertiesStyle";
import NotificationModal from '../components/NotificationModal';

export const LandlordPropertiesScreen = () =>{
  // navigation
  const navigation = useNavigation();
  const [propertiesLs, setPropertiesLs]= useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const theme = useTheme()

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

    setPropertiesLs(result.resultList) // set the landlords properties from result
    
  }

  const editProperty = async(propertyID) => {
    navigation.navigate('Property Edit', {'propertyID': propertyID}); // pass the property ID to the screen
  }

  const viewProperty = async(propertyID) => {
    navigation.navigate('Landlord Property View', {'propertyID': propertyID});
  }

  return (
    <View style={[styles.main]}>
      {/* centered content container */}
       <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        /* optional: keyboardShouldPersistTaps="handled" */
      >
        <View style={styles.topComponent}>
          <Text style={[styles.text, {alignSelf: 'flex-start'}, theme.textColor]}>My Listings</Text>
          <PrimaryButton
          title= "+ Add"
          fontWeight= {500}
          fontSize={12}
          size='small'
          customStyle={[styles.addButton, theme.button]}
          onPress={toggleModal}
          />
        </View>

        {propertiesLs.length > 0 ? (
          // map over your items and render PropertyCard
          propertiesLs.map(item => (
            <PropertyCard
              key={item.propertyID?.toString()}
              address={item.address}
              edit={() => editProperty(item.propertyID)} // navigate to the edit screen
              view={() => viewProperty(item.propertyID)} // navigate to the view screen
              image={item.images[0]}
            />
          ))
        ) : (
          <View style={styles.noProperties}>
            <Text style={[theme.textColor]}>No properties listed yet</Text>
          </View>
        )}

        {/* custom divider */}
        <CustomDivider
        customStyles={{marginBottom: 20, marginTop: 20}}
        />
        <Text style={[styles.text, {alignSelf: 'flex-start'}, theme.textColor]}>Leased Properties</Text>
      
      </ScrollView>

      {/* Fixed bottom nav bar */}
      <View style={styles.bottomNav}>
        {/* Bottom Navigation Bar */}
        <BottomNavBar  selectedTab="home"/>
      </View>
      
      {/* The add property modal is rendered here */}
      <AddPropertyModal visible={modalVisible} onClose={toggleModal}/>

    </View>
  );
};


export default LandlordPropertiesScreen
