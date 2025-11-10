import React, { useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import {login_style} from '../styles/Login';
import TextField from '../components/TextField';
import LoginButton from '../components/login_signup_button'
import DropDown from '../components/DropDown';
import { getUserByEmail } from '../database_calls/user/GetUserByEmail';
import { createUser } from '../database_calls/user/CreateUser';
import { GlobalValues } from '../GlobalValues';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../ThemeContext';
import { useColorScheme } from 'react-native';
import { User } from '../models/User';
import PrimaryButton from '../components/PrimaryButton';
import NotificationModal from '../components/NotificationModal';

export default function SignUpScreen () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userType, setUserType] = useState('Renter');
  const [membershipType, setMembershipType] = useState('Free');
  const navigation = useNavigation();
  const theme = useTheme()
  const scheme = useColorScheme()
  const logo = scheme === 'dark' ? require('./rentwiseLogoDarkMode.png') : require('./rentwiseLogo.png')

  const [modalVisible, setModalVisible] = useState(false)
  const[errorMessage, setErrorMessage] = useState("")
  const toggleModal = () => {
      setModalVisible(!modalVisible)
  }

  const handleSignUp = async () => {

    const isLandlord = userType === 'Landlord'
    const isPremUser = membershipType === 'Premium'
    let userToCreate = new User(
      {email: email,
      password: password,
      firstName:firstName,
      lastName:lastName,
      isLandlord:isLandlord,
      isPremUser:isPremUser
    })

    let result = await getUserByEmail(userToCreate);

    if(!result.success){
      console.log("Error:", result.errorMsg);
      setErrorMessage("Error:", result.errorMsg)
      toggleModal()
      return;
    }
    if(result.resultData != null){
      console.log("A user with that email already exists!")
      setErrorMessage("A user with that email already exists!")
      toggleModal()
      return
    }

    if(result.email === null
      || result.password === null
      || result.firstName === null
      || result.lastName === null){
      console.log("Must enter a value for all fields")
      setErrorMessage("Must enter a value for all fields.")
      toggleModal()
    }

    // confirmed it's a new email, create user
    result = await createUser(userToCreate);

    if(!result.success){
      console.log("Error:", result.errorMsg);
      setErrorMessage("Error:", result.errorMsg)
      toggleModal()
      return;
    }

    console.log("User successfully created.")// KELSIER push
    const currentUser = result.resultData

    GlobalValues.currentUser = currentUser;
    // if we get here, successful login. Navigate to the relevant screen
    if (currentUser.isLandlord) {
        navigation.navigate('Landlord Dashboard')
    } else {
        navigation.navigate('Renter Dashboard')
    }
    // clear values
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setUserType('Renter');
    setMembershipType('Free');
  };

  return (
    <View style={[login_style.app, theme.container]}>
    <ScrollView
    showsVerticalScrollIndicator={false}
    >
      <View style={[login_style.welcome, {paddingLeft: 20}]}>
          <Image style={login_style.logo} source={logo}/>
          <Text style={[login_style.name, theme.logoColor]}>Rentwise</Text>
      </View>
      <View style={login_style.input}>
        <View style={login_style.text}>
            <Text style={[login_style.subText, theme.textColor]}>Sign Up</Text>
            <Text style={[login_style.subText, theme.textColor]}>Enter your credentials to make a new account</Text>
        </View>
        <View>
          <Text style={[login_style.typetext, theme.textColor]}>Email:</Text>
          <TextField
              placeholder="Enter your email here"
              value={email}
              onChangeText={setEmail}
              hint="Enter your email here"
              />
          <Text style={[login_style.typetext, theme.textColor]}>Password:</Text>
          <TextField
              placeholder="Enter your password here"
              value={password}
              onChangeText={setPassword}
              hint="Enter your password here"
              />
          <Text style={[login_style.typetext, theme.textColor]}>First Name:</Text>
          <TextField
              placeholder="Enter your first name here"
              value={firstName}
              onChangeText={setFirstName}
              hint="Enter your first name here"
              />
          <Text style={[login_style.typetext, theme.textColor]}>Last Name:</Text>
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
          <PrimaryButton
              title="Sign up"
              onPress={() => handleSignUp()}
              style={login_style.loginButton}
              />
        </View>
      </View>
    </ScrollView>
    
      <NotificationModal visible={modalVisible} 
              onClose={toggleModal} 
              message={errorMessage} />
    </View>
  );
};

