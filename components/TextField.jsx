import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from '../styles/TextFieldStyles';

const TextField = ({ placeholder, isPassword=false, ...props }) => {
  return (
    <View style={styles.wrapper}>
      <TextInput 
        style={styles.input} {...props}
        placeholder={placeholder}
        placeholderTextColor="#696969"
        secureTextEntry={isPassword}
      />
    </View>
  );
};

export default TextField;
