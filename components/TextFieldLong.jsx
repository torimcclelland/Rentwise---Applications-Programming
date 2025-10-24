import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from '../styles/TextFieldStyles';

const TextFieldLong = ({ placeholder, textType, hint='', maxLength=100, ...props }) => {
  return (
    <View style={styles.wrapper}>
      <TextInput 
        style={styles.multilineInput} {...props}
        placeholder={placeholder}
        placeholderTextColor="#696969"
        keyboardType={textType}
        accessibilityLabel={`Input ${placeholder} into text box`}
        accessibilityRole='Text Box'
        accessibilityHint={hint}
        numberOfLines={4}
        maxLength={maxLength}
        multiline={true}
      />
    </View>
  );
};

export default TextFieldLong;
