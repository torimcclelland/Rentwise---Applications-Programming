import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from '../styles/TextFieldStyles';

const TextField = ({ label, ...props }) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} {...props} />
    </View>
  );
};

export default TextField;
