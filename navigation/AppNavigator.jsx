import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignUpScreen from '../screens/SignUp';
import DashboardScreen from '../screens/RenterDashboardS';
import BrowsePropertiesScreen from '../screens/BrowseProperties';
import ApplicationScreen from '../screens/Application';
import PaymentScreen from '../screens/Payment';
import SpecificMessageScreen from '../screens/SpecificMessage';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignUp"
        screenOptions={{
          headerShown: true,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="BrowseProperties" component={BrowsePropertiesScreen} />
        <Stack.Screen name="Application" component={ApplicationScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="SpecificMessage" component={SpecificMessageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
