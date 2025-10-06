import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import styles from '../styles/LandlordPropertiesStyle';

const listings = [
  { id: '1', address: '203 Reed St', image: require('../assets/reed_st.jpg') },
  { id: '2', address: '4563 Pittsburgh Ave', image: require('../assets/pittsburgh_ave.jpg') },
  { id: '3', address: '981 Plum St', image: require('../assets/plum_st.jpg') },
];

const leased = [
  { id: '4', address: '1518 West Gore Rd', image: require('../assets/west_gore_rd.jpg') },
];

const PropertyItem = ({ address, image }) => (
  <TouchableOpacity style={styles.item}>
    <Image source={image} style={styles.image} />
    <Text style={styles.address}>{address}</Text>
    <Text style={styles.arrow}>›</Text>
  </TouchableOpacity>
);

const LandlordPropertiesScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>My Listings</Text>
        <TouchableOpacity>
          <Text style={styles.addButton}>+ Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={listings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PropertyItem address={item.address} image={item.image} />
        )}
      />

      <Text style={styles.sectionTitle}>Leased Properties</Text>
      <FlatList
        data={leased}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PropertyItem address={item.address} image={item.image} />
        )}
      />

      <View style={styles.navBar}>
        <Text style={styles.navIcon}>🏠</Text>
        <Text style={styles.navIcon}>📋</Text>
        <Text style={styles.navIcon}>⚙️</Text>
        <Text style={styles.navIcon}>👤</Text>
      </View>
    </View>
  );
};

export default LandlordPropertiesScreen;
