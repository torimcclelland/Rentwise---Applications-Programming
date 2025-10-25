
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import login from './screens/Login';
import DashboardScreen from './screens/RenterDashboard';
import LandlordPropertiesScreen from './screens/LandlordPropertiesManager';
import BrowseProperties from './screens/BrowseProperties';
import MessagesOverview from './screens/MessagesOverview';
import Notifications from './screens/Notifications';
import SignUpScreen from './screens/SignUp';
import PropertyEditScreen from './screens/PropertyEditScreen';
import UserProfile from './screens/UserProfile';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={login}
        //options={{headerShown: false}}
      />
      <Stack.Screen
        name="Sign Up"
        component={SignUpScreen} 
        //options={{headerShown: false}}
      />
      <Stack.Screen
        name="Renter Dashboard"
        component={DashboardScreen}
        //options={{headerShown: false}}
      />
      <Stack.Screen
        name="Landlord Dashboard"
        component={LandlordPropertiesScreen} 
        //options={{headerShown: false}}
      />
      <Stack.Screen
        name="Browse Properties"
        component={BrowseProperties}
        //options={{headerShown: false}}
      />
      <Stack.Screen
        name="Messages"
        component={MessagesOverview}
        //options={{headerShown: false}}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        //options={{headerShown: false}}
      />
      <Stack.Screen
        name="Property Edit"
        component={PropertyEditScreen} 
        //options={{headerShown: false}}
      />
      <Stack.Screen name="User Profile" component={UserProfile} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}