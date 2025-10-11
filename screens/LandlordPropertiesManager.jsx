import React from 'react';
import { StyleSheet } from 'react-native'
import { View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import PropertyCard from '../components/propertyCard';

export default function LandlordPropertiesScreen (){
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