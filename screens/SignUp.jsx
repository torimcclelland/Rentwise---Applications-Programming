import React, { useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import {login_style} from '../styles/Login';
import TextField from '../components/TextField';
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
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userType, setUserType] = useState('Renter');
  const [membershipType, setMembershipType] = useState('Free');
  const navigation = useNavigation();
  const theme = useTheme();
  const scheme = useColorScheme();
  const logo = scheme === 'dark' ? require('./rentwiseLogoDarkMode.png') : require('./rentwiseLogo.png');

  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const toggleModal = () => setModalVisible(!modalVisible);

  // 🔒 Password validation rules (returns all errors)
  const validatePassword = (pwd) => {
    const errors = [];
    if (!/.{8,}/.test(pwd)) errors.push("Password must be at least 8 characters long.");
    if (!/[A-Z]/.test(pwd)) errors.push("Password must contain at least one uppercase letter.");
    if (!/[a-z]/.test(pwd)) errors.push("Password must contain at least one lowercase letter.");
    if (!/[0-9]/.test(pwd)) errors.push("Password must contain at least one number.");
    if (!/[^A-Za-z0-9]/.test(pwd)) errors.push("Password must contain at least one special character.");
    return errors;
  };

  const handleSignUp = async () => {
    // 🔍 Validate password
    const passwordErrors = validatePassword(password);
    const errors = [...passwordErrors];

    if (password !== confirmPassword) {
      errors.push("Passwords do not match.");
    }

    if (errors.length > 0) {
      setErrorMessage(errors.join("\n")); // show all errors at once
      toggleModal();
      return;
    }

    const isLandlord = userType === 'Landlord';
    const isPremUser = membershipType === 'Premium';
    let userToCreate = new User({
      email,
      password,
      firstName,
      lastName,
      isLandlord,
      isPremUser
    });

    let result = await getUserByEmail(userToCreate);

    if(!result.success){
      console.log("Error:" + result.errorMsg);
      setErrorMessage("Error: " + result.errorMsg);
      toggleModal();
      return;
    }
    if(result.resultData != null){
      console.log("A user with that email already exists!");
      setErrorMessage("A user with that email already exists!");
      toggleModal();
      return;
    }

    // confirmed it's a new email, create user
    result = await createUser(userToCreate);

    if(!result.success){
      console.log("Error:" + result.errorMsg);
      setErrorMessage("Error:" + result.errorMsg);
      toggleModal();
      return;
    }

    console.log("User successfully created.");
    const currentUser = result.resultData;

    GlobalValues.currentUser = currentUser;
    if (currentUser.isLandlord) {
        navigation.navigate('Landlord Dashboard');
    } else {
        navigation.navigate('Renter Dashboard');
    }

    // clear values
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFirstName('');
    setLastName('');
    setUserType('Renter');
    setMembershipType('Free');
  };

  return (
    <View style={[login_style.app, theme.container]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[login_style.welcome, {paddingLeft: 20}]}>
          <Image style={login_style.logo} source={logo}/>
          <Text style={[login_style.name, theme.logoColor]}>Rentwise</Text>
        </View>
        <View style={login_style.input}>
          <View style={login_style.text}>
            <Text style={[login_style.subText, theme.textColor]}>Sign Up</Text>
            <Text style={[login_style.subText, theme.textColor]}>
              Enter your credentials to make a new account
            </Text>
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
              isPassword={true}
            />
            <Text style={[login_style.typetext, theme.textColor]}>Retype Password:</Text>
            <TextField
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              hint="Re-enter your password"
              isPassword={true}
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
      <NotificationModal 
        visible={modalVisible} 
        onClose={toggleModal} 
        message={errorMessage} 
      />
    </View>
  );
};
