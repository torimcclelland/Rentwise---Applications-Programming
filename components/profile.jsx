import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const Profile = ({ src, size = 64, style = {} }) => {
  return (
    <View style={[styles.container(size), style]}>
      <Image source={src} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: (size) => ({
    width: size,
    height: size,
    borderRadius: size / 2,
    overflow: 'hidden',
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

