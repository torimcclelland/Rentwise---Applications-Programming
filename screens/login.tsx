import React, {useState} from "react";
import { Button, TextInput, View, Text, StyleSheet, Image } from "react-native";


export default function login(){
    const [email, setEmail] = useState("");
    const [password, setPassword]= useState("");

    return (
        <View>
            <Image style={styles.logo} source={require('./rentwiseLogo.png')}/>
            <Text>Rentwise</Text>
        </View>
    );
}

const styles = StyleSheet.create ({
    logo: {
        height: 84,
        width: 74
    }
});