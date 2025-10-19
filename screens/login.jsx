import React, {useState} from "react";
import { Button, TextInput, View, Text, StyleSheet, Image } from "react-native";
import {
    createStaticNavigation,
    useNavigation,
  } from '@react-navigation/native';
import LoginButton from '../components/login_signup_button'
import TextField from "../components/TextField";
import CustomDivider from "../components/divider"
import { getUserByEmail } from '../database_calls/user/GetUserByEmail'
import { GlobalValues } from "../GlobalValues";


export default function login() {
    const [email, setEmail] = useState("ThaidakarRental@fakeEmail.com");// MARSH clean this up
    const [password, setPassword]= useState("tempPass");
    const navigation = useNavigation();

    const validateUser = async () => {
        const userToFind = {email: email}
        const result = await getUserByEmail(userToFind);

        if (!result) {
            console.log("Error:", result.errorMsg);// KELSIER: better error handling
            return;
        }

        // success, get user from result
        const currentUser = result

        // check if password is correct
        if(currentUser.password!=password){
            console.log("Error: incorrect password"); // KELSIER do error handling here too
            return
        }

        GlobalValues.currentUser = currentUser;
        // if we get here, successful login. Navigate to the relevant screen
        if (currentUser.isLandLord) {
            navigation.navigate('Landlord Dashboard')
        } else {
            navigation.navigate('Renter Dashboard')
        }
    };

    return (
        <View style={styles.app}>
            <View style={styles.welcome}>
                <Image style={styles.logo} source={require('./rentwiseLogo.png')}/>
                <Text style={styles.name}>Rentwise</Text>
            </View>
            <View style={styles.input}>
                <View style={styles.text}>
                    <Text style={styles.typetext}>Sign In</Text>
                    <Text style={styles.typetext}>Enter your email to sign into Rentwise</Text>
                </View>
                <View style={styles.spacing}>
                    <TextField
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextField
                        placeholder="Password"
                        value={password}
                        isPassword={true}
                        onChangeText={setPassword}
                    />
                    <View>
                        <LoginButton
                        title="Continue"
                        onPress={validateUser}
                        style={styles.loginButton}
                        textStyle={{color: "white"}}
                        />
                    </View>
                </View>
                <View style={styles.divider}>
                    <CustomDivider/>
                    <Text>Or</Text>
                </View>
                <View>
                    <LoginButton
                    title="Continue with Google"
                    onPress={() => console.log('Another button pressed!')}
                    style={styles.altLoginButton}
                    textStyle={{color: '#034974'}}
                    />
                    <LoginButton
                    title="Continue with Facebook"
                    onPress={() => console.log('Another button pressed!')}
                    style={styles.altLoginButton}
                    textStyle={{color: '#034974'}}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create ({
    text: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2
    },
    typetext: {
        font: 'inter',
        fontSize: 16,
        fontWeight: 600,
        color: '#034974',
        lineHeight: 24,
        fontStyle: 'normal'
    },
    spacing:{
        flexDirection: 'column',
        gap: 16
    },
    logo: {
        height: 84,
        width: 74
    },
    welcome: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    name:{
        color: '#034974',
        font: "Inter",
        fontSize: 64,
        fontStyle: 'normal',
        fontWeight: 600,
        // textShadowColor: 'rgba(0, 0, 0, 0.25)',
        // textShadowOffset: { width: 0, height: 4 },
        // textShadowRadius: 4

    },
    app:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',

    },
    input:{
        flex: 1,
        paddingHorizontal: 24,
        flexDirection: 'column',
        gap: 23
    },
    loginButton:{
        backgroundColor: '#034974'
    },
    altLoginButton:{
        backgroundColor: '#EEEEEE',
        marginBottom: 10
    }
});