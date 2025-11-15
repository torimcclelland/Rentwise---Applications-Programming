import React, { useState } from 'react';
import { View, Text, ScrollView, Image, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TextField from '../components/TextField';
import DropDown from '../components/DropDown';
import PrimaryButton from '../components/PrimaryButton';
import NotificationModal from '../components/NotificationModal';
import { getUserByEmail } from '../database_calls/user/GetUserByEmail';
import { createUser } from '../database_calls/user/CreateUser';
import User from '../models/User';
import GlobalValues from '../GlobalValues';
import SignUpStyles from '../styles/SignUpStyle'; // ✅ corrected import

export default function SignUpScreen () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userType, setUserType] = useState('Renter');
  const [membershipType, setMembershipType] = useState('Free');
  const navigation = useNavigation();
  const scheme = useColorScheme();
  const logo = scheme === 'dark' 
    ? require('./rentwiseLogoDarkMode.png') 
    : require('./rentwiseLogo.png');

  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const toggleModal = () => setModalVisible(!modalVisible);

  // 🔒 Password validation rules
  const validatePassword = (pwd) => {
    const minLength = /.{8,}/;               // at least 8 characters
    const upperCase = /[A-Z]/;               // at least one uppercase
    const lowerCase = /[a-z]/;               // at least one lowercase
    const number = /[0-9]/;                  // at least one digit
    const specialChar = /[^A-Za-z0-9]/;      // at least one special character

    if (!minLength.test(pwd)) return "Password must be at least 8 characters long.";
    if (!upperCase.test(pwd)) return "Password must contain at least one uppercase letter.";
    if (!lowerCase.test(pwd)) return "Password must contain at least one lowercase letter.";
    if (!number.test(pwd)) return "Password must contain at least one number.";
    if (!specialChar.test(pwd)) return "Password must contain at least one special character.";
    return null; // ✅ valid
  };

  const handleSignUp = async () => {
    // 🔍 Check password first
    const passwordError = validatePassword(password);
    if (passwordError) {
      setErrorMessage(passwordError);
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
    setFirstName('');
    setLastName('');
    setUserType('Renter');
    setMembershipType('Free');
  };

  return (
    <View style={[SignUpStyles.app]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[SignUpStyles.welcome, {paddingLeft: 20}]}>
          <Image style={SignUpStyles.logo} source={logo}/>
          <Text style={[SignUpStyles.name]}>Rentwise</Text>
        </View>
        <View style={SignUpStyles.input}>
          <View style={SignUpStyles.text}>
            <Text style={[SignUpStyles.subText]}>Sign Up</Text>
            <Text style={[SignUpStyles.subText]}>
              Enter your credentials to make a new account
            </Text>
          </View>
          <View>
            <Text style={[SignUpStyles.typetext]}>Email:</Text>
            <TextField
              placeholder="Enter your email here"
              value={email}
              onChangeText={setEmail}
              hint="Enter your email here"
            />
            <Text style={[SignUpStyles.typetext]}>Password:</Text>
            <TextField
              placeholder="Enter your password here"
              value={password}
              onChangeText={setPassword}
              hint="Enter your password here"
              secureTextEntry={true}   // 🔒 hides password input
            />
            <Text style={[SignUpStyles.typetext]}>First Name:</Text>
            <TextField
              placeholder="Enter your first name here"
              value={firstName}
              onChangeText={setFirstName}
              hint="Enter your first name here"
            />
            <Text style={[SignUpStyles.typetext]}>Last Name:</Text>
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
              style={SignUpStyles.loginButton}
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
