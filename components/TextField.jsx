import React from 'react';
import { View, TextInput } from 'react-native';
import styles from '../styles/TextFieldStyles';
import { useTheme } from '../ThemeContext';

const TextField = ({
  placeholder,
  isPassword = false,
  textType = 'default',
  style,
  hint = '',
  maxLength=100, ...props
}) => {
  const theme = useTheme();

  return (
    <View style={[styles.wrapper, style]}>
      <TextInput
        style={[styles.input, theme.textField]}
        {...props}
        placeholder={placeholder}
        placeholderTextColor={theme.textColor.color}
        secureTextEntry={isPassword}
        keyboardType={textType}
        accessibilityLabel={`Input ${placeholder} into text box`}
        accessibilityRole="text"
        accessibilityHint={hint}
        maxLength={maxLength}
      />
    </View>
  );
};

export default TextField;
