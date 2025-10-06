import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import styles from '../styles/TextFieldStyles';

interface TextFieldProps extends TextInputProps {
  label: string;
}

const TextField: React.FC<TextFieldProps> = ({ label, ...props }) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} {...props} />
    </View>
  );
};

export default TextField;