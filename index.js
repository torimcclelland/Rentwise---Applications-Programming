import { registerRootComponent } from 'expo';
import App from './app';
import login from './screens/login';
import LandlordPropertiesScreen from './screens/LandlordPropertiesManager'
import DashboardScreen from './screens/RenterDashboard';

//registerRootComponent(DashboardScreen)
//registerRootComponent(LandlordPropertiesScreen)

registerRootComponent(login);