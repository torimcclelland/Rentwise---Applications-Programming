import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from '../styles/TextFieldStyles';
import { useTheme } from '../ThemeContext';

const TextFieldLong = ({ placeholder, textType, hint='', maxLength=100, ...props }) => {
  
  const theme = useTheme()

  return (
    <View style={styles.wrapper}>
      <TextInput 
        style={[styles.multilineInput, theme.textField]} {...props}
        placeholder={placeholder}
        placeholderTextColor={theme.textField.color}
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
