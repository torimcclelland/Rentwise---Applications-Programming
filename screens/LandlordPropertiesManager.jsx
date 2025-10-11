import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import PropertyCard from '../components/PropertyCard';
import BottomNavBar from '../components/BottomNavBar';

const sampleProperties = [
  {
    id: '1',
    title: '10 Gore Road',
    imageUri: '',
  },
  {
    id: '2',
    title: '13 Sassafras Street',
    imageUri: '',
  },
  {
    id: '3',
    title: '900 West 9th Street',
    imageUri: '',
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
    </View>
  );
};

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
