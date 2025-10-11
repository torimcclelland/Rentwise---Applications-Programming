import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const PropertyCard = ({ title, imageUri }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    marginVertical: 10,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 180,
  },
  title: {
    padding: 12,
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
});

export default PropertyCard;
