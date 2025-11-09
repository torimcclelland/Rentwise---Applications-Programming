import React, { useState } from "react";
import { View, Text, Image, ScrollView, Pressable } from "react-native";
import { useNavigation } from '@react-navigation/native';
import PrimaryButton from "../components/PrimaryButton";
import TextField from "../components/TextField";
import CustomDivider from "../components/divider";
import { getUserByEmail } from '../database_calls/user/GetUserByEmail';
import { GlobalValues } from "../GlobalValues";
import { login_style } from "../styles/Login";
import { useTheme } from "../ThemeContext";
import { useColorScheme } from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pressed, setPressed] = useState(false);
  const navigation = useNavigation();
  const theme = useTheme();
  const scheme = useColorScheme();
  const logo = scheme === 'dark'
    ? require('./rentwiseLogoDarkMode.png')
    : require('./rentwiseLogo.png');

  const validateUser = async () => {
    const userToFind = { email: email };
    const result = await getUserByEmail(userToFind);

    if (!result.success) {
      console.log("Error:", result.errorMsg);
      return;
    }

    if (result.resultData == null) {
      console.log("No user found!");
      return;
    }

    const currentUser = result.resultData;

    if (currentUser.password !== password) {
      console.log("Error: incorrect password");
      return;
    }

    GlobalValues.currentUser = currentUser;

    if (currentUser.isLandlord) {
      navigation.navigate('Landlord Dashboard');
    } else {
      navigation.navigate('Renter Dashboard');
    }

    setEmail('');
    setPassword('');
  };

  return (
    <View style={[login_style.app, theme.container]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[login_style.welcome]}>
          <Image style={login_style.logo} source={logo} />
          <Text style={[login_style.name, theme.logoColor]}>Rentwise</Text>
        </View>

        <View style={login_style.input}>
          {/* ✅ Friendly microcopy */}
          <Text style={login_style.headerText}>Welcome back 👋</Text>
          <Text style={login_style.subText}>Sign in to continue</Text>

          <View style={login_style.spacing}>
            <TextField
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              hint="Enter your email here"
              style={login_style.inputField}
            />
            <TextField
              placeholder="Password"
              value={password}
              isPassword={true}
              onChangeText={setPassword}
              hint="Enter your password here"
              style={login_style.inputField}
            />

            {/* ✅ Button press animation */}
            <Pressable
              onPress={validateUser}
              onPressIn={() => setPressed(true)}
              onPressOut={() => setPressed(false)}
              style={[
                login_style.loginButton,
                pressed && login_style.loginButtonPressed
              ]}
            >
              <Text style={{ color: 'white', fontWeight: '600', fontSize: 16 }}>
                Continue
              </Text>
            </Pressable>
          </View>

          <View style={login_style.divider}>
            <CustomDivider />
          </View>

          <View>
            <PrimaryButton
              title="Continue with Google"
              onPress={() => console.log('Google login pressed')}
              backgroundColor={theme.altButton.backgroundColor}
              textColor={theme.placeHolderTextColor}
            />
            <PrimaryButton
              title="Continue with Facebook"
              onPress={() => console.log('Facebook login pressed')}
              backgroundColor={theme.altButton.backgroundColor}
              textColor={theme.placeHolderTextColor}
            />
          </View>

          <View style={login_style.divider}>
            <CustomDivider />
          </View>

          <View>
            <Text style={[login_style.typetext, theme.textColor]}>
              Don't have an account?
            </Text>
            <PrimaryButton
              title="Sign up here!"
              onPress={() => navigation.navigate('Sign Up')}
              style={login_style.loginButton}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
