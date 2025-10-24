import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from '../styles/TextFieldStyles';
import { useTheme } from '../ThemeContext';

const TextField = ({ placeholder, isPassword=false, textType, hint='', ...props }) => {
  const theme = useTheme()
  return (
    <View style={styles.wrapper}>
      <TextInput 
        style={[styles.input, theme.textField]} {...props}
        placeholder={placeholder}
        placeholderTextColor= {theme.placeHolderTextColor}
        secureTextEntry={isPassword}
        keyboardType={textType}
        accessibilityLabel={`Input ${placeholder} into text box`}
        accessibilityRole='Text Box'
        accessibilityHint={hint}
      />
    </View>
  );
};

export default TextField;
