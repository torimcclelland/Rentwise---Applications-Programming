import React, { useState } from 'react';
import { View, Text,StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import signUpStyles from '../styles/SignUpStyle';
import TextField from '../components/TextField';
import LoginButton from '../components/login_signup_button'


const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isLandLord, setLandlord] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

  const handleSignUp = () => {
    alert.alert('Sign Up', `Welcome, ${fullName}!`);
  };

  return (
    <View style={signUpStyles.pagecontent}>
      <View>
        <Text style={signUpStyles.header}>Create Your Account</Text>
      </View>
      <View>
        <Text style={signUpStyles.typetext}>Email:</Text>
        <TextField
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            hint="Enter your email here"
        />
      </View>
      <View>
        <Text style={signUpStyles.typetext}>Password:</Text>
        <TextField
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            hint="Enter your password here"
        />
      </View>
      <View>
        <Text style={signUpStyles.typetext}>First Name:</Text>
        <TextField
            placeholder="First name"
            value={firstName}
            onChangeText={setFirstName}
            hint="Enter your first name here"
        />
      </View>
      <View>
        <Text style={signUpStyles.typetext}>Last Name:</Text>
        <TextField
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
            hint="Enter your last name here"
        />
      </View>
      <LoginButton
          title="Sign up"
          onPress={() => handleSignUp()}
          style={signUpStyles.loginButton}
          textStyle={{color: "white"}}
          />

    </View>
  );
};

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
export default SignUpScreen;
