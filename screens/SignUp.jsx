import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import {login_style} from '../styles/login';
import TextField from '../components/TextField';
import LoginButton from '../components/login_signup_button'

export default function SignUpScreen () {
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
    <View style={login_style.app}>
      <View style={login_style.welcome}>
          <Image style={login_style.logo} source={require('./rentwiseLogo.png')}/>
          <Text style={login_style.name}>Rentwise</Text>
      </View>
      <View style={login_style.input}>
        <View style={login_style.text}>
            <Text style={login_style.typetext}>Sign Up</Text>
            <Text style={login_style.typetext}>Enter your credentials to make a new account</Text>
        </View>
        <View>
          <Text style={login_style.typetext}>Email:</Text>
          <TextField
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              hint="Enter your email here"
              />
          <Text style={login_style.typetext}>Password:</Text>
          <TextField
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              hint="Enter your password here"
              />
          <Text style={login_style.typetext}>First Name:</Text>
          <TextField
              placeholder="First name"
              value={firstName}
              onChangeText={setFirstName}
              hint="Enter your first name here"
              />
          <Text style={login_style.typetext}>Last Name:</Text>
          <TextField
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
              hint="Enter your last name here"
          />
        </View>
        <View>
          <LoginButton
              title="Sign up"
              onPress={() => handleSignUp()}
              style={login_style.loginButton}
              textStyle={{color: "white"}}
              />
        </View>
      </View>

    </View>
  );
};

