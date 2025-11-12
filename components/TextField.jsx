import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from '../styles/TextFieldStyles';
import { useTheme } from '../ThemeContext';

const TextField = ({ placeholder, isPassword=false, textType, style, hint='', ...props }) => {
  // style: pass custom styles to the View that wraps the TextInput
  
  const theme = useTheme()
  return (
    <View style={[styles.wrapper, style]}>
      <TextInput 
        style={[styles.input, theme.textField]} {...props}
        placeholder={placeholder}
        placeholderTextColor= {theme.textColor.color}
        secureTextEntry={isPassword}
        keyboardType={textType}
        accessibilityLabel={`Input ${placeholder} into text box`}
        accessibilityRole='Text Box'
        accessibilityHint={hint}
        maxLength={100}
      />
    </View>
  );
};

export default TextField;
