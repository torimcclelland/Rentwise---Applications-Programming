import React, { useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
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
  const [email, setEmail] = useState("kaladinStormblessed@fakeEmail.com");
  const [password, setPassword] = useState("tempPass");
  const navigation = useNavigation();
  const theme = useTheme();
  const scheme = useColorScheme();
  const logo = scheme === 'dark'
    ? require('./rentwiseLogoDarkMode.png')
    : require('./rentwiseLogo.png');

  const validateUser = async () => {
    const result = await getUserByEmail({ email });

    if (!result.success || !result.userData) {
      console.log("Login failed:", result.errorMsg || "No user found");
      return;
    }

    if (result.userData.password !== password) {
      console.log("Error: incorrect password");
      return;
    }

    GlobalValues.currentUser = result.userData;
    navigation.navigate(result.userData.isLandlord ? 'Landlord Dashboard' : 'Renter Dashboard');
    setEmail('');
    setPassword('');
  };

  return (
    <View style={[login_style.app, theme.container]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={login_style.header}>
          <Image style={login_style.logo} source={logo} />
          <Text style={[login_style.name, theme.logoColor]}>Rentwise</Text>
        </View>

        <View style={login_style.card}>
          <Text style={[login_style.title, theme.textColor]}>Welcome Back 👋</Text>
          <Text style={[login_style.subtitle, theme.textColor]}>
            Sign in to continue managing your rental journey
          </Text>

          <View style={login_style.spacing}>
            <View style={login_style.spacingItem}>
              <TextField
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                hint="Enter your email"
              />
            </View>
            <View style={login_style.spacingItem}>
              <TextField
                placeholder="Password"
                value={password}
                isPassword={true}
                onChangeText={setPassword}
                hint="Enter your password"
              />
            </View>
            <PrimaryButton title="Continue" onPress={validateUser} />
          </View>

          <View style={login_style.divider}>
            <CustomDivider />
            <Text style={[login_style.orText, theme.placeHolderTextColor]}>or</Text>
            <CustomDivider />
          </View>

          <View style={login_style.altButtons}>
            <View style={login_style.altButtonItem}>
              <PrimaryButton
                title="Continue with Google"
                onPress={() => console.log('Google login')}
                backgroundColor={theme.altButton.backgroundColor}
                textColor={theme.placeHolderTextColor}
              />
            </View>
            <View style={login_style.altButtonItem}>
              <PrimaryButton
                title="Continue with Facebook"
                onPress={() => console.log('Facebook login')}
                backgroundColor={theme.altButton.backgroundColor}
                textColor={theme.placeHolderTextColor}
              />
            </View>
          </View>

          <View style={login_style.footer}>
            <Text style={[login_style.subtitle, theme.textColor]}>
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
