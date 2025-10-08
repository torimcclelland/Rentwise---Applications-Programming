import React from "react";
import {TouchableOpacity, StyleSheet, Text, ViewStyle, TextStyle} from 'react-native';

interface LoginButtonProps {
  onPress: () => void;
  title: string;
  style: ViewStyle;
  textStyle: TextStyle;
}

const loginButton: React.FC<LoginButtonProps> = ({onPress, title, style, textStyle}) => {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            <Text style={[styles.text, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button:{
        justifyContent: 'center',
        borderRadius: 8,
        alignItems: 'center',
        height: 40
    },
    text:{
        fontFamily: 'inter',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: 500
        
    }
});

export default loginButton;