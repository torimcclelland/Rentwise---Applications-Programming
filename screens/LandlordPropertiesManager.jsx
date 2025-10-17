import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native'
import { View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import PropertyCard from '../components/propertyCard';
import { Property } from '../models/Property';
import { getPropertyByLandlord } from '../database_calls/property/GetPropertyByLandlord';
import { GlobalValues } from '../GlobalValues';
import { ReturnValue } from '../models/ReturnValue';

export default function LandlordPropertiesScreen (){

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
      <PropertyCard
      address="4119 Nancy Ave"
      />
    </View>
  );
};

const styles = StyleSheet.create ({
  main:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
