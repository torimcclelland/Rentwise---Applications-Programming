import React from "react";
import {TouchableOpacity, StyleSheet, Text, ViewStyle} from 'react-native';

interface LoginButtonProps {
  onPress: () => void;
  title: string;
}

const loginButton: React.FC<LoginButtonProps> = ({onPress, title, ...props}) => {
    return (
        <TouchableOpacity style={styles.button} {...props} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button:{
        backgroundColor: '#034974',
        justifyContent: 'center',
        borderRadius: 8,
        alignItems: 'center'
    },
    text:{
        color: 'white'
    }
});

export default loginButton;