import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles/BottomNavBarStyle';

const tabs = [
    { name: 'search', icon: 'compass-outline' },
    { name: 'messages', icon: 'chat-outline' },
    { name: 'home', icon: 'home-outline' },
    { name: 'notifications', icon: 'bell-outline' },
    { name: 'profile', icon: 'account-circle-outline' },
  ];
  
  const BottomNavBar = ({ selectedTab, onTabPress }) => {
    return (
      <View style={styles.container}>
        {tabs.map((tab) => (
          <TouchableOpacity key={tab.name} onPress={() => onTabPress(tab.name)}>
            <Icon
              name={tab.icon}
              size={28}
              color={selectedTab === tab.name ? '#007AFF' : '#999'}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  
  export default BottomNavBar