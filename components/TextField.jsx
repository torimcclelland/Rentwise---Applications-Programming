import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from '../styles/TextFieldStyles';

const TextField = ({ placeholder, isPassword=false, textType, hint='', ...props }) => {
  return (
    <View style={styles.wrapper}>
      <TextInput 
        style={styles.input} {...props}
        placeholder={placeholder}
        placeholderTextColor="#696969"
        secureTextEntry={isPassword}
        keyboardType={textType}
        accessibilityLabel='Input {placeholder} into text box'
        accessibilityRole='Text Box'
        accessibilityHint={hint}
      />
    </View>
  );
};

export default TextField;
