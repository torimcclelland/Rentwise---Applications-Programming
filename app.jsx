
import * as React from 'react';
import { useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from './ThemeContext';
import Login from './screens/Login';
import DashboardScreen from './screens/RenterDashboard';
import LandlordPropertiesScreen from './screens/LandlordPropertiesManager';
import BrowseProperties from './screens/BrowseProperties';
import MessagesOverview from './screens/MessagesOverview';
import Notifications from './screens/Notifications';
import SignUpScreen from './screens/SignUp';
import PropertyEditScreen from './screens/PropertyEditScreen';
import UserProfile from './screens/UserProfile';
import PropertyInfo from './screens/PropertyInformation';
import ApplicationPage from './screens/Application';
import SpecificMessage from './screens/SpecificMessage';
import Payment from './screens/Payment';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
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
      <Stack.Screen
        name="Specific Message"
        component={SpecificMessage} 
        //options={{headerShown: false}}
      />
      <Stack.Screen 
      name="User Profile" 
      component={UserProfile} 
      />
      <Stack.Screen
      name="View Property"
      component={PropertyInfo}
      //options={{headerShown: false}}
      />
      <Stack.Screen
      name="Apply Property"
      component={ApplicationPage}
      //options={headerShown: false}}
      />
      <Stack.Screen
      name="Payment"
      component={Payment}
      //options={headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  const Scheme = useColorScheme()
  console.log(Scheme)
  return (
    <ThemeProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </ThemeProvider>
  );
}