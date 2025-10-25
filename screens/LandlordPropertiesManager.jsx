import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native'
import { View, Text, FlatList, ScrollView} from 'react-native';
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
import TextFieldLong from '../components/TextFieldLong';


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

    setPropertiesLs(result.propertyList) // set the landlords properties from result
    
  }

  const editProperty = async(propertyID) => {
    navigation.navigate('Property Edit', {'propertyID': propertyID}); // pass the property ID to the screen
  }

  return (
    <View style={[styles.main, theme.container]}>
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
              onPress={() => editProperty(item.propertyID)}
            />
          ))
        ) : (
          <Text>No properties listed yet</Text>
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

const styles = StyleSheet.create ({
  main:{
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  scrollContent: {
    flexGrow: 1,                // allows vertical centering when content is short
    justifyContent: 'center',   // centers content vertically
    alignItems: 'center',       // centers content horizontally
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 110,         // space for the fixed nav (adjust to nav height)
    width: '100%',
    gap: 16,                    // works on RN 0.71+, otherwise use margin on children
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
  },
  bottomNav:{
    width: '100%'
  }
});

export default LandlordPropertiesScreen
