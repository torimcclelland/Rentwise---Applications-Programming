import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import {login_style} from '../styles/login';
import TextField from '../components/TextField';
import LoginButton from '../components/login_signup_button'
import DropDown from '../components/DropDown';
import { getUserByEmail } from '../database_calls/user/GetUserByEmail';
import { createUser } from '../database_calls/user/CreateUser';
import { GlobalValues } from '../GlobalValues';
import { useNavigation } from '@react-navigation/native';

export default function SignUpScreen () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userType, setUserType] = useState('Renter');
  const [membershipType, setMembershipType] = useState('Free');
  const navigation = useNavigation();

  const handleSignUp = async () => {

    const isLandlord = userType === 'Landlord'
    const isPremUser = membershipType === 'Premium'
    const userToCreate = {
      email: email,
      password: password,
      firstName:firstName,
      lastName:lastName,
      isLandlord:isLandlord,
      isPremUser:isPremUser
    }

    let result = await getUserByEmail(userToCreate);

    if(!result.success){
      console.log("Error:", result.errorMsg);// KELSIER: better error handling
      return;
    }
    if(result.userData != null){
      console.log("A user with that email already exists!")// KELSIER: better error handling
      return
    }

    // confirmed it's a new email, create user
    result = await createUser(userToCreate);

    if(!result.success){
      console.log("Error:", result.errorMsg);// KELSIER: better error handling
      return;
    }

    console.log("User successfully created.")// KELSIER push
    const currentUser = result.userData

    GlobalValues.currentUser = currentUser;
    // if we get here, successful login. Navigate to the relevant screen
    if (currentUser.isLandLord) {
        navigation.navigate('Landlord Dashboard')
    } else {
        navigation.navigate('Renter Dashboard')
    }
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
              placeholder="Enter your email here"
              value={email}
              onChangeText={setEmail}
              hint="Enter your email here"
              />
          <Text style={login_style.typetext}>Password:</Text>
          <TextField
              placeholder="Enter your password here"
              value={password}
              onChangeText={setPassword}
              hint="Enter your password here"
              />
          <Text style={login_style.typetext}>First Name:</Text>
          <TextField
              placeholder="Enter your first name here"
              value={firstName}
              onChangeText={setFirstName}
              hint="Enter your first name here"
              />
          <Text style={login_style.typetext}>Last Name:</Text>
          <TextField
              placeholder="Enter your last name here"
              value={lastName}
              onChangeText={setLastName}
              hint="Enter your last name here"
          />
        </View>
        <View>
          <DropDown
            label="Select user type"
            options={["Landlord", "Renter"]}
            value={userType}
            onSelect={setUserType}
          />
          <DropDown
            label="Select membership type"
            options={["Free", "Premium"]}
            value={membershipType}
            onSelect={setMembershipType}
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

