import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import styles from '../styles/TextFieldStyles';

interface TextFieldProps extends TextInputProps {
  placeholder: string;
}

const TextField: React.FC<TextFieldProps> = ({ placeholder, ...props }) => {
  return (
    <View style={styles.wrapper}>
      <TextInput 
        style={styles.input} {...props}
        placeholder={placeholder}
        placeholderTextColor="#696969"
      />
    </View>
  );
};

export default TextField;