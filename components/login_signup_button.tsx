import React from "react";
import {TouchableOpacity, StyleSheet, Text, ViewStyle, TextStyle} from 'react-native';

interface LoginButtonProps {
  onPress: () => void;
  title: string;
  style: ViewStyle;
  textStyle: TextStyle;
  hint: string;
}

const loginButton: React.FC<LoginButtonProps> = ({onPress, title, style, textStyle, hint=""}) => {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            <Text
                style={[styles.text, textStyle]}
                accessibilityLabel={"Button for " + title}
                accessibilityHint={hint}
            >
                {title}
            </Text>
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
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: 500,
        font: 'inter'
        
    }
});

export default loginButton;