import { registerRootComponent } from 'expo';
import App from './app';
import login from './screens/login';
import LandlordPropertiesScreen from './screens/LandlordPropertiesManager'
import DashboardScreen from './screens/RenterDashboard';
import UserProfile from './screens/UserProfile';

//registerRootComponent(App)
//registerRootComponent(LandlordPropertiesScreen)
//registerRootComponent(DashboardScreen)
registerRootComponent(UserProfile);
//registerRootComponent(login);