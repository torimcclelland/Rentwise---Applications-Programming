import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/BottomNavBarStyle';
import Profile from './profile';
import exampleImage from './profileexample.png';
import { GlobalValues } from '../GlobalValues';
import { useTheme } from '../ThemeContext';

const BottomNavBar = ({ selectedTab }) => {
  
  const navigation = useNavigation();
  const userType = GlobalValues.currentUser.isLandLord // check if the user is a landlord 
  const theme = useTheme()
 
  
const tabs = [
    { name: 'search', icon: 'compass-outline', route: 'Browse Properties' },
    { name: 'messages', icon: 'chat-outline', route: 'Messages' },
    { name: 'home', 
      icon: 'home-outline', 
      route: userType === true ? 'Landlord Dashboard' : 'Renter Dashboard'},
    { name: 'notifications', icon: 'bell-outline', route: 'Notifications' },
    { name: 'profile', icon: null, route: 'User Profile' }, // Profile uses custom component
  ];

  const handleTabPress = (tab) => {
    if (tab.route) {
      navigation.navigate(tab.route);
    }
  };

  return (
    <View style={[styles.container, theme.container]}>
      {tabs.map((tab) => (
        <TouchableOpacity key={tab.name} onPress={() => handleTabPress(tab)}>
          {tab.name === 'profile' ? (
            <Profile
              src={exampleImage}
              size={28}
              style={{
                borderWidth: selectedTab === 'profile' ? 2 : 0,
                borderColor: '#007AFF',
              }}
            />
          ) : (
            <Icon
              name={tab.icon}
              size={28}
              color={selectedTab === tab.name ? '#007AFF' : '#999'}
            />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default BottomNavBar;
