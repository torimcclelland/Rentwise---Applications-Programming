
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/login';
import DashboardScreen from './screens/RenterDashboard';
import LandlordPropertiesScreen from './screens/LandlordPropertiesManager';
import BrowseProperties from './screens/BrowseProperties';
import MessagesOverview from './screens/MessagesOverview';
import Notifications from './screens/Notifications';
import SignUpScreen from './screens/SignUp';
import PropertyEditScreen from './screens/propertyEditScreen';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Sign Up" component={SignUpScreen} />
      <Stack.Screen name="Renter Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Landlord Dashboard" component={LandlordPropertiesScreen} />
      <Stack.Screen name="Browse Properties" component={BrowseProperties}/>
      <Stack.Screen name="Messages" component={MessagesOverview}/>
      <Stack.Screen name="Notifications" component={Notifications}/>
      <Stack.Screen name="Property Edit" component={PropertyEditScreen} />
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