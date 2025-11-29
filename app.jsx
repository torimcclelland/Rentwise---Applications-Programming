
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
import RenterLeaseScreen from './screens/RenterLease';
import ListedProperty from './screens/ListedProperty';
import ViewApplication from './screens/ViewApplication';
import Fixit from './screens/Fixit';
import AddProperty from './screens/AddPropertyModal';
import PaymentSummary from './screens/PaymentSummary';
import LoadingScreen from './screens/LoadingScreen';
import PurchasePremium from './screens/PurchasePremium';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Sign Up"
        component={SignUpScreen} 
        //options={{headerShown: false}}
      />
      <Stack.Screen
        name="Renter Dashboard"
        component={DashboardScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Landlord Dashboard"
        component={LandlordPropertiesScreen} 
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Browse Properties"
        component={BrowseProperties}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Messages"
        component={MessagesOverview}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{headerShown: false}}
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
        options={{headerShown: false}}
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
      <Stack.Screen
        name="Lease Info"
        component={RenterLeaseScreen}
        //options={headerShown: false}}
      />
      <Stack.Screen
        name="Landlord Property View"
        component={ListedProperty}
        //options={headerShown: false}}
      />
      <Stack.Screen
        name="View Application"
        component={ViewApplication}
      //options={headerShown: false}}
      />
      <Stack.Screen
        name="Fixit"
        component={Fixit}
        //options={headerShown: false}}
      />
      <Stack.Screen
        name="Add Property"
        component={AddProperty}
        //options={headerShown: false}}
      />
      <Stack.Screen
      name="Payment Summary"
      component={PaymentSummary}
      //options={headerShown: false}}
      />
      <Stack.Screen
      name="Loading"
      component={LoadingScreen}
      //options={headerShown: false}}
      />
      <Stack.Screen
      name="PurchasePremium"
      component={PurchasePremium}
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