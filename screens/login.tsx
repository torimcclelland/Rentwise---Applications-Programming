import React, {useState} from "react";
import { Button, TextInput, View, Text, StyleSheet, Image } from "react-native";
import LoginButton from '../components/login_signup_button'
import TextField from "../components/TextField";


export default function login() {
    const [email, setEmail] = useState("");
    const [password, setPassword]= useState("");


    return (
        <View style={styles.app}>
        <View style={styles.welcome}>
            <Image style={styles.logo} source={require('./rentwiseLogo.png')}/>
            <Text style={styles.text}>Rentwise</Text>
        </View>
        <View style={styles.input}>
            <TextField
                placeholder="Email"
            />
            <TextField
                placeholder="Password"
            />
            <LoginButton
            title="Continue"
            onPress={() => console.log('Another button pressed!')}
            />
        </View>
        </View>
    );
}

const styles = StyleSheet.create ({
    logo: {
        height: 84,
        width: 74
    },
    welcome: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    text:{
        color: '#034974',
        fontFamily: "Inter",
        fontSize: 64,
        fontWeight: 600

    },
    app:{
        flex: 4, //{*makes the container take up available space
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    input:{
        flex: 1
    }
});