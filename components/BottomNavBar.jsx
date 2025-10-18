import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/BottomNavBarStyle';
import Profile from './profile';
import exampleImage from './profileexample.png'; 

const tabs = [
  { name: 'search', icon: 'compass-outline', route: 'LandlordProperties' },
  { name: 'messages', icon: 'chat-outline', route: null },
  { name: 'home', icon: 'home-outline', route: 'RenterDashboard' },
  { name: 'notifications', icon: 'bell-outline', route: null },
  { name: 'profile', icon: null, route: null }, // Profile uses custom component
];

const BottomNavBar = ({ selectedTab }) => {
  const navigation = useNavigation();

  const handleTabPress = (tab) => {
    if (tab.route) {
      navigation.navigate(tab.route);
    }
  };

  return (
    <View style={styles.container}>
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
