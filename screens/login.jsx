import React, {useState} from "react";
import { Button, TextInput, View, Text, StyleSheet, Image } from "react-native";
import {useNavigation} from '@react-navigation/native';
import PrimaryButton from "../components/PrimaryButton";
import TextField from "../components/TextField";
import CustomDivider from "../components/divider"
import { getUserByEmail } from '../database_calls/user/GetUserByEmail'
import { GlobalValues } from "../GlobalValues";
import {login_style} from "../styles/login";
import { useTheme } from "../ThemeContext";
import { useColorScheme } from "react-native";


export default function Login() {
    const [email, setEmail] = useState("ThaidakarRental@fakeEmail.com");// MARSH clean this up
    const [password, setPassword]= useState("tempPass");
    const navigation = useNavigation();
    const theme = useTheme()
    const scheme = useColorScheme()
    const logo = scheme === 'dark' ? require('./rentwiseLogoDarkMode.png') : require('./rentwiseLogo.png')

    const validateUser = async () => {
        const userToFind = {email: email}
        const result = await getUserByEmail(userToFind);

        if (!result.success) {
            console.log("Error:", result.errorMsg);// KELSIER: better error handling
            return;
        }

        if(result.userData == null){
            console.log("No user found!")
            return;
        }

        // success, get user from result
        const currentUser = result.userData

        // check if password is correct
        if(currentUser.password!=password){
            console.log("Error: incorrect password"); // KELSIER do error handling here too
            return
        }

        GlobalValues.currentUser = currentUser;
        // if we get here, successful login. Navigate to the relevant screen
        if (currentUser.isLandlord) {
            navigation.navigate('Landlord Dashboard')
        } else {
            navigation.navigate('Renter Dashboard')
        }
        setEmail('')
        setPassword('')
    };

    return (
        <View style={[login_style.app, theme.container]}>
            <View style={login_style.welcome}>
                <Image style={login_style.logo} source={logo}/>
                <Text style={[login_style.name, theme.logoColor]}>Rentwise</Text>
            </View>
            <View style={login_style.input}>
                <View style={login_style.text}>
                    <Text style={[login_style.typetext, theme.textColor]}>Sign In</Text>
                    <Text style={[login_style.typetext, theme.textColor]}>Enter your email to sign into Rentwise</Text>
                </View>
                <View style={login_style.spacing}>
                    <TextField
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        hint="Enter your email here"
                    />
                    <TextField
                        placeholder="Password"
                        value={password}
                        isPassword={true}
                        onChangeText={setPassword}
                        hint="Enter your password here"
                    />
                    <View>
                        <PrimaryButton
                        title="Continue"
                        onPress={validateUser}
                        />
                    </View>
                </View>
                <View style={login_style.divider}>
                    <CustomDivider/>
                    <Text>Or</Text>
                </View>
                <View>
                    <PrimaryButton
                    title="Continue with Google"
                    onPress={() => console.log('Another button pressed!')}
                    backgroundColor= {theme.altButton.backgroundColor} // providing a custom color for these buttons 
                    textColor={theme.placeHolderTextColor}
                    />
                    <PrimaryButton
                    title="Continue with Facebook"
                    onPress={() => console.log('Another button pressed!')}
                    backgroundColor= {theme.altButton.backgroundColor} // providing a custom color for these buttons 
                    textColor={theme.placeHolderTextColor}
                    />
                </View>
                <View style={login_style.divider}>
                    <CustomDivider/>
                </View>
                <View>
                    <Text style={[login_style.typetext, theme.textColor]}>Don't have an account?</Text>
                    <PrimaryButton
                    title="Sign up here!"
                    onPress={() => navigation.navigate('Sign Up')}
                    style={login_style.loginButton}
                    />
                </View>
            </View>
        </View>
    );
}
