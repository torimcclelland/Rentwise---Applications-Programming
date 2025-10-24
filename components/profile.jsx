import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

//resuable profile circle
const Profile = ({ src, size = 64, style = {} }) => {
  return (
    <View style={[styles.container(size), style]}>
      <Image source={src} style={styles.image} /> 
    </View>
  );
};


const styles = StyleSheet.create({
  container: (size) => ({
    width: size, //we specify size each time we use one
    height: size,
    borderRadius: size / 2,
    overflow: 'hidden', //keeps from spilling over the circle
    backgroundColor: '#ccc',
  }),
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

Profile.propTypes = {
  src: PropTypes.number.isRequired,
  size: PropTypes.number,
  style: PropTypes.object,
};

export default Profile;

