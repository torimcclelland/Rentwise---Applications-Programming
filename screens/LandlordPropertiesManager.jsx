import React from 'react';
<<<<<<< HEAD
import { View, FlatList, StyleSheet } from 'react-native';
import PropertyCard from '../components/PropertyCard';
import BottomNavBar from '../components/BottomNavBar';

const sampleProperties = [
  {
    id: '1',
    title: '10 Gore Road',
    imageUri: 'image.png',
  },
  {
    id: '2',
    title: '13 Sassafras Street',
    imageUri: 'image.png',
  },
  {
    id: '3',
    title: '900 West 9th Street',
    imageUri: 'image.png',
  },
];

const LandlordPropertiesManager = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={sampleProperties}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PropertyCard title={item.title} imageUri={item.imageUri} />
        )}
        contentContainerStyle={styles.list}
      />
      <BottomNavBar />
=======
import { StyleSheet } from 'react-native'
import { View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import PropertyCard from '../components/propertyCard';

export default function LandlordPropertiesScreen (){
  return (
    <View style={styles.main}>
      <PropertyCard
      address="4119 Nancy Ave"
      />
>>>>>>> origin/main
    </View>
  );
};

<<<<<<< HEAD
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  list: {
    padding: 16,
  },
});

export default LandlordPropertiesManager;
=======
const styles = StyleSheet.create ({
  main:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
>>>>>>> origin/main
