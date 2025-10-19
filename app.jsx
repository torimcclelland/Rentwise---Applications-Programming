
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import login from './screens/login';
import DashboardScreen from './screens/RenterDashboard';
import LandlordPropertiesScreen from './screens/LandlordPropertiesManager';
import PropertyEditScreen from './screens/propertyEditScreen';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={login} />
      <Stack.Screen name="Renter Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Landlord Dashboard" component={LandlordPropertiesScreen} />
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